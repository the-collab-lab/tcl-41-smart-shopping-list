import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function NavLinks() {
  return (
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
  font-size: calc(8px + 2vmin);
  padding: 12px;
  &:hover {
    background-color: lightblue;
    color: #152b51;
    height: 10vh;
  }
`;
