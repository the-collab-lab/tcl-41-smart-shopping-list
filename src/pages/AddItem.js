import AddItemForm from '../components/AddItemForm/AddItemForm';

function AddItem({ token }) {
  return (
    <>
      <h1>Add an Item</h1>
      <AddItemForm token={token} />
    </>
  );
}

export default AddItem;