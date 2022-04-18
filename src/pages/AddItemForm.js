import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDocs, query, where } from 'firebase/firestore';

async function addToDb(item_name, purchase_interval, user_token) {
  try {
    const docRef = await addDoc(collection(db, 'groceries'), {
      item_name: item_name,
      purchase_interval: purchase_interval,
      user_token: user_token,
      last_purchased_date: null,
    });
    alert('Item was submitted: ' + item_name);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    alert('Error adding document, check console.');
    console.error('Error adding document: ', e);
  }
}
const AddItemForm = (props) => {
  const [itemName, setItemName] = useState('');
  const [purchaseInterval, setPurchaseInterval] = useState('7');
  const [docs, setDocs] = useState([]);

  // useEffect(() => {
  const tokenQuery = query(
    collection(db, 'groceries'),
    where('user_token', '==', `${props.token}`),
    where('item_name', '==', `${itemName}`),
  );
  const queryToken = async (e) => {
    try {
      const querySnapshot = await getDocs(tokenQuery);
      const snapshotDocs = [];
      querySnapshot.forEach((doc) =>
        snapshotDocs.push({ ...doc.data(), id: doc.id }),
      );
      // setDocs(snapshotDocs);
      console.log(snapshotDocs);
    } catch (e) {
      console.log(e.message);
    }
  };
  queryToken();
  // }, [itemName, props.token]);

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleRadioChange = (e) => setPurchaseInterval(e.target.value);
  //started check on handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (queryToken() === 0) {
      console.log('item does not exists');
    } else {
      console.log('item exist');
    }

    addToDb(itemName, parseInt(purchaseInterval), props.token);
  };

  console.log(itemName);
  //puncuation and capital check with regex
  const strData = itemName
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
  console.log(strData);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type="text" value={itemName} onChange={handleItemNameChange} />
      </label>
      <p>How soon will you buy this again?</p>
      <fieldset>
        <label>
          Soon
          <input
            checked={purchaseInterval === '7'}
            onChange={handleRadioChange}
            type="radio"
            id="soon"
            name="purchaseInterval"
            value="7"
          />
        </label>
        <label>
          Kind of Soon
          <input
            checked={purchaseInterval === '14'}
            onChange={handleRadioChange}
            type="radio"
            id="kind_of_soon"
            name="purchaseInterval"
            value="14"
          />
        </label>
        <label>
          Not Soon
          <input
            checked={purchaseInterval === '30'}
            onChange={handleRadioChange}
            type="radio"
            id="not_soon"
            name="purchaseInterval"
            value="30"
          />
        </label>
      </fieldset>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
