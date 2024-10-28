/** @format */

import React from "react";
import styled from "styled-components";
import { Product } from "../../../models/Product";
import { theme } from "../../../styles/theme";

interface ProductOptionsProps {
  product: Product;
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  setSelectedColor: (color: string | null) => void;
  setMainImage: (url: string | null) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  setSelectedColor,
  setMainImage,
}) => (
  <Options>
    <SizeSelector>
      <span>Tamanho</span>
      <div>
        {product.sizes?.map((size, index) => (
          <SizeOption
            key={index}
            onClick={() => setSelectedSize(size)}
            selected={selectedSize === size}
          >
            {size}
          </SizeOption>
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
            onClick={() => {
              setSelectedColor(color.name);
              setMainImage(color.image_url);
            }}
            selected={color.name === selectedSize}
          />
        ))}
      </div>
    </ColorSelector>
  </Options>
);

export default ProductOptions;

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
const SizeOption = styled.button<{ selected: boolean }>`
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

const ColorOption = styled.button<{ selected: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 16px;
  border: none;
  cursor: pointer;
`;
