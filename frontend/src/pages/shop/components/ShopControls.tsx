/** @format */

// src/components/ShopControls.tsx
import React from "react";
import styled from "styled-components";
import Container from "../../../styles/Container";
import { theme } from "../../../styles/theme";

import FilterIcon from "../../../assets/icons/ic_filter.svg";
import GridIcon from "../../../assets/icons/ic_grid.svg";
import ListIcon from "../../../assets/icons/ic_list.svg";

const ShopControls: React.FC = () => {
  return (
    <ControlsWrapper>
      <Container>
        <LeftControls>
          <FilterButton>
            <Icon src={FilterIcon} alt="Filter Icon" />
            Filter
          </FilterButton>
          <ViewToggle>
            <ViewIcon active>
              <Icon src={GridIcon} alt="Grid Icon" />
            </ViewIcon>
            <ViewIcon>
              <Icon src={ListIcon} alt="List Icon" />
            </ViewIcon>
          </ViewToggle>
          <Separator />
          <ResultsText>Showing 1–16 of 32 results</ResultsText>
        </LeftControls>
        <RightControls>
          <ShowLabel>Show</ShowLabel>
          <ShowInput type="number" defaultValue={16} />
          <SortByLabel>Sort by</SortByLabel>
          <SortBySelect>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </SortBySelect>
        </RightControls>
      </Container>
    </ControlsWrapper>
  );
};

export default ShopControls;

// Styled Components

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 1.5rem 0;
  background-color: #f9f1e7;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${theme.colors.text};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ViewIcon = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => (props.active ? theme.colors.text : theme.colors.muted)};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${theme.colors.muted};
`;

const ResultsText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ShowLabel = styled.label`
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const ShowInput = styled.input`
  width: 50px;
  font-size: 1rem;
  padding: 0.25rem;
  text-align: center;
  border: 0px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SortByLabel = styled.label`
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const SortBySelect = styled.select`
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border: 0px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;
