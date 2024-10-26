/** @format */

// src/services/productService.ts
import axios from "axios";
import { Product } from "../models/Product";

interface FetchProductsResponse {
  products: Product[];
  totalItems: number;
  totalPages: number;
}

export const fetchProducts = async (
  categoryId?: number,
  limit?: number,
  page?: number,
  sort?: "ASC" | "DESC",
  isNew?: boolean
): Promise<FetchProductsResponse> => {
  try {
    let url = `http://localhost:3000/products?`;

    if (limit !== undefined) {
      url += `limit=${limit}&`;
    }

    if (page !== undefined) {
      url += `page=${page}&`;
    }

    if (categoryId) {
      url += `category_id=${categoryId}&`;
    }

    if (sort) {
      url += `sort=${sort}&`;
    }

    if (isNew !== undefined) {
      url += `is_new=${isNew}&`;
    }

    // Removendo o '&' extra no final da URL, caso exista
    url = url.slice(0, -1);

    const response = await axios.get(url);
    return {
      products: response.data.products,
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error.message);
    throw new Error("Erro ao buscar produtos");
  }
};
