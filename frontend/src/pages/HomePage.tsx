// src/pages/HomePage.tsx
import React from 'react';
import styled from 'styled-components';
import HeroImage from '../assets/images/hero.png';
import Container from '../components/shared/Container';
import { theme } from '../styles/theme';

const HomePage: React.FC = () => {
  return (
    <Main>
      <HeroSection>
        <HeroImageWrapper>
          <img src={HeroImage} alt="Hero" />
        </HeroImageWrapper>
        <Container>
          <HeroContent>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              elit tellus, luctus nec ullamcorper mattis.
            </p>
          </HeroContent>
        </Container>
      </HeroSection>
    </Main>
  );
};

export default HomePage;

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
