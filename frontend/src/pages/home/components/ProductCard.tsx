/** @format */

// src/components/ProductCard.tsx
import React from 'react';
import { FaExchangeAlt, FaHeart, FaShareAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

interface ProductProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  discount?: number;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  image,
  title,
  description,
  price,
  oldPrice,
  discount,
  isNew,
}) => {
  return (
    <Card>
      {discount && <DiscountTag>-{discount}%</DiscountTag>}
      {isNew && <NewTag>New</NewTag>}
      <ImageWrapper>
        <Image src={image} alt={title} />
      </ImageWrapper>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Prices>
          <CurrentPrice>Rp {price}</CurrentPrice>
          {oldPrice && <OldPrice>Rp {oldPrice}</OldPrice>}
        </Prices>
      </Content>
      <Overlay>
        <OverlayButton>See Details</OverlayButton>
        <OverlayIcons>
          <OverlayIcon>
            <FaShareAlt /> Share
          </OverlayIcon>
          <OverlayIcon>
            <FaExchangeAlt /> Compare
          </OverlayIcon>
          <OverlayIcon>
            <FaHeart /> Like
          </OverlayIcon>
        </OverlayIcons>
      </Overlay>
    </Card>
  );
};

export default ProductCard;

// Styled Components
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const Card = styled.div`
  width: 100%;
  height: 446px;
  background: ${theme.colors.background};
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const DiscountTag = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${theme.colors.accent};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;
`;

const NewTag = styled.div`
position: absolute;
top: 15px;
right: 15px;
background-color: ${theme.colors.secondary};
color: ${theme.colors.white};
font-size: 16px;
font-weight: 500;
width: 50px;
height: 50px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
text-align: right;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 60%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600; // Semibold
  color: ${theme.colors.text};
  margin-bottom: 0.25rem;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 500; // Medium
  color: ${theme.colors.muted};
  margin-bottom: 1rem;
`;

const Prices = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 20px;
  font-weight: 600; // Semibold
  color: ${theme.colors.text};
`;

const OldPrice = styled.span`
  font-size: 16px;
  font-weight: 400; // Regular
  color: ${theme.colors.muted};
  text-decoration: line-through;
`;

const OverlayButton = styled.button`
  font-size: 16px;
  font-weight: 600; // Semibold
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  padding: 0.75rem 59px;

  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const OverlayIcons = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const OverlayIcon = styled.div`
  font-size: 16px;
  font-weight: 600; // Semibold
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
