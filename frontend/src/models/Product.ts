/** @format */

// src/models/Product.ts
export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  large_description?: string;
  price: string;
  discount_price?: string | null; // Permitir null
  discount_percent?: number | null; // Permitir null
  is_new?: boolean;
  image?: string;
  image_url?: string;
  created_date?: string;
  updated_date?: string;
  category?: {
    id: number;
    name: string;
  };
}
