import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Firebase() {
  //   const test = () => {
  //     alert('it lives');
  //   };

  const [item, setItem] = useState('');
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'groceries'), (snapshot) => {
      // Firestore requires that you loop through the snapshot to access the docs,
      // instead of just setting the snapshot as the value of the state
      const snapshotDocs = [];
      snapshot.forEach((doc) => snapshotDocs.push(doc));
      setDocs(snapshotDocs);
    });
    return () => {
      // Used to remove the snapshot listener when the component is unmounted
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addItem = {
      groceries: item,
    };
    try {
      const docRef = await addDoc(collection(db, 'groceries'), {
        property: 'value',
        // ...data
        ...addItem,
      });
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
            width: '100px',
            height: '50px',
            fontSize: '1em',
            cursor: 'pointer',
          }}
          //   onClick={handleSubmit}
        >
          Firebase
        </button>
        <div>{'Firebase data'}</div>
      </header>
    </div>
  );
}
