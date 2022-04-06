import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Firebase() {
  // const [item, setItem] = useState('');
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const getGrocery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'groceries'));
        const snapshotDocs = [];
        //loop through snapshot & push to array
        querySnapshot.forEach((doc) => snapshotDocs.push(doc.data()));
        //set array into docs
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

      setDocs(addItem);
      // Success!
      console.log(docRef.id);
    } catch (e) {
      // There was an error sending data to Firestore
      console.error(e);
    }
  };
  // console.log(docs);

  return (
    <div className="App" style={{ margin: 200 }}>
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
        {docs.map((doc) => (
          <p key={doc.id}>{doc.item}</p>
        ))}
      </header>
    </div>
  );
}
