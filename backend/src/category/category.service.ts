// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
}
