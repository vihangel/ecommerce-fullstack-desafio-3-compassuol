/** @format */

// src/components/FeatureSection.tsx
import React from 'react';
import styled from 'styled-components';
import ShippingIcon from '../../../assets/icons/ic_shipping.svg';
import SupportIcon from '../../../assets/icons/ic_support.svg';
import TrophyIcon from '../../../assets/icons/ic_trophy.svg';
import WarrantyIcon from '../../../assets/icons/ic_warranty.svg';
import { theme } from '../../../styles/theme';

const features = [
  {
    icon: TrophyIcon,
    title: "High Quality",
    subtitle: "crafted from top materials",
  },
  {
    icon: WarrantyIcon,
    title: "Warranty Protection",
    subtitle: "Over 2 years",
  },
  {
    icon: ShippingIcon,
    title: "Free Shipping",
    subtitle: "Order over 150 $",
  },
  {
    icon: SupportIcon,
    title: "24 / 7 Support",
    subtitle: "Dedicated support",
  },
];

const FeatureSection: React.FC = () => {
  return (
    <Section>
      <FeatureContainer>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <IconWrapper>
              <img src={feature.icon} alt={feature.title} />
            </IconWrapper>
            <TextWrapper>
              <Title>{feature.title}</Title>
              <Subtitle>{feature.subtitle}</Subtitle>
            </TextWrapper>
          </FeatureCard>
        ))}
      </FeatureContainer>
    </Section>
  );
};

export default FeatureSection;

// Styled Components
const Section = styled.section`
  background-color: #FAF3EA; 
  padding: 100px 53px;
`;


const FeatureContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: space-between;
  gap: 55px; 
  max-width: 1440px;
margin: 0 auto;
flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

`;

const IconWrapper = styled.div`
  
margin-right:10px;
  img {
    width: 60px; 
   
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;

`;

const Title = styled.h3`
  font-size: 25px; 
  font-weight: 600; 
  line-height: 1.2;
  margin-bottom: 0.2rem;
  color: ${theme.colors.text};

`;

const Subtitle = styled.p`
  font-size: 20px; 
  font-weight: 500;line-height: 1.2;
  color: ${theme.colors.muted};
`;

