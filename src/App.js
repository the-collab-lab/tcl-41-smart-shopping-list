import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Firebase from './Pages/firebase';
// import form until file changes merged
import AddItemForm from './Pages/AddItemForm';

function AddAnItem() {
  return (
    <>
      <h1>Add an Item</h1>
      {/* form here until file changes are merged */}
      <AddItemForm />
    </>
  );
}

function List() {
  return (
    <>
      <Firebase />
    </>
  );
}

function NavLinks() {
  return (
    <nav style={{ position: 'fixed', bottom: 0 }}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        List of Items
      </NavLink>
      <NavLink
        to="/add-an-item"
        style={({ isActive }) =>
          isActive ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
        }
      >
        Add an Item
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to your Smart Shopping List!</h1>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="add-an-item" element={<AddAnItem />} />
      </Routes>
      <NavLinks />
    </div>
  );
}

export default App;
