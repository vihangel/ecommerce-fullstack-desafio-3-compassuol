/** @format */

// src/components/ProductSection.tsx
import React from 'react';
import styled from 'styled-components';
import Container from '../../../components/shared/Container';
import { theme } from '../../../styles/theme';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  discount?: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <ProductsSection>  
      <Container>     <ContentWrapper>
      <Title>{title}</Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
      <ShowMoreButton>Show More</ShowMoreButton></ContentWrapper> </Container>
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
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 3rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const ShowMoreButton = styled.button`
  margin-top: 2rem;
  background: none;
  color: ${theme.colors.primary};
  font-size: 16px;
  font-weight: 600; // Semibold
  border: 1px solid ${theme.colors.primary};
  padding: 0.75rem 72px;
  
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;
