// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Método para listar todos os produtos
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  // Método para buscar um produto pelo ID
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(
    productData: CreateProductDto,
    image?: Express.Multer.File,
  ): Promise<Product> {
    const category = await this.categoryRepository.findOne({
      where: { id: productData.category_id },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria com ID ${productData.category_id} não encontrada`,
      );
    }

    const newProduct = this.productRepository.create({
      name: productData.name,
      sku: productData.sku,
      description: productData.description,
      large_description: productData.large_description,
      price: productData.price,
      discount_price: productData.discount_price,
      discount_percent: productData.discount_percent,
      is_new: productData.is_new,
      created_date: new Date(),
      updated_date: new Date(),
      category: { id: productData.category_id } as any,
    });

    const savedProduct = await this.productRepository.save(newProduct);

    // Upload da imagem para o Cloudinary
    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'products',
          public_id: `product_${savedProduct.id}`,
        });
        savedProduct.image_url = result.secure_url;
        await this.productRepository.save(savedProduct);
      } catch (error) {
        throw new Error(
          'Erro ao salvar a imagem no Cloudinary: ' + error.message,
        );
      }
    }

    return savedProduct;
  }

  // Método para atualizar um produto existente
  async update(
    id: number,
    updateData: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const updatedProduct = Object.assign(product, updateData, {
      updated_date: new Date(),
    });

    // Se houver imagem base64 no update, atualiza o arquivo de imagem
    if (updateData.image_data) {
      const imageBuffer = Buffer.from(updateData.image_data, 'base64');
      const imagePath = join(__dirname, '..', '..', 'uploads', `${id}.png`);
      await fs.writeFile(imagePath, imageBuffer);
    }

    return this.productRepository.save(updatedProduct);
  }

  // Método para remover um produto pelo ID
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);

    // Remove o arquivo de imagem associado
    const imagePath = join(__dirname, '..', '..', 'uploads', `${id}.png`);
    await fs.unlink(imagePath).catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    });
  }

  // Método para remover todos os produtos
  async removeAll(): Promise<void> {
    await this.productRepository.clear();

    // Remove todos os arquivos da pasta de uploads
    const uploadsPath = join(__dirname, '..', '..', 'uploads');
    await fs.rm(uploadsPath, { recursive: true, force: true }).catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    });
  }
}
