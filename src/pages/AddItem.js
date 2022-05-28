import AddItemForm from '../components/AddItemForm/AddItemForm';
import './AddItem.css';
import styled from 'styled-components';

function AddItem({ token }) {
  return (
    <div className="add-item-border">
      <Header>Add an Item</Header>
      <AddItemForm token={token} />
    </div>
  );
}

export default AddItem;

const Header = styled.h1`
  font-family: Baskerville;
`;
