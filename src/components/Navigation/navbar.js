import NavLinks from './NavLinks';
import styled from 'styled-components';

export default function Navbar({ deleteStorage }) {
  return (
    <Nav>
      <NavlinksWrapper>
        <NavLinks />
      </NavlinksWrapper>
      <LogoutButton onClick={deleteStorage}>logout</LogoutButton>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #152b51;
  height: 10vh;
`;

const NavlinksWrapper = styled.div`
  margin: 5%;
`;

const LogoutButton = styled.button`
  border-radius: 50px;
  padding: 5px 10px;
  margin: 5%;
  background-color: lightblue;
  font-weight: bold;
  color: #152b51;
`;
