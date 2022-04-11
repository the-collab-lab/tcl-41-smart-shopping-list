import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import NavLinks from './Navigation/NavLinks';
import Firebase from './Pages/firebase';
import ItemList from './Pages/ItemList';
import AddItem from './Pages/AddItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Firebase />
      </header>
      <h1>Welcome to your Smart Shopping List!</h1>
      <Routes>
        <Route path="/item-list" element={<ItemList />} />
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
      <NavLinks />
    </div>
  );
}

export default App;
