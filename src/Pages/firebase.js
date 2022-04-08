import { db } from '../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Firebase() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const getGrocery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'groceries'));
        const snapshotDocs = [];
        //loop through snapshot & push to array
        //**console was yelling about keys so I updated our push data to add the id. -Honz
        querySnapshot.forEach((doc) =>
          snapshotDocs.push({ ...doc.data(), id: doc.id }),
        );
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
    //when handleSubmit is triggered console shows this error:
    //Function addDoc() called with invalid data. Data must be an object, but it was: an array -
    // when addItem was a loose object page would not render correctly - not sure how to fix or if we need to at the moment
    const addItem = [
      {
        item: 'new item',
      },
    ];
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
