import React from 'react';
import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <nav style={{ position: 'fixed', bottom: 0 }}>
      <NavLink
        to="/item-list"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        List of Items
      </NavLink>
      <NavLink
        to="/add-item"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        Add an Item
      </NavLink>
    </nav>
  );
}

export default NavLinks;
