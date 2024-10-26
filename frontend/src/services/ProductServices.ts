/** @format */

// src/services/productService.ts
import axios from "axios";
import { Product } from "../models/Product";

export const fetchProducts = async (
  categoryId?: number,
  limit: number = 10,
  sort?: "ASC" | "DESC",
  isNew?: boolean
): Promise<Product[]> => {
  try {
    let url = `http://localhost:3000/products?limit=${limit}`;

    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }

    if (sort) {
      url += `&sort=${sort}`;
    }

    if (isNew !== undefined) {
      url += `&is_new=${isNew}`;
    }

    const response = await axios.get(url);
    return response.data.products;
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error.message);
    throw new Error("Erro ao buscar produtos");
  }
};
