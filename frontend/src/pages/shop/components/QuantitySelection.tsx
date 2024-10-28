/** @format */

import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => (
  <QuantitySelectorWrapper>
    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
    <span>{quantity}</span>
    <button onClick={() => setQuantity(quantity + 1)}>+</button>
  </QuantitySelectorWrapper>
);

// ActionButtons Component
const ActionButtons: React.FC = () => (
  <ActionButtonsWrapper>
    <AddToCartButton>Add To Cart</AddToCartButton>
    <CompareButton>+ Compare</CompareButton>
  </ActionButtonsWrapper>
);

export default ActionButtons;

const ActionButtonsWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const QuantitySelectorWrapper = styled.div`
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
