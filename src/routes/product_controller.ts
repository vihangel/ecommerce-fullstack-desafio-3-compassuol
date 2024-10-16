import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get()
  findAll(): string {
    return 'Lista de produtos';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Produto ${id}`;
  }

  @Post()
  create(): string {
    return 'Produto criado';
  }
}
