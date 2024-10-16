import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Rota pública para listar todos os produtos
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // Rota pública para buscar um produto pelo ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // Rota pública para buscar produtos com filtros (ex: nome, categoria, preço)
  @Get('filter')
  async findWithFilters(
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.productService.findWithFilters({
      name,
      category,
      minPrice,
      maxPrice,
    });
  }

  // Rota protegida para criar um novo produto
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() productData: CreateProductDto): Promise<any> {
    return this.productService.create(productData);
  }

  // Rota protegida para atualizar um produto
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateProductDto>,
  ): Promise<any> {
    return this.productService.update(id, updateData);
  }

  // Rota protegida para remover um produto
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    await this.productService.remove(id);
    return { message: `Product with ID ${id} has been deleted` };
  }
}
