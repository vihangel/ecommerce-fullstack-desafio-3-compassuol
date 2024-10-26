/** @format */

// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Definição de estilo base */
  html, body {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f9f9f9;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: ${theme.colors.muted};

  }

  hr {
    border: none;
  border-top: 1px solid ${theme.colors.hr};
  }
`;

export default GlobalStyles;
