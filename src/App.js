import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useState, useEffect } from 'react';
import AddItem from './components/AddItem/AddItem';
import NavLinks from './components/Navigation/NavLinks';
import ItemList from './pages/ItemList';

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const json = localStorage.getItem('shoppingListToken');
    const loadedToken = JSON.parse(json);
    if (loadedToken) {
      navigate('/item-list');
      setToken(loadedToken);
    }
  }, []);

  const onClick = () => {
    localStorage.setItem('shoppingListToken', JSON.stringify(getToken()));

    setToken(JSON.parse(localStorage.shoppingListToken));
    navigate('/item-list');
  };

  const deleteStorage = () => {
    localStorage.removeItem('shoppingListToken');

    setToken(false);
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        {token ? (
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
        <Route path="item-list" element={<ItemList token={token} />} />
        <Route path="add-item" element={<AddItem token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
