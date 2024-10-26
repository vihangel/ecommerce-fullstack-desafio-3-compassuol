/** @format */

// src/components/ShopControls.tsx
import React from "react";
import styled from "styled-components";
import Container from "../../../styles/Container";
import { theme } from "../../../styles/theme";

import FilterIcon from "../../../assets/icons/ic_filter.svg";
import GridIcon from "../../../assets/icons/ic_grid.svg";
import ListIcon from "../../../assets/icons/ic_list.svg";

interface ShopControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  handlePageChange: (page: number) => void;
  handleSortChange: (value: "ASC" | "DESC" | "default") => void; // Adicionando a função para mudar a ordenação
}

const ShopControls: React.FC<ShopControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  handleSortChange,
}) => {
  return (
    <ControlsSection>
      <Container>
        <ControlsWrapper>
          <LeftControls>
            <FilterButton>
              <img src={FilterIcon} alt="Filter" />
              Filter
            </FilterButton>
            <ViewToggle>
              <ViewIcon active>
                <img src={GridIcon} alt="Grid View" />
              </ViewIcon>
              <ViewIcon>
                <img src={ListIcon} alt="List View" />
              </ViewIcon>
            </ViewToggle>
            <Separator />
            <ResultsText>
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
              results
            </ResultsText>
          </LeftControls>
          <RightControls>
            <ShowLabel>Show</ShowLabel>
            <ShowInput
              type="number"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            />
            <SortByLabel>Sort by</SortByLabel>
            <SortBySelect
              onChange={(e) =>
                handleSortChange(e.target.value as "ASC" | "DESC" | "default")
              }
            >
              <option value="default">Default</option>
              <option value="ASC">Price: Low to High</option>
              <option value="DESC">Price: High to Low</option>
            </SortBySelect>
          </RightControls>
        </ControlsWrapper>
      </Container>
    </ControlsSection>
  );
};

export default ShopControls;
const ControlsSection = styled.section`
  background-color: #f9f1e7;
  width: 100%;
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
