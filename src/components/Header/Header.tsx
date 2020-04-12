import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <h1>Covid 2020 visual</h1>
      <NavLink to="/">World</NavLink>
      <NavLink to="/russia">Russia</NavLink>
    </>
  );
};

export default Header;
