import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useState, useEffect } from 'react';
import AddItem from './components/AddItem/AddItem';
import NavLinks from './components/Navigation/NavLinks';
import ItemList from './pages/ItemList';

//new
import { db } from './lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [submittedToken, setSubmittedToken] = useState('');

  const handleItemNameChange = (e) => setSubmittedToken(e.target.value);

  useEffect(() => {
    const json = localStorage.getItem('shoppingListToken');
    const loadedToken = JSON.parse(json);
    if (loadedToken) {
      // navigate('/item-list');
      setToken(loadedToken);
    }
  }, []);

  //create new
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

  const handleSubmit = () => {
    // const submittedToken = 'hesse area tawny'

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
        // setDocs(snapshotDocs);
        if (!snapshotDocs.length) {
          alert('token does not exist');
        } else {
          const json = JSON.stringify(submittedToken);
          localStorage.setItem('shoppingListToken', json);
          // console.log(localStorage.shoppingListToken);
          setToken(true);
          navigate('/item-list', {
            state: { token: submittedToken },
          });
        }

        //console.log(snapshotDocs);
      } catch (e) {
        console.log(e.message);
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

            {/* add input and button here to take existing token */}
            <header>or look for a list</header>
            <label>
              token
              <input
                type="text"
                // value={itemName}
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
        <Route
          path="item-list"
          element={<ItemList token={localStorage.shoppingListToken} />}
        />
        <Route
          path="add-item"
          element={<AddItem token={localStorage.shoppingListToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
