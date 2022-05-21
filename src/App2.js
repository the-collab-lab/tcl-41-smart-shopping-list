import { Switch, Route } from 'react-router-dom';
import NavLinks from './components/Navigation/NavLinks';
import Homepage from './pages/Homepage/Homepage.js';
import AddItem from './pages/AddItem/AddItem.js';
import ItemList from './pages/ItemList/ItemList.js';
import AboutUs from './pages/AboutUs/AboutUs.js';

export default function App() {
  return (
    <>
      <NavLinks />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/add-item">
          <AddItem />
        </Route>
        <Route exact path="/item-list">
          <ItemList />
        </Route>
        <Route exact path="/aboutus">
          <AboutUs />
        </Route>
      </Switch>
    </>
  );
}
