import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

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
    if (!checked) return;

    try {
      const newDoc = doc(db, 'groceries', id);
      setIsLoading(true);
      await updateDoc(newDoc, { last_purchased_date: Date.now() });
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }

    // We need to fetch the docs again to update the docs in state with the new last_purchased_date.
    fetchDocs(token);
  };

  return (
    <>
      <h1>Your Items</h1>
      <h2>your token: {token}</h2>
      {docs.map((doc) => {
        const wasCheckedInLast24Hours = now - doc.last_purchased_date < ONE_DAY;

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
  );
}

export default ItemList;
