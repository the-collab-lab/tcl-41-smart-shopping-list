import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useState, useEffect } from 'react';
import ItemList from './pages/ItemList';
import AddItem from './pages/AddItem';
import { db } from './lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from './components/Navigation/navbar';

import styled from 'styled-components';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', `${submittedToken}`),
    );
    const queryToken = async () => {
      try {
        const querySnapshot = await getDocs(tokenQuery);
        const snapshotDocs = [];
        querySnapshot.forEach((doc) =>
          snapshotDocs.push({ ...doc.data(), id: doc.id }),
        );
        if (submittedToken && !snapshotDocs.length) {
          alert('token does not exist');
        } else if (submittedToken && snapshotDocs.length) {
          const json = JSON.stringify(submittedToken);
          localStorage.setItem('shoppingListToken', json);
          setToken(true);
          navigate('/item-list', {
            state: { token: submittedToken },
          });
        } else {
          console.log('no token submitted');
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
            <Navbar deleteStorage={deleteStorage} />
          </>
        ) : (
          <WelcomePage>
            <Header>Welcome to your Smart Shopping List!</Header>
            <div className="subheader">
              <NewListButton className="newListButton" onClick={onClick}>
                create a new list
              </NewListButton>

              <SubHeader>or join an existing list</SubHeader>
              <Form className="inputForm" onSubmit={handleSubmit}>
                <Input
                  className="input"
                  type="text"
                  value={submittedToken}
                  onChange={handleItemNameChange}
                  placeholder="add token here"
                  aria-label="your token"
                  required
                />
                <JoinButton className="joinButton" type="submit">
                  join list
                </JoinButton>
              </Form>
            </div>
          </WelcomePage>
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

const WelcomePage = styled.div`
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  position: absolute;
  text-align: center;
  padding: 24px;
  border-radius: 15px;
  background-color: #c4e8ee;
  color: #152b51;
  box-shadow: -5px 5px 0px 0px #ff6b6b80;
`;

const Header = styled.header`
  font-size: calc(14px + 2vmin);
  font-family: Baskerville;
  font-weight: bold;
`;

const NewListButton = styled.button`
  margin: 12px;
  border-radius: 50px;
  background-color: #152b51;
  color: #fff;
  padding: 4px 8px;
`;

const SubHeader = styled.header`
  font-size: calc(8px + 2vmin);
  margin-bottom: 8px;
`;

const Input = styled.input`
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const JoinButton = styled.button`
  padding: 0.4em 0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  color: white;
  background-color: #282c34;
  width: 60px;
  background-color: #152b51;
`;
