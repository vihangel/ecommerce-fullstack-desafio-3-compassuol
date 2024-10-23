/** @format */

import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const ErrorPage: React.FC = () => {
  return (
    <ErrorPageSection>
      <h1>Ops!</h1>
      <br />
      <h4>Parece que você se perdeu entre as almofadas do sofá.</h4>
      <p>Não conseguimos encontrar o que você buscava. Vamos tentar de novo?</p>
      <br />
      <PageButton active={true} onClick={() => (window.location.href = "/")}>
        Voltar para a página inicial
      </PageButton>
    </ErrorPageSection>
  );
};

export default ErrorPage;

const ErrorPageSection = styled.main`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  flex-direction: column;
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
