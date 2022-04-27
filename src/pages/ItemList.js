import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
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

  const isClicked = (item_name) => {
    console.log(item_name);

    const one = 5000;
    const thisTimestamp = Timestamp.now().toDate();
    // const theCheckbox = document.getElementById('myCheckbox');

    setTimeout(() => {
      docs.map((doc) => {
        const theCheckbox = document.getElementById(doc.item_name);

        if (theCheckbox.checked === true) {
          if (doc.item_name === item_name) {
            doc.last_purchased_date = thisTimestamp;
            console.log(doc.item_name, doc.last_purchased_date);
            theCheckbox.checked = false;
          }
        }
      });
    }, one);
  };

  return (
    <>
      <h1>Your Items</h1>
      <h2>your token: {token}</h2>
      {docs.map((doc) => {
        return (
          <div>
            <input
              id={doc.item_name}
              type="checkbox"
              onChange={() => isClicked(doc.item_name)}
            />
            <p key={doc.id}>{doc.item_name}</p>
          </div>
        );
      })}
    </>
  );
}

export default ItemList;
