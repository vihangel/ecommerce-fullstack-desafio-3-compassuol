/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../models/Product";
import { fetchProducts } from "../../services/ProductServices";
import { theme } from "../../styles/theme";
import FeatureSection from "../home/components/FeatureSection";
import ProductSection from "../home/components/ProductSection";
import Pagination from "./components/Pagination";
import ShopControls from "./components/ShopControls";
import ShopHero from "./components/ShopHero";

const ShopPage: React.FC = () => {
  const useMockData = false;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(!useMockData);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sort, setSort] = useState<"ASC" | "DESC" | undefined>(undefined);
  const location = useLocation();

  /// categoria pela url
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category_id");

  // Função para buscar produtos, acionada sempre que currentPage, itemsPerPage ou filtros mudarem
  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      if (useMockData) {
        setTimeout(() => {
          // Mock data handling
          setProducts(mockProducts);
          setTotalItems(mockProducts.length);
          setTotalPages(
            Math.max(1, Math.ceil(mockProducts.length / itemsPerPage))
          );
          setLoading(false);
        }, 2000);
      } else {
        const fetchedProductsResponse = await fetchProducts(
          categoryId ? parseInt(categoryId) : undefined,
          itemsPerPage,
          currentPage,
          sort
        );

        // Atualizar os valores de totalItems e totalPages conforme a resposta do backend
        setTotalItems(fetchedProductsResponse.totalItems);
        setTotalPages(
          Math.max(
            1,
            Math.ceil(fetchedProductsResponse.totalItems / itemsPerPage)
          )
        );

        setProducts(fetchedProductsResponse.products);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setError(
        "Estamos com problemas para exibir os produtos. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  // Atualizar os produtos sempre que currentPage, itemsPerPage ou filtros mudarem
  useEffect(() => {
    loadProducts();
  }, [currentPage, itemsPerPage, sort, categoryId]);

  // Função para alterar o número de itens por página
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reseta a página para 1 ao alterar o número de itens por página
  };

  // Função para alterar a página atual
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Função para alterar a ordenação
  const handleSortChange = (value: "ASC" | "DESC" | "default") => {
    if (value === "default") {
      setSort(undefined);
    } else {
      setSort(value);
    }
    setCurrentPage(1);
  };

  return (
    <Main>
      <ShopHero />
      <ShopControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={handleItemsPerPageChange}
        handlePageChange={handlePageChange}
        handleSortChange={handleSortChange}
      />
      {loading ? (
        <LoadingMessage>Carregando produtos...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <ProductSection title="Our Products" products={products} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      <FeatureSection />
    </Main>
  );
};

export default ShopPage;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: 2rem 0;
  color: ${theme.colors.text};
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: 2rem 0;
  color: ${theme.colors.accent};
`;

const Main = styled.main`
  padding-top: 100px; /* Para garantir que o conteúdo não fique atrás da AppBar */
`;

const mockProducts = [
  {
    id: 90,
    name: "Syltherine",
    sku: "S002",
    description: "Stylish cafe chair",
    large_description: "Comfortable and elegant, perfect for cafes.",
    price: "2500000",
    discount_price: "2000000",
    discount_percent: 20,
    is_new: false,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282497/products/product_90.png",
    created_date: "2024-10-18T20:14:56.675Z",
    updated_date: "2024-10-18T20:14:56.675Z",
    category: {
      id: 45,
      name: "Furniture",
    },
  },
  {
    id: 91,
    name: "Leviosa",
    sku: "S003",
    description: "Luxury big sofa",
    large_description: "Perfect for the entire family with premium comfort.",
    price: "7000000",
    discount_price: "6000000",
    discount_percent: 15,
    is_new: false,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282498/products/product_91.png",
    created_date: "2024-10-18T20:14:58.082Z",
    updated_date: "2024-10-18T20:14:58.082Z",
    category: {
      id: 45,
      name: "Furniture",
    },
  },
  {
    id: 92,
    name: "Lolito",
    sku: "S004",
    description: "Outdoor bar table and stool",
    large_description: "Durable and stylish for outdoor gatherings.",
    price: "500000",
    discount_price: "450000",
    discount_percent: 10,
    is_new: false,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282499/products/product_92.png",
    created_date: "2024-10-18T20:14:59.150Z",
    updated_date: "2024-10-18T20:14:59.150Z",
    category: {
      id: 46,
      name: "Outdoor",
    },
  },
  {
    id: 93,
    name: "Muggo",
    sku: "S005",
    description: "Small mug",
    large_description: "Perfect for coffee or tea, with a minimalist design.",
    price: "150000",
    discount_price: null,
    discount_percent: null,
    is_new: true,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282500/products/product_93.png",
    created_date: "2024-10-18T20:14:59.938Z",
    updated_date: "2024-10-18T20:14:59.938Z",
    category: {
      id: 47,
      name: "Lighting",
    },
  },
  {
    id: 94,
    name: "Respira",
    sku: "S006",
    description: "Night lamp",
    large_description:
      "Elegant night lamp with soft lighting, perfect for a bedroom.",
    price: "1500000",
    discount_price: "1200000",
    discount_percent: 20,
    is_new: false,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282501/products/product_94.png",
    created_date: "2024-10-18T20:15:00.784Z",
    updated_date: "2024-10-18T20:15:00.784Z",
    category: {
      id: 48,
      name: "Bedroom",
    },
  },
  {
    id: 95,
    name: "Grifo",
    sku: "S007",
    description: "Stylish lamp",
    large_description:
      "Stylish modern lamp with a sleek design, great for living rooms or bedrooms.",
    price: "1500000",
    discount_price: null,
    discount_percent: null,
    is_new: false,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282502/products/product_95.png",
    created_date: "2024-10-18T20:15:01.742Z",
    updated_date: "2024-10-18T20:15:01.742Z",
    category: {
      id: 48,
      name: "Bedroom",
    },
  },
  {
    id: 96,
    name: "Pingky",
    sku: "S008",
    description: "Cute bed set",
    large_description:
      "Soft and cozy bed set that adds warmth to your bedroom decor.",
    price: "7000000",
    discount_price: "5600000",
    discount_percent: 20,
    is_new: false,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282503/products/product_96.png",
    created_date: "2024-10-18T20:15:02.667Z",
    updated_date: "2024-10-18T20:15:02.667Z",
    category: {
      id: 45,
      name: "Furniture",
    },
  },
  {
    id: 97,
    name: "Potty",
    sku: "S009",
    description: "Minimalist flower pot",
    large_description:
      "Modern minimalist flower pot, ideal for home or office use.",
    price: "500000",
    discount_price: "450000",
    discount_percent: 10,
    is_new: true,
    image_data: null,
    image_url:
      "https://res.cloudinary.com/degnvmueo/image/upload/v1729282503/products/product_97.png",
    created_date: "2024-10-18T20:15:03.578Z",
    updated_date: "2024-10-18T20:15:03.578Z",
    category: {
      id: 46,
      name: "Outdoor",
    },
  },
];
