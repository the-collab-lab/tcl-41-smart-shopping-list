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
const AddItemForm = ({ token }) => {
  const [itemName, setItemName] = useState('');
  const [purchaseInterval, setPurchaseInterval] = useState('7');
  const [docs, setDocs] = useState([]);

  //on page load, check the db
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
        console.log(e.message);
      }
    };
    queryToken();
  }, [token]);

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleRadioChange = (e) => setPurchaseInterval(e.target.value);

  const itemArray = docs.map((doc) => {
    return removePunctuation(doc.item_name);
  });

  // punctuation and capital check with regex
  function removePunctuation(stringData) {
    return stringData
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const shoppingItem = itemName;
    const noPuncShoppingItem = removePunctuation(shoppingItem);
    // Check for duplicates and add unique items to list
    if (!noPuncShoppingItem) {
      alert('must add item');
      console.log(collection((db, 'groceries')));
    } else if (itemArray.includes(noPuncShoppingItem)) {
      alert('duplicate');
    } else {
      addToDb(itemName, parseInt(purchaseInterval), token);
    }
  };

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
