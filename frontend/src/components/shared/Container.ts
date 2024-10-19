/** @format */

// src/components/shared/Container.ts
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${theme.spacing.containerPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Container;
