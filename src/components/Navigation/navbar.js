import NavLinks from './NavLinks';
import styled from 'styled-components';
import { Modal } from '../modal/Modal';
import { useState } from 'react';

export default function Navbar({ deleteStorage }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Nav>
      <NavLinks />
      <div
        style={{
          display: 'flex',
        }}
      >
        <Button onClick={openModal}>?</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <LogoutButton onClick={deleteStorage}>logout</LogoutButton>
      </div>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #152b51;
  height: 10vh;
`;

const LogoutButton = styled.button`
  border-radius: 50px;
  padding: 5px 10px;
  background-color: lightblue;
  font-weight: bold;
  color: #152b51;
`;

const Button = styled.button`
  border-radius: 50px;
  padding: 5px 10px;
  background-color: lightblue;
  font-weight: bold;
  color: #152b51;
  margin: 0 12px;
`;
