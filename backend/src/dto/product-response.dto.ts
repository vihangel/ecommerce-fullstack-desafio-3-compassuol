// src/dto/product-response.dto.ts
import { Category } from '../models/category.model';

export class ProductResponseDto {
  id: number;
  name: string;
  sku: string;
  category: Category;
  description: string;
  price: number;
  discount_percent: number;
  is_new: boolean;
  imageLink: string;
  created_date: Date;
  updated_date: Date;
}
