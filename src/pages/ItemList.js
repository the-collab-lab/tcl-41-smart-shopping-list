import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

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
      } catch (e) {
        console.error(e.message);
      }
    };
    queryToken();
  }, [token]);

  //we need to save the session so the box unchecks only after the time is over. regardless of refresh or logging out

  //click & save, retrieve
  //is this date > or < Timestamp.now() + 24hrs

  const isClicked = (id) => {
    const newDoc = doc(db, 'groceries', id);
    updateDoc(newDoc, { last_purchased_date: Date.now() });
    console.log(id);

    const one = 5000;
    const thisTimestamp = Timestamp.now().toDate();
    // const theCheckbox = document.getElementById('myCheckbox');

    //   setTimeout(() => {
    //     docs.map((doc) => {
    //       const theCheckbox = document.getElementById(doc.item_name);

    //       if (theCheckbox.checked === true) {
    //         if (doc.item_name === item_name) {
    //           doc.last_purchased_date = thisTimestamp;
    //           console.log(doc.item_name, doc.last_purchased_date);
    //           theCheckbox.checked = false;
    //         }
    //       }
    //     });
    //   }, one);
  };

  return (
    <>
      <h1>Your Items</h1>
      <h2>your token: {token}</h2>
      {docs.map((doc) => {
        if (doc.last_purchased_date) {
          console.log(doc.last_purchased_date, Date.now());
        }
        return (
          <div>
            <input
              checked={Date.now() - doc.last_purchased_date < 5000}
              id={doc.id}
              type="checkbox"
              onChange={() => isClicked(doc.id)}
            />
            <p key={doc.id}>{doc.item_name}</p>
          </div>
        );
      })}
    </>
  );
}

export default ItemList;
