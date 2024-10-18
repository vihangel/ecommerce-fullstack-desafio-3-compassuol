/** @format */

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartIcon from '../assets/icons/ic_cart.svg';
import HeartIcon from '../assets/icons/ic_heart.svg';
import SearchIcon from '../assets/icons/ic_search.svg';
import UserIcon from '../assets/icons/ic_user.svg';
import Logo from '../assets/logo.svg';
import { theme } from '../styles/theme';
import Container from './shared/Container';

const AppBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar>
        <Container>
          <LogoWrapper>
            <img src={Logo} alt="Furniro Logo" />
          </LogoWrapper>
          <HamburgerMenu onClick={toggleMenu}>
            <FaBars size={24} />
          </HamburgerMenu>
          <NavLinks isOpen={isOpen}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </NavLinks>
          <IconsContainer>
            <Icon src={UserIcon} alt="User Icon" />
            <Icon src={SearchIcon} alt="Search Icon" />
            <Icon src={HeartIcon} alt="Favorite Icon" />
            <Icon src={CartIcon} alt="Cart Icon" />
          </IconsContainer>
        </Container>
      </NavBar>
      {isOpen && <MobileMenu isOpen={isOpen} onClose={toggleMenu} />}
    </>
  );
};

export default AppBar;

// Mobile Menu Component
const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      <MobileMenuContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>
          <FaTimes size={24} />
        </CloseButton>
        <MobileNavLinks>
          <MobileNavLink to="/" onClick={onClose}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/shop" onClick={onClose}>
            Shop
          </MobileNavLink>
          <MobileNavLink to="/about" onClick={onClose}>
            About
          </MobileNavLink>
          <MobileNavLink to="/contact" onClick={onClose}>
            Contact
          </MobileNavLink>
        </MobileNavLinks>
        <MobileIconsContainer>
          <Icon src={UserIcon} alt="User Icon" />
          <Icon src={SearchIcon} alt="Search Icon" />
          <Icon src={HeartIcon} alt="Favorite Icon" />
          <Icon src={CartIcon} alt="Cart Icon" />
        </MobileIconsContainer>
      </MobileMenuContainer>
      <Backdrop onClick={onClose} />
    </>
  );
};


const NavBar = styled.nav`
  height: 100px;
  background-color: ${theme.colors.white};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  img {
    height: 41px;
    width: auto;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 950px) {
    display: block;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: ${theme.spacing.linkSpacing};
  align-items: center;
  flex-grow: 2;
  justify-content: center;
  margin:0 25px;

  @media (max-width: 950px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-family: ${theme.fonts.main};
  font-weight: 500;
  font-size: 16px;
  color: ${theme.colors.text};

  &:hover {
    color: ${theme.colors.primary};
  }

  @media (max-width: 950px) {
    font-size: 18px;
    width: 100%;
    text-align: left;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.iconSpacing};
  padding-right: 25px;
  flex-grow: 1;
  justify-content: flex-end;

  @media (max-width: 950px) {
    display: none;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: auto;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0; // Movido para a esquerda
  width: 300px;
  height: 100%;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')}; // Movido para a esquerda
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  z-index: 20;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 2rem; // Distância do topo
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  font-family: ${theme.fonts.main};
  font-weight: 500;
  font-size: 18px;
  color: ${theme.colors.text};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MobileIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.iconSpacing};
  padding-bottom: 2rem; // Espaço inferior para melhor visualização
  justify-content: center;
  width: 100%;
`;

