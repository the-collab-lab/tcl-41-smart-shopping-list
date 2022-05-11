import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

function ItemList({ token }) {
  const [docs, setDocs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [now, setNow] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocs = async (userToken) => {
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', `${userToken}`),
    );
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(tokenQuery);
      setIsLoading(false);
      const snapshotDocs = [];
      querySnapshot.forEach((doc) =>
        snapshotDocs.push({ ...doc.data(), id: doc.id }),
      );
      setDocs(snapshotDocs);
    } catch (e) {
      console.error(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs(token);
  }, [token]);

  const isClicked = async ({ target: { checked, id } }) => {
    /**
     * Return early if the checkbox was already checked
     * because we don't want to purchase an item twice.
     */

    // we obtain the object with the associated id WORKING
    const itemId = docs.find((doc) => {
      return doc.id === id;
    });

    const totalPurchases = itemId.total_purchases + 1;

    const previousEstimate =
      itemId.previous_estimate || itemId.purchase_interval;

    const today = Date.now();

    // gets the last purchased date for the item
    const lastPurchased = itemId.last_purchased_date || today;

    const daysSincePurchase = today - lastPurchased;

    //msToDay function below
    const daysSinceLastTransaction = Math.round(msToDay(daysSincePurchase));

    if (!checked) return;

    try {
      const newDoc = doc(db, 'groceries', id);
      setIsLoading(true);
      await updateDoc(newDoc, {
        last_purchased_date: Date.now(),
        total_purchases: totalPurchases,
        // added key value pair to store estimate
        previous_estimate: calculateEstimate(
          previousEstimate,
          daysSinceLastTransaction,
          totalPurchases,
        ),
      });
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
    // We need to fetch the docs again to update the docs in state with the new last_purchased_date.
    fetchDocs(token);
  };

  // conditional checks:

  // if item < 7 days since last purchased
  // return box as need to buy soon/color

  // if item > 7 && < 30 days since last purchased
  // return box as need to buy kind of soon/color

  // if item > 30 days since last purchased
  // return box as need to buy not so soon/color

  // if item === inactive / item > last purchase >= 2x estimate
  // return box as inactive

  //converts milliseconds to days
  function msToDay(ms) {
    return (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  }

  const filterList = (e) => {
    let lowerCase = searchInput.toLowerCase();

    const filteredData = docs.filter((item) => {
      //if no input the return the original
      if (searchInput === '') {
        return item;
      }
      //return the item which contains the user input
      else {
        return item.item_name.toLowerCase().includes(lowerCase);
      }
    });
    return filteredData;
  };

  const list = filterList().sort((item1, item2) => {
    // console.log(item1)
    // console.log(item2)

    if (item1.previous_estimate > item2.previous_estimate) return -1;
    if (item1.previous_estimate < item2.previous_estimate) return 1;

    if (item1.item_name.toLowerCase() > item2.item_name.toLowerCase()) return 1;
    if (item1.item_name.toLowerCase() < item2.item_name.toLowerCase())
      return -1;
  });

  console.log(list);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      {docs.length ? (
        <>
          <h1>Your Items</h1>
          <h2>your token: {token}</h2>
          <input
            name="search list"
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="search for an item"
          />
          <button onClick={() => setSearchInput(() => '')}>Reset</button>
          {list.map((doc) => {
            const wasCheckedInLast24Hours =
              now - doc.last_purchased_date < ONE_DAY;

            const itemColor = () => {
              //assigns style based on purchase urgency
              //1.commented out first part of conditional bc it didn't fit our data... 0/1 && 2x past estimate?
              //place inactive items into own map after active list?
              if (
                /*doc.total_purchases === 1 || */ msToDay(
                  now - doc.last_purchased_date,
                ) >=
                2 * doc.previousEstimate
              ) {
                console.log('inactive');
                return 'grey';
              } else if (doc.previous_estimate > 30) {
                console.log('>30');
                return 'red';
              } else if (
                doc.previous_estimate > 7 &&
                doc.previous_estimate <= 30
              ) {
                console.log('7-30');
                return 'yellow';
              } else if (doc.previous_estimate <= 7) {
                console.log(7);
                return 'green';
              } else {
                console.log('nothing');
                return;
              }
            };

            return (
              <div
                key={doc.id}
                style={{
                  backgroundColor: itemColor(),
                }}
              >
                <label>
                  <input
                    name={doc.item_name}
                    disabled={isLoading}
                    checked={wasCheckedInLast24Hours}
                    id={doc.id}
                    type="checkbox"
                    onChange={(e) => isClicked(e)}
                  />
                  {doc.item_name}
                </label>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <p>Your Shopping list is currently empty.</p>
          <NavLink to="/add-item">Add an Item</NavLink>
        </>
      )}
    </>
  );
}

export default ItemList;
