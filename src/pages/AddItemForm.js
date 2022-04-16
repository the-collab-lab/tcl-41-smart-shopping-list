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

// class AddItemForm extends React.Component {
//   constructor(props) {
//     //super is a method from React (create a class from a parent class)
//     super();
//     this.state = {
//       item_name: '',
//       purchase_interval: 7,
//       user_token: props.token,
//     };
//     //.bind(this) -The bind() is an inbuilt method in React that is used to pass the data as an argument to the function of a class based component
//     this.handleNameChange = this.handleNameChange.bind(this);
//     this.handleRadioChange = this.handleRadioChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   //input
//   handleNameChange = (e) => {
//     this.setState({ item_name: e.target.value });
//   };
//   handleRadioChange = (e) => {
//     this.setState({
//       purchase_interval: e.target.value,
//     });
//   };
//   handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(this.state);
//     addToDb(
//       this.state.item_name,
//       this.state.purchase_interval,
//       this.state.user_token,
//     );
//     alert('Item was submitted: ' + this.state.item_name);
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Item Name:
//           <input
//             type="text"
//             value={this.state.item_name}
//             onChange={this.handleNameChange}
//           />
//         </label>
//         <p>How soon will you buy this again?</p>
//         <fieldset>
//           <label>
//             Soon
//             <input
//               checked={this.state.purchase_interval === String(7)}
//               onChange={this.handleRadioChange}
//               type="radio"
//               id="soon"
//               name="purchaseInterval"
//               value="7"
//             />
//           </label>
//           <label>
//             Kind of Soon
//             <input
//               checked={this.state.purchase_interval === String(14)}
//               onChange={this.handleRadioChange}
//               type="radio"
//               id="kind_of_soon"
//               name="purchaseInterval"
//               value="14"
//             />
//           </label>
//           <label>
//             Not Soon
//             <input
//               checked={this.state.purchase_interval === String(30)}
//               onChange={this.handleRadioChange}
//               type="radio"
//               id="not_soon"
//               name="purchaseInterval"
//               value="30"
//             />
//           </label>
//         </fieldset>
//         <button type="submit">Add Item</button>
//       </form>
//     );
//   }
// }

const AddItemForm = (props) => {
  const [itemName, setItemName] = useState('');
  const [purchaseInterval, setPurchaseInterval] = useState('7');

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleRadioChange = (e) => setPurchaseInterval(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToDb(itemName, parseInt(purchaseInterval), props.token);
  };
  return (
    //<form ...  remove this. from everything
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
