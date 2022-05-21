import AddItemForm from '../components/AddItemForm/AddItemForm';
import './AddItem.css';

function AddItem({ token }) {
  return (
    <div className="add-item-border">
      <h1>Add an Item</h1>
      <AddItemForm token={token} />
    </div>
  );
}

export default AddItem;
