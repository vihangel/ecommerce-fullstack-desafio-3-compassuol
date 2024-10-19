import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeroImage from '../../assets/images/hero.png';
import Container from '../../components/shared/Container';
import { theme } from '../../styles/theme';
import ProductSection from '../home/components/ProductSection';
import CategorySection from './components/CategorySection';
import FeatureSection from './components/FeatureSection';

const HomePage: React.FC = () => {

  const useMockData = false;

  const [products, setProducts] = useState(mockProducts); 
  const [loading, setLoading] = useState<boolean>(!useMockData); 

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (useMockData) {
      setLoading(true);
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 2000); 
    } else {
      setLoading(true);
      setError(null);
      axios
        .get('http://localhost:3000/products?limit=8')
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar produtos:', error);
          setError('Estamos com problemas para exibir os produtos. Tente novamente mais tarde.');
          setProducts(mockProducts);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [useMockData]);

  

  return (
    <Main>
      <HeroSection>
        <HeroImageWrapper>
          <img src={HeroImage} alt="Hero" />
        </HeroImageWrapper>
        <Container>
          <HeroContent>
            <h2>Transforme sua casa!</h2>
            <p>
              Descubra móveis e decorações que combinam com seu estilo e trazem conforto
              e elegância ao seu lar. Dê vida aos seus espaços e crie memórias inesquecíveis.
            </p>
          </HeroContent>
        </Container>
      </HeroSection>
      <CategorySection />
      
      {loading ? (
        <LoadingMessage>Carregando produtos...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <ProductSection title="Our Products" products={products} />
      )}
      <FeatureSection />
    </Main>
  );
};



export default HomePage;

// Componentes adicionais para o feedback visual
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

// Styled Components
const Main = styled.main`
  padding-top: 100px; /* Para garantir que o conteúdo não fique atrás da AppBar */
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  display: flex;
  align-items: end;

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const HeroImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  position: relative;
  width: 50%;
  max-width: 512px;
  margin: 0 0 0 auto;
  padding: 1rem;
  background: #fff3e3;
  opacity: 0.9;
  text-align: left;

  h2 {
    font-size: 2rem;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.main};
  }

  p {
    font-size: 1rem;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.main};
  }

  @media (max-width: 768px) {
    width: 80%;
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.875rem;
    }
  }
`;

// Mock Data
const mockProducts = [
  {
      "id": 90,
      "name": "Syltherine",
      "sku": "S002",
      "description": "Stylish cafe chair",
      "large_description": "Comfortable and elegant, perfect for cafes.",
      "price": "2500000",
      "discount_price": "2000000",
      "discount_percent": 20,
      "is_new": false,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282497/products/product_90.png",
      "created_date": "2024-10-18T20:14:56.675Z",
      "updated_date": "2024-10-18T20:14:56.675Z",
      "category": {
          "id": 45,
          "name": "Furniture"
      }
  },
  {
      "id": 91,
      "name": "Leviosa",
      "sku": "S003",
      "description": "Luxury big sofa",
      "large_description": "Perfect for the entire family with premium comfort.",
      "price": "7000000",
      "discount_price": "6000000",
      "discount_percent": 15,
      "is_new": false,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282498/products/product_91.png",
      "created_date": "2024-10-18T20:14:58.082Z",
      "updated_date": "2024-10-18T20:14:58.082Z",
      "category": {
          "id": 45,
          "name": "Furniture"
      }
  },
  {
      "id": 92,
      "name": "Lolito",
      "sku": "S004",
      "description": "Outdoor bar table and stool",
      "large_description": "Durable and stylish for outdoor gatherings.",
      "price": "500000",
      "discount_price": "450000",
      "discount_percent": 10,
      "is_new": false,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282499/products/product_92.png",
      "created_date": "2024-10-18T20:14:59.150Z",
      "updated_date": "2024-10-18T20:14:59.150Z",
      "category": {
          "id": 46,
          "name": "Outdoor"
      }
  },
  {
      "id": 93,
      "name": "Muggo",
      "sku": "S005",
      "description": "Small mug",
      "large_description": "Perfect for coffee or tea, with a minimalist design.",
      "price": "150000",
      "discount_price": null,
      "discount_percent": null,
      "is_new": true,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282500/products/product_93.png",
      "created_date": "2024-10-18T20:14:59.938Z",
      "updated_date": "2024-10-18T20:14:59.938Z",
      "category": {
          "id": 47,
          "name": "Lighting"
      }
  },
  {
      "id": 94,
      "name": "Respira",
      "sku": "S006",
      "description": "Night lamp",
      "large_description": "Elegant night lamp with soft lighting, perfect for a bedroom.",
      "price": "1500000",
      "discount_price": "1200000",
      "discount_percent": 20,
      "is_new": false,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282501/products/product_94.png",
      "created_date": "2024-10-18T20:15:00.784Z",
      "updated_date": "2024-10-18T20:15:00.784Z",
      "category": {
          "id": 48,
          "name": "Bedroom"
      }
  },
  {
      "id": 95,
      "name": "Grifo",
      "sku": "S007",
      "description": "Stylish lamp",
      "large_description": "Stylish modern lamp with a sleek design, great for living rooms or bedrooms.",
      "price": "1500000",
      "discount_price": null,
      "discount_percent": null,
      "is_new": false,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282502/products/product_95.png",
      "created_date": "2024-10-18T20:15:01.742Z",
      "updated_date": "2024-10-18T20:15:01.742Z",
      "category": {
          "id": 48,
          "name": "Bedroom"
      }
  },
  {
      "id": 96,
      "name": "Pingky",
      "sku": "S008",
      "description": "Cute bed set",
      "large_description": "Soft and cozy bed set that adds warmth to your bedroom decor.",
      "price": "7000000",
      "discount_price": "5600000",
      "discount_percent": 20,
      "is_new": false,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282503/products/product_96.png",
      "created_date": "2024-10-18T20:15:02.667Z",
      "updated_date": "2024-10-18T20:15:02.667Z",
      "category": {
          "id": 45,
          "name": "Furniture"
      }
  },
  {
      "id": 97,
      "name": "Potty",
      "sku": "S009",
      "description": "Minimalist flower pot",
      "large_description": "Modern minimalist flower pot, ideal for home or office use.",
      "price": "500000",
      "discount_price": "450000",
      "discount_percent": 10,
      "is_new": true,
      "image_data": null,
      "image_url": "https://res.cloudinary.com/degnvmueo/image/upload/v1729282503/products/product_97.png",
      "created_date": "2024-10-18T20:15:03.578Z",
      "updated_date": "2024-10-18T20:15:03.578Z",
      "category": {
          "id": 46,
          "name": "Outdoor"
      }
  }
]
;
