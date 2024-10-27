/** @format */

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Category } from "../../../models/Category";
import { fetchCategories } from "../../../services/CategoryServices";
import { theme } from "../../../styles/theme";

interface FilterPanelProps {
  applyFilters: (filters: { [key: string]: string[] | boolean }) => void;
  currentFilters: { [key: string]: string[] | boolean };
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  applyFilters,
  currentFilters,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[] | boolean;
  }>(currentFilters);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    loadCategories();
  }, []);

  const handleCheckboxChange = (key: string, value: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[key]) {
        updatedFilters[key] = [];
      }
      if (Array.isArray(updatedFilters[key])) {
        if (updatedFilters[key].includes(value)) {
          updatedFilters[key] = updatedFilters[key].filter((v) => v !== value);
        } else {
          updatedFilters[key].push(value);
        }
      }
      return updatedFilters;
    });
  };

  const handleIsNewChange = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      is_new: !prevFilters.is_new,
    }));
  };

  const handleDiscountChange = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      discount: !prevFilters.discount,
    }));
  };

  const handleApply = () => {
    // Filtrando apenas os valores que não estão vazios
    const filtersToApply = Object.entries(selectedFilters).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          acc[key] = value;
        } else if (typeof value === "boolean" && value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as { [key: string]: string[] | boolean }
    );

    applyFilters(filtersToApply);
  };

  return (
    <StyledBox>
      <Typography variant="h5" gutterBottom>
        Filtrar por:
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      {/* Filtro de Categorias */}
      <Typography variant="h6">Categorias</Typography>
      <StyledFormGroup row>
        {categories.map((category) => (
          <StyledCategoryLabel
            key={category.id}
            control={
              <Checkbox
                checked={
                  Array.isArray(selectedFilters["category_id"]) &&
                  selectedFilters["category_id"].includes(String(category.id))
                }
                onChange={() =>
                  handleCheckboxChange("category_id", String(category.id))
                }
                color="default"
                sx={{
                  "&.Mui-checked": {
                    color: theme.colors.primary,
                  },
                }}
              />
            }
            label={category.name}
          />
        ))}
      </StyledFormGroup>

      <Divider sx={{ marginY: 2 }} />

      {/* Filtro de Produtos Novos */}
      <Typography variant="h6">Produtos Novos</Typography>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={!!selectedFilters["is_new"]}
            onChange={handleIsNewChange}
            color="default"
            sx={{
              "&.Mui-checked": {
                color: theme.colors.primary,
              },
            }}
          />
        }
        label="Apenas Produtos Novos"
      />

      <Divider sx={{ marginY: 2 }} />

      {/* Filtro de Produtos com Desconto */}
      <Typography variant="h6">Com Desconto</Typography>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={!!selectedFilters["discount"]}
            onChange={handleDiscountChange}
            color="default"
            sx={{
              "&.Mui-checked": {
                color: theme.colors.primary,
              },
            }}
          />
        }
        label="Apenas Produtos com Desconto"
      />

      <StyledButton onClick={handleApply}>Aplicar Filtros</StyledButton>
    </StyledBox>
  );
};

// Estilizações
const StyledBox = styled(Box)`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${theme.colors.background};
`;

const StyledButton = styled(Button)`
  background: ${theme.colors.primary} !important;
  color: ${theme.colors.white} !important;
  margin-top: 16px;

  &:hover {
    background: ${theme.colors.accent} !important;
  }
`;

const StyledFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

const StyledCategoryLabel = styled(FormControlLabel)`
  margin-right: 16px;
  margin-bottom: 8px;
  cursor: pointer;

  .MuiTypography-root {
    cursor: pointer;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-bottom: 8px;
`;

export default FilterPanel;
