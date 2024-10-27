/** @format */

// src/components/ProductSection.tsx
import React from "react";
import styled from "styled-components";

import { Product } from "../../../models/Product";
import { theme } from "../../../styles/theme";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  products: Product[];
  showMore?: () => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  showMore,
}) => {
  return (
    <ProductsSection>
      <ContentWrapper>
        <Title>{title}</Title>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        {showMore && (
          <ShowMoreButton onClick={showMore}>Show More</ShowMoreButton>
        )}
      </ContentWrapper>
    </ProductsSection>
  );
};
export default ProductSection;
// Styled Components
const ProductsSection = styled.section`
  background-color: ${theme.colors.white};
  padding: 4rem 2rem;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 3rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  @media (max-width: 90rem) {
    max-width: 90rem;
    margin: 0 auto;
  }
  @media (max-width: 80rem) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 60rem) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const ShowMoreButton = styled.button`
  margin-top: 2rem;
  background: none;
  color: ${theme.colors.primary};
  font-size: 1rem;
  font-weight: 600; // Semibold
  border: 1px solid ${theme.colors.primary};
  padding: 0.75rem 4.5rem;

  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;
