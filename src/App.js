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
  //JESS: separate token presence state and token token text state
  const [tokenPresent, setTokenPresent] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [submittedToken, setSubmittedToken] = useState('');

  const handleItemNameChange = (e) => setSubmittedToken(e.target.value);

  useEffect(() => {
    const json = localStorage.getItem('shoppingListToken');
    const loadedToken = JSON.parse(json);
    if (loadedToken) {
      setToken(loadedToken);
      setTokenPresent(true);
      console.log(token);
    }
    //JESS: Add token changes as a dependecy so it knows to update state
  }, [token]);

  //create new token
  const onClick = () => {
    localStorage.setItem('shoppingListToken', JSON.stringify(getToken()));

    setToken(JSON.parse(localStorage.shoppingListToken));
    console.log(JSON.parse(localStorage.shoppingListToken));
    setToken(JSON.parse(localStorage.shoppingListToken));
    console.log(token);
    navigate('/item-list');
  };
  //delete token
  const deleteStorage = () => {
    localStorage.removeItem('shoppingListToken');
    setTokenPresent(false);
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
        {tokenPresent ? (
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
        <Route path="item-list" element={<ItemList token={token} />} />
        <Route path="add-item" element={<AddItem token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
