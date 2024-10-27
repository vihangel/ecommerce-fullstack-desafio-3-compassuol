/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../../../components/shared/Container";
import { Category } from "../../../models/Category";
import { fetchCategories } from "../../../services/CategoryServices";
import { theme } from "../../../styles/theme";

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories();

        // Filtrar pelas categorias desejadas: Dining, Living, Bedroom
        const preferredCategories = ["Dining", "Living", "Bedroom"];
        let selectedCategories = fetchedCategories.filter((category) =>
          preferredCategories.includes(category.name)
        );

        // Caso não tenha todas as categorias preferidas, pegar as primeiras disponíveis
        if (selectedCategories.length < 3) {
          selectedCategories = [
            ...selectedCategories,
            ...fetchedCategories
              .filter((category) => !selectedCategories.includes(category))
              .slice(0, 3 - selectedCategories.length),
          ];
        }

        setCategories(selectedCategories);
      } catch (error) {
        setError("Erro ao buscar categorias. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <LoadingMessage>Carregando categorias...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Section>
      <Container>
        <ContentWrapper>
          <Title>Browse The Range</Title>
          <CategoryGrid>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                onClick={() => navigate(`/shop?category_id=${category.id}`)}
              >
                <CategoryImage
                  src={
                    category.image_url || "/assets/images/default_category.png"
                  }
                  alt={category.name}
                />
                <CategoryTitle>{category.name}</CategoryTitle>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default CategorySection;
// Styled Components
const Section = styled.section`
  background-color: ${theme.colors.white};
  padding: 4rem 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const Title = styled.h2`
  color: ${theme.colors.text};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;

  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transform: translateY(-0.625rem);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: 10px;
`;

const CategoryTitle = styled.h3`
  color: ${theme.colors.text}; // Cor do título da categoria
  font-size: 1.5rem; // Tamanho da fonte
  font-weight: 600; // Peso da fonte (semi-bold)
  margin-top: 1rem;
`;

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
