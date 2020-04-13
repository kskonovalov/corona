import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const StyledLink = styled(NavLink)`
  text-decoration: none;
`;

const Header = () => {
  return (
    <>
      <h1>Covid 2020 visual</h1>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>
          <StyledLink to="/">World</StyledLink>
        </Button>
        <Button>
          <StyledLink to="/russia">Russia</StyledLink>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Header;
