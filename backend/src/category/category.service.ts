// src/category/category.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(categoryData: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryData.name },
    });
    if (existingCategory) {
      throw new ConflictException(
        `Category with name "${categoryData.name}" already exists`,
      );
    }

    const newCategory = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(newCategory);
  }

  async update(
    id: number,
    updateData: Partial<CreateCategoryDto>,
  ): Promise<Category> {
    const category = await this.findOne(id);
    const updatedCategory = Object.assign(category, updateData);
    return this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }

  async removeAll(): Promise<void> {
    // Primeiro, remover todos os produtos para evitar violação de chave estrangeira
    await this.productRepository.delete({});

    // Depois, remover todas as categorias
    await this.categoryRepository.delete({});
  }
}
