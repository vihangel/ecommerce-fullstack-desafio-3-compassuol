import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Rota pública para listar todos os produtos
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Rota protegida para criar um novo produto
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() productData: Product): Promise<Product> {
    return this.productService.create(productData);
  }
}
