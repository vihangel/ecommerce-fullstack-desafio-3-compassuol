// src/product/product.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @Query() filters: Partial<Product>,
    @Query('page') page: number = 1, // Valor padrão da página é 1
    @Query('limit') limit: number = 10, // Valor padrão do limite é 10
  ) {
    return this.productService.findAll(filters, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body('product_data') productData: string,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const parsedProductData: CreateProductDto = JSON.parse(productData);
    return this.productService.create(parsedProductData, image);
  }

  @Post('import')
  @UseGuards(JwtAuthGuard)
  async importProducts(@Body() products: CreateProductDto[]) {
    return this.productService.importProducts(products);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateProductDto>,
  ) {
    return this.productService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    return { message: `Product with ID ${id} has been deleted` };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeAll() {
    await this.productService.removeAll();
    return { message: `All products have been deleted` };
  }
}
