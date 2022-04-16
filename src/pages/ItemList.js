import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

function ItemList({ token }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', `${token}`),
    );
    const queryToken = async (e) => {
      try {
        const querySnapshot = await getDocs(tokenQuery);
        const snapshotDocs = [];
        querySnapshot.forEach((doc) =>
          snapshotDocs.push({ ...doc.data(), id: doc.id }),
        );
        setDocs(snapshotDocs);
        console.log(snapshotDocs);
      } catch (e) {
        console.log(e.message);
      }
    };
    queryToken();
  }, [token]);

  return (
    <>
      <h1>Your Items</h1>
      {docs.map((doc) => (
        <p key={doc.id}>{doc.item_name}</p>
      ))}
    </>
  );
}

export default ItemList;