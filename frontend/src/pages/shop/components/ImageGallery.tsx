/** @format */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultProductImage from "../../../assets/images/default_product.png";
import { Product } from "../../../models/Product";
import { theme } from "../../../styles/theme";

interface ImageGalleryProps {
  product: Product;
  initialImage?: string;
  onImageChange?: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  product,
  initialImage,
  onImageChange,
}) => {
  const [mainImage, setMainImage] = useState<string>(
    initialImage || product.cover_image_url || defaultProductImage
  );

  useEffect(() => {
    setMainImage(
      initialImage || product.cover_image_url || defaultProductImage
    );
  }, [product, initialImage]);

  const handleImageSelect = (imageUrl: string) => {
    setMainImage(imageUrl);
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
          />
        ))}
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
`;
const MainImage = styled.img`
  width: 423px;
  height: 500px;
  object-fit: contain;
  border-radius: 10px;
  background: ${theme.colors.primaryLight};
`;
const ThumbnailGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Thumbnail = styled.img`
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
