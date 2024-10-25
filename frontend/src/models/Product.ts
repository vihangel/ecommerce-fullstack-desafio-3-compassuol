/** @format */

// src/models/Product.ts
export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  large_description?: string;
  price: string;
  discount_price?: string | null;
  discount_percent?: number | null;
  is_new?: boolean;
  cover_image_url?: string; // Campo da imagem de capa
  gallery_images?: string[]; // Galeria de imagens
  created_date?: string;
  updated_date?: string;
  category?: {
    id: number;
    name: string;
  };
  sizes?: string[]; // Tamanhos disponíveis
  colors?: {
    name: string;
    image_url: string;
  }[]; // Cores disponíveis com imagens
  tags?: string[]; // Tags associadas ao produto
  additional_information?: string; // Informações adicionais do produto
  reviews?: {
    author_name: string;
    content: string;
    rating: number;
    created_at: string;
  }[]; // Avaliações associadas ao produto
}
