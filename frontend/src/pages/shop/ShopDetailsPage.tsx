/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/shared/Container";
import { theme } from "../../styles/theme";

interface Product {
  id: number;
  name: string;
  price: string;
  discount_price: string | null;
  description: string;
  large_description: string;
  category: { id: number; name: string };
  image_url: string;
  is_new: boolean;
  discount_percent: number | null;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        setError("Erro ao buscar os detalhes do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <LoadingMessage>Carregando detalhes do produto...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!product) {
    return <ErrorMessage>Produto não encontrado.</ErrorMessage>;
  }

  return (
    <Main>
      <Container>
        <ProductWrapper>
          <ImageGallery>
            <MainImage src={product.image_url} alt={product.name} />
            <ThumbnailGallery>
              <Thumbnail src={product.image_url} alt={product.name} />
              <Thumbnail src={product.image_url} alt={product.name} />
              <Thumbnail src={product.image_url} alt={product.name} />
            </ThumbnailGallery>
          </ImageGallery>
          <ProductInfo>
            <h2>{product.name}</h2>
            <Price>
              {product.discount_price ? (
                <>
                  <span className="discounted">{product.discount_price}</span>
                  <span className="original">{product.price}</span>
                </>
              ) : (
                <span className="normal">{product.price}</span>
              )}
            </Price>
            <p>{product.large_description}</p>

            <Options>
              <SizeSelector>
                <span>Tamanho</span>
                <SizeOption>L</SizeOption>
                <SizeOption>XL</SizeOption>
                <SizeOption>XS</SizeOption>
              </SizeSelector>
              <ColorSelector>
                <span>Cor</span>
                <ColorOption style={{ background: "#000000" }} />
                <ColorOption style={{ background: "#8A2BE2" }} />
                <ColorOption style={{ background: "#FFD700" }} />
              </ColorSelector>
            </Options>

            <ActionButtons>
              <QuantitySelector>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </QuantitySelector>
              <AddToCartButton>Adicionar ao Carrinho</AddToCartButton>
              <CompareButton>+ Compare</CompareButton>
            </ActionButtons>

            <ProductMeta>
              <p>SKU: {product.id}</p>
              <p>Categoria: {product.category.name}</p>
              <p>Tags: Sofá, Cadeira, Casa</p>
            </ProductMeta>
          </ProductInfo>
        </ProductWrapper>

        <DescriptionSection>
          <Tab>
            <TabItem active>Descrição</TabItem>
            <TabItem>Informação Adicional</TabItem>
          </Tab>
          <DescriptionContent>
            <p>{product.description}</p>
          </DescriptionContent>
        </DescriptionSection>
      </Container>
    </Main>
  );
};

export default ProductDetailsPage;

// Componentes adicionais para feedback visual e estilização
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
  padding-top: 100px;
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ThumbnailGallery = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  cursor: pointer;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    color: ${theme.colors.muted};
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;

  .discounted {
    color: ${theme.colors.accent};
    font-weight: bold;
  }

  .original {
    text-decoration: line-through;
    margin-left: 1rem;
    color: ${theme.colors.muted};
  }

  .normal {
    color: ${theme.colors.text};
    font-weight: bold;
  }
`;

const Options = styled.div`
  margin-top: 1.5rem;
`;

const SizeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  span {
    font-weight: bold;
  }
`;

const SizeOption = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ColorSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ColorOption = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 32px;
    height: 32px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  span {
    padding: 0 1rem;
    font-weight: bold;
  }
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${theme.colors.black};
  }
`;

const CompareButton = styled.button`
  padding: 1rem 2rem;
  background-color: #fff;
  border: 1px solid ${theme.colors.primary};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
`;

const ProductMeta = styled.div`
  margin-top: 2rem;

  p {
    font-size: 1rem;
    color: ${theme.colors.muted};
    margin-bottom: 0.5rem;
  }
`;

const DescriptionSection = styled.div`
  margin-top: 4rem;
`;

const Tab = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid ${theme.colors.muted};
`;

const TabItem = styled.button<{ active?: boolean }>`
  padding: 1rem;
  border: none;
  background: none;
  font-size: 1.125rem;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? theme.colors.text : theme.colors.muted)};
  border-bottom: ${({ active }) =>
    active ? `2px solid ${theme.colors.accent}` : "none"};
  cursor: pointer;
`;

const DescriptionContent = styled.div`
  padding: 2rem 0;

  p {
    font-size: 1rem;
    color: ${theme.colors.muted};
  }
`;
