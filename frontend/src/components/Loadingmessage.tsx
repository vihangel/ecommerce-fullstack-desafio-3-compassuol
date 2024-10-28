/** @format */

import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface LoadingMessageProps {
  message: string;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ message }) => {
  return <StyledLoadingMessage>{message}</StyledLoadingMessage>;
};

export default LoadingMessage;

const StyledLoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: 2rem 0;
  color: ${theme.colors.text};
`;
