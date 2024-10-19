import React from 'react';
import styled from 'styled-components';
import BedroomImage from '../../../assets/images/bedroom_section.png';
import DiningImage from '../../../assets/images/dining_section.png';
import LivingImage from '../../../assets/images/living_section.png';
import Container from '../../../components/shared/Container';
import { theme } from '../../../styles/theme';

const CategorySection: React.FC = () => {
    return (
      <Section>
        <Container>
          <ContentWrapper>
            <Title>Browse The Range</Title>
            <CategoryGrid>
              <CategoryCard>
                <CategoryImage src={DiningImage} alt="Dining" />
                <CategoryTitle>Dining</CategoryTitle>
              </CategoryCard>
              <CategoryCard>
                <CategoryImage src={LivingImage} alt="Living" />
                <CategoryTitle>Living</CategoryTitle>
              </CategoryCard>
              <CategoryCard>
                <CategoryImage src={BedroomImage} alt="Bedroom" />
                <CategoryTitle>Bedroom</CategoryTitle>
              </CategoryCard>
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
  `;
  
  const CategoryImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
  `;
  
  const CategoryTitle = styled.h3`
    color: ${theme.colors.text}; // Cor do título da categoria
    font-size: 1.5rem; // Tamanho da fonte
    font-weight: 600; // Peso da fonte (semi-bold)
    margin-top: 1rem;
  `;