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

const now = Date.now();

function ItemList({ token }) {
  const [docs, setDocs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
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
    if (item1.previous_estimate > item2.previous_estimate) return 1;
    if (item1.previous_estimate < item2.previous_estimate) return -1;

    if (item1.item_name.toLowerCase() > item2.item_name.toLowerCase()) return 1;
    if (item1.item_name.toLowerCase() < item2.item_name.toLowerCase())
      return -1;

    return 0;
  });

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const itemStatus = (lastPurchasedDate, previousEstimate, inactiveItem) => {
    //assigns style based on purchase urgency
    if (lastPurchasedDate !== null && previousEstimate !== 0 && inactiveItem) {
      return {
        color: 'grey',
        label: 'inactive item',
      };
    } else if (previousEstimate >= 30) {
      return {
        color: 'red',
        label: `${previousEstimate} days expected until purchase needed`,
      };
    } else if (previousEstimate > 7 && previousEstimate < 30) {
      return {
        color: 'yellow',
        label: `${previousEstimate} days expected until purchase needed`,
      };
    } else if (previousEstimate <= 7) {
      return {
        color: 'green',
        label: `${previousEstimate} days expected until purchase needed`,
      };
    }
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

            const inactiveItem =
              msToDay(now - doc.last_purchased_date) >=
              doc.previous_estimate * 2;

            const status = itemStatus(
              doc.last_purchased_date,
              doc.previous_estimate,
              inactiveItem,
            );

            return (
              <div
                key={doc.id}
                style={{
                  backgroundColor: status.color,
                }}
                aria-label={status.label}
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
