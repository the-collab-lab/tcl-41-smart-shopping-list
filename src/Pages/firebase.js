import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Firebase() {
  //test handler for button
  // const test = () => {
  //   alert('it lives');
  // };
  const [item, setItem] = useState('');
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const getGrocery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'groceries'));
        const snapshotDocs = [];

        querySnapshot.forEach((doc) => snapshotDocs.push(doc.data()));
        setDocs(snapshotDocs);
      } catch (e) {
        console.log(e.message);
      }
    };
    getGrocery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addItem = {
      item: 'item',
    };
    try {
      const docRef = await addDoc(collection(db, 'groceries'), addItem);
      console.log(docRef.id);

      setDocs(addItem);
      // Success!
      console.log(docRef.id);
    } catch (e) {
      // There was an error sending data to Firestore
      console.error(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          style={{
            width: '200px',
            height: '100px',
            fontSize: '25px',
            cursor: 'pointer',
          }}
          onClick={handleSubmit}
        >
          Firebase
        </button>
        <div>{'Firebase data'}</div>
      </header>
    </div>
  );
}
