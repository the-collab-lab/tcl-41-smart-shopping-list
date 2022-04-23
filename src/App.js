import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useState, useEffect } from 'react';
import NavLinks from './components/Navigation/NavLinks';
import ItemList from './pages/ItemList';
import AddItem from './pages/AddItem';
import { db } from './lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [submittedToken, setSubmittedToken] = useState('');

  const handleItemNameChange = (e) => setSubmittedToken(e.target.value);

  useEffect(() => {
    const json = localStorage.getItem('shoppingListToken');
    const loadedToken = JSON.parse(json);
    if (loadedToken) {
      setToken(loadedToken);
    }
  }, [token]);

  const onClick = () => {
    localStorage.setItem('shoppingListToken', JSON.stringify(getToken()));
    setToken(JSON.parse(localStorage.shoppingListToken));
    navigate('/item-list');
  };

  const deleteStorage = () => {
    localStorage.removeItem('shoppingListToken');
    setToken('');
    navigate('/');
  };

  const handleSubmit = () => {
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', `${submittedToken}`),
    );
    const queryToken = async (e) => {
      try {
        const querySnapshot = await getDocs(tokenQuery);
        const snapshotDocs = [];
        querySnapshot.forEach((doc) =>
          snapshotDocs.push({ ...doc.data(), id: doc.id }),
        );
        if (!snapshotDocs.length) {
          alert('token does not exist');
        } else {
          const json = JSON.stringify(submittedToken);
          localStorage.setItem('shoppingListToken', json);
          setToken(true);
          navigate('/item-list', {
            state: { token: submittedToken },
          });
        }
      } catch (e) {
        console.error(e.message);
      }
    };
    queryToken();
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

            <header>or join an existing list</header>
            <label>
              token
              <input
                type="text"
                value={submittedToken}
                onChange={handleItemNameChange}
              />
            </label>
            <button type="submit" onClick={handleSubmit}>
              join list
            </button>
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
