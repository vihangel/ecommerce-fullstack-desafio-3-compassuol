/** @format */

// src/components/TopBarDetails.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../../../styles/Container";
import { theme } from "../../../styles/theme";

interface TopBarDetailsProps {
  productName: string;
}

const TopBarDetails: React.FC<TopBarDetailsProps> = ({ productName }) => {
  const navigate = useNavigate();

  return (
    <TopBarWrapper>
      <Container>
        <Breadcrumb>
          <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
          </svg>

          <BreadcrumbItem onClick={() => navigate("/shop")}>
            Shop
          </BreadcrumbItem>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
          </svg>
          <svg
            width="2"
            height="37"
            viewBox="0 0 2 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="1" x2="1" y2="37" stroke="#9F9F9F" stroke-width="2" />
          </svg>

          <ProductName>{productName}</ProductName>
        </Breadcrumb>
      </Container>
    </TopBarWrapper>
  );
};

export default TopBarDetails;

// Styled Components
const TopBarWrapper = styled.div`
  padding: 1rem 0;
  background-color: #f9f1e7;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  padding-right: 2rem;
  height: 100%;
`;

const BreadcrumbItem = styled.span`
  color: ${theme.colors.muted};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ProductName = styled.span`
  color: ${theme.colors.text};

  font-size: 16px;
`;
