/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Container from "../../components/shared/Container";
import { Product } from "../../models/Product";
import { fetchProducts } from "../../services/ProductServices";
import { theme } from "../../styles/theme";
import ProductSection from "../home/components/ProductSection";
import ImageGallery from "./components/ImageGallery";
import TopBarDetails from "./components/TopBarDetails";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showMoreClicks, setShowMoreClicks] = useState<number>(0);
  const navigate = useNavigate();

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

        const relatedProductsResponse = await fetchProducts(
          productData.category.id,
          5,
          undefined,
          undefined,
          undefined,
          true
        );

        const filteredRelatedProducts = relatedProductsResponse.products.filter(
          (relatedProduct) => relatedProduct.id !== productData.id
        );

        setRelatedProducts(filteredRelatedProducts);
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

  const handleShowMore = async () => {
    setShowMoreClicks((prev) => prev + 1);

    if (showMoreClicks === 1) {
      navigate(`/shop?category_id=${product.category?.id}`);
      return;
    }
    try {
      const moreProductsResponse = await fetchProducts(
        undefined,
        4,
        2,
        undefined,
        undefined,
        true
      );
      const moreProducts = moreProductsResponse.products;

      console.log(
        "Mais produtos category:",
        moreProducts.map((p) => p.name + " - " + p.category?.name)
      );

      setRelatedProducts((prevProducts) => [...prevProducts, ...moreProducts]);

      console.log(
        "Mais produtos category:",
        moreProducts.map((p) => p.name + " - " + p.category?.name)
      );
    } catch (error) {
      console.error("Erro ao buscar mais produtos:", error);
    }
  };

  return (
    <Main>
      <TopBarDetails productName={product.name} />
      <Container>
        <ProductWrapper>
          <ImageGallery product={product}></ImageGallery>
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
            <h4>{product.large_description}</h4>

            <Options>
              <SizeSelector>
                <span>Tamanho</span>
                <div>
                  {product.sizes?.map((size, index) => (
                    <SizeOption key={index}>{size}</SizeOption>
                  ))}
                </div>
              </SizeSelector>
              <ColorSelector>
                <span>Cor</span>
                <div>
                  {product.colors?.map((color, index) => (
                    <ColorOption
                      key={index}
                      style={{ background: color.name }}
                      onClick={() => handleColorSelect(color.image_url)}
                    />
                  ))}
                </div>
              </ColorSelector>
            </Options>

            <ActionButtons>
              <QuantitySelector>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </QuantitySelector>
              <AddToCartButton>Add To Cart</AddToCartButton>
              <CompareButton>+ Compare</CompareButton>
            </ActionButtons>

            <ProductMeta>
              <p>SKU: {product.sku}</p>
              <p>Categoria: {product.category?.name}</p>
              <p>Tags: {product.tags?.join(", ") || "N/A"}</p>
              {/* Component to share the product */}
            </ProductMeta>
          </ProductInfo>
        </ProductWrapper>
      </Container>
      <hr />
      <Container>
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
      <ProductSection
        title="Related Products"
        products={relatedProducts}
        showMore={handleShowMore}
      />
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
  background: ${theme.colors.white};
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
  flex-wrap: wrap;
`;

const AddToCartButton = styled.button`
  padding: 17px 48px;
  background: transparent;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.text};
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;
const CompareButton = styled.button`
  padding: 17px 48px;
  background: transparent;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.text};
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;
const ProductInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 13px;
    font-weight: 400;
    color: ${theme.colors.black};
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-size: 24px;
  .discounted {
    color: ${theme.colors.black};

    // font-weight: bold;
    margin-right: 1rem;
  }
  .original {
    text-decoration: line-through;
    color: ${theme.colors.muted};
  }
  .normal {
    font-weight: bold;
  }
`;

const Options = styled.div`
  margin: 1rem 0;
`;

const SizeSelector = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    font-size: 14px;
    color: ${theme.colors.muted};
  }
`;

// If selected must be primary font color white else primaryLight and font color black
const SizeOption = styled.button`
  margin-right: 16px;
  padding: 10px 17px;
  border-radius: 5px;
  background: ${theme.colors.primaryLight};
  cursor: pointer;
  border: none;
`;

const ColorSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    font-size: 14px;
    color: ${theme.colors.muted};
  }
`;

const ColorOption = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 16px;
  border: none;
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
  gap: 10px;
  border: 1px solid ${theme.colors.muted};
  border-radius: 15px;

  button {
    background: none;
    border: none;
    padding: 17px 20px;
    cursor: pointer;
  }
`;

const ProductMeta = styled.div`
  margin-top: 2rem;
  gap: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DescriptionSection = styled.div`
  margin-top: 3rem;
  margin-bottom: 34px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  max-width: 1026px;
  align-items: center;
`;

const Tab = styled.div`
  display: flex;
  gap: 52px;

  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TabItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  font-weight: ${({ active }) => (active ? "medium" : "normal")};
  color: ${({ active }) => (active ? theme.colors.black : theme.colors.muted)};
  cursor: pointer;
  padding-bottom: 43px;
`;

const DescriptionContent = styled.div`
  font-size: 16px;
  color: ${theme.colors.muted};
  text-align: justify;
`;

const ShareWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SocialIcon = styled.div`
  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 1.25rem;
  }
`;
