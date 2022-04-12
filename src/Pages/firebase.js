import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Firebase() {
  const [docs, setDocs] = useState([]);

  // useEffect(() => {
  //   const getGrocery = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'groceries'));
  //       const snapshotDocs = [];
  //       //loop through snapshot & push to array
  //       //need keys -> push data to add the id.
  //       querySnapshot.forEach((doc) =>
  //         snapshotDocs.push({ ...doc.data(), id: doc.id }),
  //       );
  //       //set array into docs
  //       setDocs(snapshotDocs);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   getGrocery();
  // }, []);

  useEffect(() => {
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', '1234'),
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
        console.log(e.message);
      }
    };
    queryToken();
  }, []);

  //Not using :
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //console error: Function addDoc() called with invalid data. Data must be an object.
  //   // when addItem was a loose object page would not render correctly - not sure how to fix or if we need to at the moment
  //   const addItem = {
  //     item: 'mouse food9',
  //     id: '1',
  //   };

  //   try {
  //     const docRef = await addDoc(collection(db, 'groceries'), addItem);

  //     setDocs((prevState) => [...prevState, addItem]);
  //     // Success!
  //     console.log(docRef.id);
  //   } catch (e) {
  //     // There was an error sending data to Firestore
  //     console.error(e);
  //   }
  // };

  return (
    <div className="App" style={{ margin: 200 }}>
      <header className="App-header">
        <p>Item List with Token</p>
        {/* <button
          style={{
            width: '200px',
            height: '100px',
            fontSize: '25px',
            cursor: 'pointer',
          }}
          onClick={handleSubmit}
        ></button> */}
        {docs.map((doc) => (
          <p key={doc.id}>
            {doc.item_name}
            {doc.user_token}
          </p>
        ))}
      </header>
    </div>
  );
}
