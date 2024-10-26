/** @format */

import axios from "axios";
import { Category } from "../models/Category";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get("http://localhost:3000/categories");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Erro ao buscar categorias");
  }
};
