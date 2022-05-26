import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function NavLinks() {
  const location = useLocation();
  const isCurrentURL = (url: string) => {
    return location.pathname.toLowerCase() === url.toLowerCase();
  };
  return (
    // <nav style={{ position: 'fixed', bottom: 0 }}>
    <nav>
      <StyleNavLink
        to="/item-list"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        List
      </StyleNavLink>

      <StyleNavLink
        to="/add-item"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        Add Item
      </StyleNavLink>

      <StyleNavLink
        to="/aboutus"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        About Us
      </StyleNavLink>
    </nav>
  );
}

export default NavLinks;

const StyleNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 12px;
  &:hover {
    background-color: lightblue;
    color: #152b51;
    height: 10vh;
  }
`;
