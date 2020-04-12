import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.nav`
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled(NavLink)`
  padding: 5px 10px;
  text-decoration: none;
  border-right: 1px solid #8bd390;
  &:hover {
    text-decoration: underline;
  }
  &:last-child {
    border: 0;
  }
`;

const Header = () => {
  return (
    <>
      <h1>Covid 2020 visual</h1>
      <StyledMenu>
        <StyledLink to="/">World</StyledLink>
        <StyledLink to="/russia">Russia</StyledLink>
      </StyledMenu>
    </>
  );
};

export default Header;
