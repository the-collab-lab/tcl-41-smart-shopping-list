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
  justify-content: space-around;
  background-color: pink;
`;

const LogoutButton = styled.button`
  display: flex;
  width: auto;
  height: 26px;
`;
