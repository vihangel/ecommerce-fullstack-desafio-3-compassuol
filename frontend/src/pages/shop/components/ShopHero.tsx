/** @format */

// src/components/ShopHero.tsx
import React from "react";
import styled from "styled-components";
import HeroImage from "../../../assets/images/hero_shop.png";
import { theme } from "../../../styles/theme";

const ShopHero: React.FC = () => {
  return (
    <HeroSection>
      <HeroImageWrapper>
        <img src={HeroImage} alt="Hero" />
      </HeroImageWrapper>
      <HeroContent>
        <h2>Shop</h2>
        <Breadcrumb>Home &gt; Shop</Breadcrumb>
      </HeroContent>
    </HeroSection>
  );
};

export default ShopHero;

// Styled Components
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 316px;
  overflow: hidden;
  display: flex;
  align-items: end;
  color: ${theme.colors.black};
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
  padding: 2rem;
  margin: auto auto;
  text-align: center;

  h2 {
    font-size: 48px;
    font-weight: medium;
  }
`;

const Breadcrumb = styled.p`
  font-size: 16px;
  weight: light;
`;
