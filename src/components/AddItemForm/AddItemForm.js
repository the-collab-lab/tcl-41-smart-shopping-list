import { useState } from 'react';
import { db } from '../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDocs, query, where } from 'firebase/firestore';
import './AddItemForm.css';
import styled from 'styled-components';

async function addToDb(item_name, purchase_interval, user_token) {
  try {
    const docRef = await addDoc(collection(db, 'groceries'), {
      item_name: item_name,
      purchase_interval: purchase_interval,
      //changed prev estimate to initialize as purchase_interval
      previous_estimate: purchase_interval,
      user_token: user_token,
      last_purchased_date: null,
      total_purchases: 0,
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

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleRadioChange = (e) => setPurchaseInterval(e.target.value);

  // punctuation and capital check with regex
  function removePunctuation(stringData) {
    return stringData
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();
    //  \escape, [^] matches characters not in brackets, \w word character,
    //  \s whitespace, /g indicates that the regular expression should be tested again all possible matches in a string.
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noPuncShoppingItem = removePunctuation(itemName);
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', `${token}`),
    );
    const querySnapshot = await getDocs(tokenQuery);
    const snapshotDocs = [];
    querySnapshot.forEach((doc) =>
      snapshotDocs.push({ ...doc.data(), id: doc.id }),
    );
    const itemArray = snapshotDocs.map((snapshotDoc) => {
      return removePunctuation(snapshotDoc.item_name);
    });
    if (itemArray.includes(noPuncShoppingItem)) {
      alert('duplicate');
    } else {
      addToDb(itemName, parseInt(purchaseInterval), token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputDiv">
        <label htmlFor="itemName" className="itemNameLabel">
          Item Name:
        </label>
        <input
          className="itemInput"
          type="text"
          value={itemName}
          onChange={handleItemNameChange}
          required
        />
      </div>
      <p className="subHead">How soon will you buy this again?</p>
      <div className="radio-buying-interval">
        <fieldset className="fieldset">
          <input
            checked={purchaseInterval === '7'}
            onChange={handleRadioChange}
            type="radio"
            id="soon"
            name="purchaseInterval"
            value="7"
          />
          <label htmlFor="soon">Soon</label>
          <input
            checked={purchaseInterval === '14'}
            onChange={handleRadioChange}
            type="radio"
            id="kind_of_soon"
            name="purchaseInterval"
            value="14"
          />
          <label htmlFor="kind_of_soon">Kind of Soon</label>
          <input
            checked={purchaseInterval === '30'}
            onChange={handleRadioChange}
            type="radio"
            id="not_soon"
            name="purchaseInterval"
            value="30"
          />
          <label htmlFor="not_soon">Not Soon</label>
        </fieldset>
      </div>

      <Button type="submit">+ Add Item</Button>
    </form>
  );
};
export default AddItemForm;

const Button = styled.button`
  border-radius: 50px;
  padding: 6px 12px;
  font-size: calc(8px + 2vmin);
  text-transform: lowercase;
  background-color: #152b51;
  color: lightblue;
  font-weight: bold;
`;
