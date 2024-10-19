// src/category/category.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Rota pública para listar todas as categorias
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  // Rota pública para buscar uma categoria pelo ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  // Rota protegida para criar uma nova categoria
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.create(categoryData);
  }

  // Rota protegida para atualizar uma categoria
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateCategoryDto>,
  ) {
    return this.categoryService.update(id, updateData);
  }

  // Rota protegida para remover uma categoria
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.categoryService.remove(id);
    return { message: `Category with ID ${id} has been deleted` };
  }

  // Rota protegida para remover todas as categorias
  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeAll() {
    await this.categoryService.removeAll();
    return { message: 'All categories have been deleted' };
  }
}
