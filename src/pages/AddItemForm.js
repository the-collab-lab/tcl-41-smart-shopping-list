import React from 'react';
import { useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

async function addToDb(item_name, purchase_interval, user_token) {
  try {
    const docRef = await addDoc(collection(db, 'groceries'), {
      item_name: item_name,
      purchase_interval: purchase_interval,
      user_token: user_token,
      last_purchased_date: null,
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

const AddItemForm = (props) => {
  const [itemName, setItemName] = useState('');
  const [purchaseInterval, setPurchaseInterval] = useState('7');

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleRadioChange = (e) => setPurchaseInterval(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToDb(itemName, parseInt(purchaseInterval), props.token);
    alert('Item was submitted: ' + itemName);
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
