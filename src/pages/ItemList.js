import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

function ItemList({ token }) {
  const [docs, setDocs] = useState([]);
  const { state } = useLocation();
  console.log(state.token);

  useEffect(() => {
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', `${state.token}`),
    );
    const queryToken = async (e) => {
      try {
        const querySnapshot = await getDocs(tokenQuery);
        const snapshotDocs = [];
        querySnapshot.forEach((doc) =>
          snapshotDocs.push({ ...doc.data(), id: doc.id }),
        );
        setDocs(snapshotDocs);
        // console.log(snapshotDocs);
      } catch (e) {
        console.log(e.message);
      }
    };
    queryToken();
    //console.log(token)
  }, [state.token]);

  return (
    <>
      <h1>Your Items</h1>
      <h2>your token: {state.token}</h2>
      {docs.map((doc) => (
        <p key={doc.id}>{doc.item_name}</p>
      ))}
    </>
  );
}

export default ItemList;
