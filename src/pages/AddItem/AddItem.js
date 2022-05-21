import AddItemForm from '../../components/AddItemForm/AddItemForm';
// import { db } from '../../lib/firebase.js';

function AddItem({ token }) {
  return (
    <>
      <h1>Add an Item</h1>
      <AddItemForm token={token} />
    </>
  );
}

export default AddItem;
