/** @format */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultProductImage from "../../../assets/images/default_product.png";
import { Product } from "../../../models/Product";
import { theme } from "../../../styles/theme";

interface ImageGalleryProps {
  product: Product;
  selectedColor?: string;
  onImageChange?: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  product,
  selectedColor,
  onImageChange,
}) => {
  const [mainImage, setMainImage] = useState<string>(
    selectedColor
      ? (product.colors ?? []).find((color) => color.name === selectedColor)
          ?.image_url ||
          product.cover_image_url ||
          defaultProductImage
      : product.cover_image_url || defaultProductImage
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const colorImage = selectedColor
      ? (product.colors ?? []).find((color) => color.name === selectedColor)
          ?.image_url
      : null;
    setMainImage(colorImage || product.cover_image_url || defaultProductImage);
    setSelectedImage(
      colorImage || product.cover_image_url || defaultProductImage
    );
  }, [product, selectedColor]);

  const handleImageSelect = (imageUrl: string) => {
    setMainImage(imageUrl);
    setSelectedImage(imageUrl);
    if (onImageChange) {
      onImageChange(imageUrl);
    }
  };

  return (
    <ImageGalleryDiv>
      <ThumbnailGallery>
        {/* Galeria de imagens do produto */}
        {product.gallery_images?.map((imageUrl, index) => (
          <Thumbnail
            key={`gallery-${index}`}
            src={imageUrl || defaultProductImage}
            alt={`${product.name} - Imagem ${index + 1}`}
            onClick={() => handleImageSelect(imageUrl)}
            onError={(e) => {
              e.currentTarget.src = defaultProductImage;
            }}
            selected={selectedImage === imageUrl}
          />
        ))}

        {/* Imagens associadas às cores do produto */}
        {product.colors?.map((color, index) => (
          <Thumbnail
            key={`color-${index}`}
            src={color.image_url || defaultProductImage}
            alt={`${product.name} - Cor ${color.name}`}
            onClick={() => handleImageSelect(color.image_url)}
            onError={(e) => {
              e.currentTarget.src = defaultProductImage;
            }}
            selected={selectedImage === color.image_url}
          />
        ))}

        <Thumbnail
          key={`color-last`}
          src={product.cover_image_url || defaultProductImage}
          alt={`${product.name} - Capa`}
          onClick={() =>
            handleImageSelect(product.cover_image_url ?? defaultProductImage)
          }
          onError={(e) => {
            e.currentTarget.src = defaultProductImage;
          }}
          selected={selectedImage === product.cover_image_url}
        />
      </ThumbnailGallery>
      <MainImage
        src={mainImage || defaultProductImage}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src = defaultProductImage;
        }}
      />
    </ImageGalleryDiv>
  );
};

export default ImageGallery;

const ImageGalleryDiv = styled.div`
  display: flex;
  gap: 31px;

  @media (max-width: 1050px) {
    flex-direction: column-reverse;
  }
`;
const MainImage = styled.img`
  width: 100%;
  max-width: 423px;

  height: 500px;
  object-fit: contain;
  border-radius: 10px;
  background: ${theme.colors.primaryLight};

  @media (max-width: 750px) {
    height: auto;
  }
`;
const ThumbnailGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 1050px) {
    flex-direction: row;
    overflow-x: auto;
    gap: 0.5rem;
    padding-bottom: 1rem;
  }
`;
const Thumbnail = styled.img<{ selected?: boolean }>`
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
