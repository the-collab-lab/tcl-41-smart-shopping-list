import React from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

function List() {
  return (
    <>
      <h1>List of Items</h1>
      <nav>
        <Link to="/">List of Items</Link>
        <Link to="/add-an-item">Add an Item</Link>
      </nav>
    </>
  );
}

function AddAnItem() {
  return (
    <>
      <h1>Add an Item</h1>
      <nav>
        <Link to="/">List of Items</Link>
        <Link to="/add-an-item">Add an Item</Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="add-an-item" element={<AddAnItem />} />
      </Routes>
    </div>
  );
}

export default App;
