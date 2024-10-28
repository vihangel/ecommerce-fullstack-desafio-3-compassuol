// src/category/category.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import { Stream } from 'stream';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(
    categoryData: CreateCategoryDto,
    image?: Express.Multer.File,
  ): Promise<Category> {
    // Verificar se já existe uma categoria com o mesmo nome
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryData.name },
    });

    if (existingCategory) {
      throw new ConflictException(
        `Category with name "${categoryData.name}" already exists`,
      );
    }

    let imageUrl: string | undefined;

    // Se a imagem for fornecida, tente fazer o upload no Cloudinary
    if (image) {
      console.log('Tentando fazer upload da imagem usando buffer');

      try {
        // Faz o upload da imagem para o Cloudinary usando o buffer
        imageUrl = await new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'categories',
            },
            (error, result) => {
              if (error) {
                console.error(
                  'Erro ao salvar a imagem no Cloudinary:',
                  error.message,
                );
                return reject(
                  new Error(
                    'Erro ao salvar a imagem no Cloudinary: ' + error.message,
                  ),
                );
              }
              if (result) {
                console.log(
                  'Upload bem-sucedido, URL da imagem:',
                  result.secure_url,
                );
                resolve(result.secure_url);
              }
            },
          );

          // Envia o buffer para o stream do Cloudinary
          const stream = new Stream.PassThrough();
          stream.end(image.buffer);
          stream.pipe(uploadStream);
        });
      } catch (error) {
        throw new Error(
          'Erro ao salvar a imagem no Cloudinary: ' + error.message,
        );
      }
    }

    // Criar a categoria após o upload bem-sucedido da imagem (se houver)
    const newCategory = this.categoryRepository.create({
      ...categoryData,
      image_url: imageUrl || categoryData.image_url || null,
    });

    return this.categoryRepository.save(newCategory);
  }
  async update(
    id: number,
    updateData: Partial<CreateCategoryDto>,
    image?: Express.Multer.File,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (image) {
      try {
        console.log('Caminho da imagem:', image.path);

        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'categories',
          public_id: `category_${category.id}`,
        });
        updateData.image_url = result.secure_url;

        await fs.unlink(image.path);
      } catch (error) {
        console.error('Erro ao salvar a imagem no Cloudinary:', error.message);
        throw new Error(
          'Erro ao salvar a imagem no Cloudinary: ' + error.message,
        );
      }
    }

    // Atualiza os outros dados da categoria
    const updatedCategory = Object.assign(category, updateData);
    return this.categoryRepository.save(updatedCategory);
  }
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    // Remove a imagem associada do Cloudinary se existir
    if (category.image_url) {
      try {
        const publicId = category.image_url.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`categories/${publicId}`);
        }
      } catch (error) {
        throw new Error(
          'Erro ao remover a imagem do Cloudinary: ' + error.message,
        );
      }
    }
    await this.productRepository.delete({ category: { id } });
    await this.categoryRepository.remove(category);
  }

  async removeAll(): Promise<void> {
    // Primeiro, remover todos os produtos para evitar violação de chave estrangeira
    await this.productRepository.delete({});

    // Depois, remover todas as categorias
    await this.categoryRepository.delete({});
  }
}
