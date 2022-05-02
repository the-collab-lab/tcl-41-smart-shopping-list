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

  useEffect(() => {
    // Update "now" every second to force the page to re-render and keep the checkbox state up to date;
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, ONE_SECOND);
    return () => clearInterval(intervalId);
  }, []);

  const isClicked = async ({ target: { checked, id } }) => {
    /**
     * Return early if the checkbox was already checked
     * because we don't want to purchase an item twice.
     */

    //filter thru docs to access item purchases
    //variable 'total' adds +1 on each click (purchase)
    const itemId = docs.filter((doc) => doc.id === id);
    const total = itemId[0].total_purchases + 1;

    const previousEstimate = itemId[0].previous_estimate;
    const lastPurchased = itemId[0].last_purchased_date;
    const today = Date.now();

    const daysSincePurchase = today - lastPurchased;
    //msToTime function below
    const milliseconds = Math.round(msToTime(daysSincePurchase));

    if (!checked) return;

    try {
      const newDoc = doc(db, 'groceries', id);
      setIsLoading(true);
      await updateDoc(newDoc, {
        last_purchased_date: Date.now(),
        total_purchases: total,
        //added key value pair to store estimate
        previous_estimate: calculateEstimate(
          previousEstimate,
          milliseconds,
          total,
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

  //found conversion from milliseconds to seconds, minutes, hours & days
  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds; //+ " Sec";
    else if (minutes < 60) return minutes; //+ " Min";
    else if (hours < 24) return hours; //+ " Hrs";
    else return days; //+ " Days"
  }

  return (
    <>
      {docs.length ? (
        <>
          <h1>Your Items</h1>
          <h2>your token: {token}</h2>
          {docs.map((doc) => {
            const wasCheckedInLast24Hours =
              now - doc.last_purchased_date < ONE_SECOND;
            return (
              <div key={doc.id}>
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
