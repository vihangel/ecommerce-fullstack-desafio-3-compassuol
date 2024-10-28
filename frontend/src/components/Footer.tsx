/** @format */

// src/components/Footer.tsx
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setMessage(null);
      setError(null);
      setError("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    try {
      setMessage(null);
      setError(null);
      await axios.post("http://localhost:3000/newsletter/send", { to: email });
      setMessage("Inscrição realizada com sucesso! Confira seu e-mail.");
      setEmail(""); // Limpa o campo de e-mail após o envio
    } catch (err) {
      setError(
        "Erro ao tentar se inscrever. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <FooterWrapper>
      <Container>
        <FooterSection>
          <Brand>Funiro.</Brand>
          <Address>
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </Address>
        </FooterSection>
        <FooterLinks>
          <ColumnTitle>Links</ColumnTitle>
          <LinkItem to="/">Home</LinkItem>
          <LinkItem to="/shop">Shop</LinkItem>
          <LinkItem to="#">About</LinkItem>
          <LinkItem to="#">Contact</LinkItem>
        </FooterLinks>
        <FooterHelp>
          <ColumnTitle>Help</ColumnTitle>
          <LinkItem to="#">Payment Options</LinkItem>
          <LinkItem to="#">Returns</LinkItem>
          <LinkItem to="#">Privacy Policies</LinkItem>
        </FooterHelp>
        <FooterNewsletter>
          <ColumnTitle>Newsletter</ColumnTitle>
          <SubscriptionWrapper>
            <SubscriptionInput
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SubscribeText onClick={handleSubscribe}>SUBSCRIBE</SubscribeText>
          </SubscriptionWrapper>
          {message && <SuccessMessage>{message}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FooterNewsletter>
      </Container>
      <BottomLine />
      <CopyRight>2023 Funiro. All rights reserved</CopyRight>
    </FooterWrapper>
  );
};

export default Footer;

// Styled Components
const FooterWrapper = styled.footer`
  background-color: ${theme.colors.white};
  padding: 4rem 2rem;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  wrap: wrap;
  gap: 3rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

const Brand = styled.h2`
  font-family: ${theme.fonts.main};
  font-size: 24px;
  font-weight: 700; // Bold
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const Address = styled.p`
  font-size: 16px;
  font-weight: 400; // Regular
  color: ${theme.colors.muted};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHelp = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterNewsletter = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.muted};
  margin-bottom: 1rem;
`;

const LinkItem = styled(Link)`
  font-size: 16px;
  font-weight: 500; // Medium
  color: ${theme.colors.text};
  margin-bottom: 0.75rem;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
`;

// Styled Component para o campo de entrada de e-mail
const SubscriptionInput = styled.input`
  font-size: 14px;
  font-weight: 400;
  border: none;
  min-width: 200px;
  border-bottom: 1px solid ${theme.colors.muted};
  padding: 0.7rem 0;
  margin-right: 10px;
  outline: none;
  color: ${theme.colors.text};

  &::placeholder {
    color: ${theme.colors.muted};
  }

  &:focus {
    border-bottom: 1px solid ${theme.colors.primary};
  }
`;

// Styled Component para o botão Subscribe
const SubscribeText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.black};
  border: none;
  border-bottom: 1px solid ${theme.colors.black};
  padding: 0.5rem 0;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const SubscriptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BottomLine = styled.hr`
  margin-bottom: 35px;
  margin-top: 48px;
`;

const CopyRight = styled.p`
  font-size: 16px;
  font-weight: 400; // Regular
  color: ${theme.colors.black};
  text-align: left;
`;

const SuccessMessage = styled.p`
  margin-top: 1rem;
  color: ${theme.colors.primary};
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  margin-top: 1rem;
  color: ${theme.colors.accent};
  font-size: 14px;
`;
