/** @format */

// src/components/Pagination.tsx
import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <PaginationWrapper>
      {currentPage > 1 && (
        <PageButton onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </PageButton>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <PageButton
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </PageButton>
      ))}
      {currentPage < totalPages && (
        <PageButton onClick={() => onPageChange(currentPage + 1)}>
          Next
        </PageButton>
      )}
    </PaginationWrapper>
  );
};

export default Pagination;

// Styled Components
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 0;
  background-color: ${theme.colors.white};
  width: 100%;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.background};
  color: ${(props) => (props.active ? theme.colors.white : theme.colors.text)};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.white};
  }
`;
