import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    CloudinaryModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
