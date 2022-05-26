import NavLinks from './NavLinks';
import styled from 'styled-components';

export default function Navbar({ deleteStorage }) {
  return (
    <Nav>
      <NavLinks />
      <LogoutButton onClick={deleteStorage}>logout</LogoutButton>
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
