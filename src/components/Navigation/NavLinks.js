import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function NavLinks() {
  return (
    // <nav style={{ position: 'fixed', bottom: 0 }}>
    <nav>
      <NavLink
        to="/item-list"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        <NavButton>List Of Items</NavButton>
      </NavLink>
      <NavLink
        to="/add-item"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        <NavButton>Add An Item</NavButton>
      </NavLink>
    </nav>
  );
}

export default NavLinks;

const NavButton = styled.div`
  display: inline-block;
  padding: 12px;
  margin: 12px;
  background-color: #fffeee;
`;
