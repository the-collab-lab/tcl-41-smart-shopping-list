import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useState, useEffect } from 'react';
import AddItem from './Pages/AddItem';
import NavLinks from './Navigation/NavLinks';
import ItemList from './Pages/ItemList';

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const json = localStorage.getItem('dummy');
    const loadedToken = JSON.parse(json);
    if (loadedToken) {
      setToken(loadedToken);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(token);
    localStorage.setItem('dummy', json);
  }, [token]);

  const onClick = () => {
    localStorage.setItem('dummy', JSON.stringify({ token: getToken() }));
    console.log(localStorage.dummy);

    setToken(true);
    navigate('/item-list');
  };

  const deleteStorage = () => {
    localStorage.removeItem('dummy');

    setToken(false);
    navigate('/');
  };
  console.log(token);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        {token === true ? (
          <>
            <button onClick={deleteStorage}>logout</button>
            <NavLinks />
          </>
        ) : (
          <>
            <header className="header">
              Welcome to your Smart Shopping List!
            </header>

            <button onClick={onClick}>create a new list</button>
          </>
        )}
      </div>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="item-list" element={<ItemList />} />
        <Route path="add-item" element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default App;
