// src/pages/HomePage.tsx
import React from 'react';
import styled from 'styled-components';
import HeroImage from '../../assets/images/hero.png';
import Container from '../../components/shared/Container';
import { theme } from '../../styles/theme';
import ProductSection from '../home/components/ProductSection';
import CategorySection from './components/CategorySection';
import FeatureSection from './components/FeatureSection';

const HomePage: React.FC = () => {
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
      <CategorySection></CategorySection>
      <ProductSection title="Our Products" products={mockProducts} />
      <FeatureSection></FeatureSection>
    </Main>
  );
};

export default HomePage;


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
  background: #FFF3E3;
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
    id: 1,
    image: HeroImage,
    title: "Syltherine",
    description: "Stylish cafe chair",
    price: "2.500.000",
    oldPrice: "3.500.000",
    discount: 30,
  },
  {
    id: 2,
    image: HeroImage,
    title: "Leviosa",
    description: "Luxury big sofa",
    price: "7.000.000",
    oldPrice: "14.000.000",
    discount: 50,
  },
  {
    id: 3,
    image: HeroImage,
    title: "Lolito",
    description: "Outdoor bar table and stool",
    price: "500.000",
  },
  {
    id: 4,
    image: HeroImage,
    title: "Respira",
    description: "Night lamp",
    price: "1.500.000",
  },
  {
    id: 5,
    image: HeroImage,
    title: "Muggo",
    description: "Small mug",
    price: "150.000",
    isNew: true,
  },
  {
    id: 6,
    image: HeroImage,
    title: "Pingky",
    description: "Cute bed set",
    price: "7.000.000",
    oldPrice: "14.000.000",
    discount: 50,
  },
  {
    id: 7,
    image: HeroImage,
    title: "Potty",
    description: "Minimalist flower pot",
    price: "500.000",
  },
  {
    id: 8,
    image: HeroImage,
    title: "Grifo",
    description: "Stylish lamp",
    price: "1.500.000",
  },
];
