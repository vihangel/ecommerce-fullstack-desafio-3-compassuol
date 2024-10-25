/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/shared/Container";
import { Product } from "../../models/Product";
import { theme } from "../../styles/theme";
import TopBarDetails from "./components/TopBarDetails";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        const productData = response.data;

        setProduct(productData);
        setMainImage(productData.cover_image_url);
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

  // Função para alterar a imagem principal ao selecionar uma cor
  const handleColorSelect = (colorImageUrl: string | undefined) => {
    setMainImage(colorImageUrl || product.cover_image_url || null);
    setSelectedColor(colorImageUrl || null);
  };

  return (
    <Main>
      <TopBarDetails productName={product.name} />
      <Container>
        <ProductWrapper>
          <ImageGallery>
            <ThumbnailGallery>
              {/* Listagem da galeria de imagens e imagens associadas às cores */}
              {product.gallery_images?.map((imageUrl, index) => (
                <Thumbnail
                  key={index}
                  src={imageUrl || undefined}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  onClick={() => setMainImage(imageUrl)}
                />
              ))}
              {product.colors?.map((color, index) => (
                <Thumbnail
                  key={index}
                  src={color.image_url || undefined}
                  alt={`${product.name} - Cor ${color.name}`}
                  onClick={() => handleColorSelect(color.image_url)}
                />
              ))}
            </ThumbnailGallery>
            <MainImage src={mainImage || undefined} alt={product.name} />
          </ImageGallery>
          <ProductInfo>
            <h2>{product.name}</h2>
            <Price>
              {product.discount_price ? (
                <>
                  <span className="discounted">
                    {formatPrice(product.discount_price)}
                  </span>
                  <span className="original">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="normal">{formatPrice(product.price)}</span>
              )}
            </Price>
            <p>{product.large_description}</p>

            <Options>
              <SizeSelector>
                <span>Tamanho</span>
                {product.sizes?.map((size, index) => (
                  <SizeOption key={index}>{size}</SizeOption>
                ))}
              </SizeSelector>
              <ColorSelector>
                <span>Cor</span>
                {product.colors?.map((color, index) => (
                  <ColorOption
                    key={index}
                    style={{ background: color.name }}
                    onClick={() => handleColorSelect(color.image_url)}
                  />
                ))}
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
              <p>SKU: {product.sku}</p>
              <p>Categoria: {product.category?.name}</p>
              <p>Tags: {product.tags?.join(", ") || "N/A"}</p>
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
            <p>{product.additional_information}</p>
          </DescriptionContent>
        </DescriptionSection>
      </Container>
    </Main>
  );
};

export default ProductDetailsPage;

// Função auxiliar para formatar o preço
const formatPrice = (price: string): string => {
  return parseInt(price, 10).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

// Styled Components

const Main = styled.main`
  padding-top: 100px;
`;

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

const ProductWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-top: 35px;
`;

const ImageGallery = styled.div`
  display: flex;
  gap: 31px;
`;
const MainImage = styled.img`
  width: 423px;
  height: 500px;
  object-fit: contain;
  border-radius: 10px;
  background: ${theme.colors.primaryLight};
`;
const ThumbnailGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Thumbnail = styled.img`
  width: 76px;
  height: 80px;
  cursor: pointer;
  object-fit: cover;
  border-radius: 10px;
  background: ${theme.colors.primaryLight};
  &:hover {
    border-color: ${theme.colors.primary};
  }
`;
const AddToCartButton = styled.button`
  padding: 0.75rem 2rem;
  background: transparent;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.text};
  cursor: pointer;
  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.white};
  }
`;
const CompareButton = styled.button`
  padding: 0.75rem 2rem;
  background: transparent;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.text};
  cursor: pointer;
  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.white};
  }
`;
const ProductInfo = styled.div`
  flex: 1;
`;

const Price = styled.div`
  margin: 1rem 0;
  .discounted {
    color: ${theme.colors.accent};
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1rem;
  }
  .original {
    text-decoration: line-through;
    color: ${theme.colors.muted};
  }
  .normal {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Options = styled.div`
  margin: 1rem 0;
`;

const SizeSelector = styled.div`
  margin-bottom: 1rem;
`;

const SizeOption = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${theme.colors.primary};
  background: ${theme.colors.white};
  cursor: pointer;
`;

const ColorSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorOption = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid ${theme.colors.text};
  cursor: pointer;
`;

const ActionButtons = styled.div`
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  button {
    padding: 0.5rem;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
    cursor: pointer;
  }
`;

const ProductMeta = styled.div`
  margin-top: 2rem;
`;

const DescriptionSection = styled.div`
  margin-top: 3rem;
`;

const Tab = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid ${theme.colors.muted};
  margin-bottom: 1rem;
`;

const TabItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-size: 1.25rem;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.text)};
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: ${({ active }) =>
    active ? `2px solid ${theme.colors.primary}` : "none"};
`;

const DescriptionContent = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text};
`;
