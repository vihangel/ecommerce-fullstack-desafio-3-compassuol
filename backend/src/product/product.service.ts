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
  async findAll(
    filters?: Partial<Product>,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    products: Product[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    // Aplicando filtros, se houver
    if (filters) {
      if (filters.category?.id) {
        query.andWhere('product.category.id = :categoryId', {
          categoryId: filters.category.id,
        });
      }
      if (filters.is_new !== undefined) {
        query.andWhere('product.is_new = :isNew', { isNew: filters.is_new });
      }
      if (filters.price) {
        query.andWhere('product.price <= :price', { price: filters.price });
      }
      // Outros filtros podem ser adicionados aqui
    }

    // Corrigindo a aplicação de paginação
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    // Obtendo os produtos e o total de itens
    const [products, totalItems] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalItems / limit);

    return { products, totalItems, totalPages, currentPage: page };
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
    console.log('Dados recebidos:', productData);
    try {
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
          console.error(
            'Erro ao salvar a imagem no Cloudinary:',
            error.message,
          );
          throw new Error(
            'Erro ao salvar a imagem no Cloudinary: ' + error.message,
          );
        }
      }

      return savedProduct;
    } catch (error) {
      console.error('Erro ao criar produto:', error.message);
      throw new Error('Erro ao criar produto: ' + error.message);
    }
  }

  async importProducts(products: CreateProductDto[]): Promise<void> {
    for (const productData of products) {
      try {
        await this.create(productData);
      } catch (error) {
        console.error(
          `Erro ao importar produto: ${productData.name}`,
          error.message,
        );
      }
    }
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

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    // Remove a imagem associada do Cloudinary se existir
    if (product.image_url) {
      try {
        // Extrair o public_id a partir da URL da imagem armazenada no Cloudinary
        const publicId = product.image_url.split('/').pop()?.split('.')[0]; // Pega o último trecho da URL e remove a extensão
        if (publicId) {
          await cloudinary.uploader.destroy(`products/${publicId}`);
        }
      } catch (error) {
        throw new Error(
          'Erro ao remover a imagem do Cloudinary: ' + error.message,
        );
      }
    }

    // Remove o produto do banco de dados
    await this.productRepository.remove(product);
  }

  // Método para remover todos os produtos
  async removeAll(): Promise<void> {
    // Buscar todos os produtos
    const products = await this.productRepository.find();

    // Remover cada imagem associada do Cloudinary
    for (const product of products) {
      if (product.image_url) {
        try {
          // Extrair o public_id a partir da URL da imagem armazenada no Cloudinary
          const publicId = product.image_url.split('/').pop()?.split('.')[0]; // Pega o último trecho da URL e remove a extensão
          if (publicId) {
            await cloudinary.uploader.destroy(`products/${publicId}`);
          }
        } catch (error) {
          console.error(
            'Erro ao remover a imagem do Cloudinary:',
            error.message,
          );
        }
      }
    }

    // Remover todos os produtos do banco de dados
    await this.productRepository.clear();
  }
}
