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
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const handleClick = () => {
    setCheckboxStatus(!checkboxStatus);
    // console.log('im checked');
  };

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

  const isClicked = (e) => {
    e.preventDefault();

    const one = 2000;
    const thisTimestamp = Timestamp.now().toDate();
    const theCheckbox = document.getElementById('myCheckbox');

    setTimeout(() => {
      docs.map((doc) => {
        // let listItem = doc.item_name
        // console.log(listItem)
        if (theCheckbox.checked === true) {
          if (doc.item_name === 'ham') {
            doc.last_purchased_date = thisTimestamp;
            console.log('cheese timestamp', doc.last_purchased_date);
          }
        }
      });
      console.log('delayed for 1 second');
      document.getElementById('myCheckbox').checked = false;
    }, one);

    // docs.map((doc) => {
    //   setTimeout(() => {
    //     if (theCheckbox.checked === true) {
    //       if (doc.item_name === 'ham') {
    //         doc.last_purchased_date = thisTimestamp;
    //         console.log('cheese timestamp', doc.last_purchased_date);
    //       }
    //     }
    //   });

    //   return document.getElementById('myCheckbox').checked = false;
    // }, one);
  };

  return (
    <>
      <h1>Your Items</h1>
      <h2>your token: {token}</h2>
      {docs.map((doc) => (
        <>
          <input
            id="myCheckbox"
            // name={doc.item_name}
            type="checkbox"
            onClick={handleClick}
            onChange={isClicked}
          />
          <p key={doc.id}>{doc.item_name}</p>
        </>
      ))}
    </>
  );
}

export default ItemList;

// const today = new Date();
// //console.log(today)
// const tomorrow = new Date(today);
// tomorrow.setDate(tomorrow.getDate() + 1);
// //console.log(tomorrow)
// const tenSeconds = new Date(today);
// tenSeconds.setSeconds(tenSeconds.getSeconds() + 1);

// // const gapTime = Math.abs(tenSeconds.getTime() - today.getTime());
// // const timeBetween = gapTime / 1000;
// //console.log(timeBetween);

// const one = 2000;
// const thisTimestamp = Timestamp.now().toDate();
// const theCheckbox = document.getElementById('myCheckbox');
