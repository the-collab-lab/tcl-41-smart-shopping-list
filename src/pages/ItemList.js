import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

function ItemList({ token }) {
  const [docs, setDocs] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  useEffect(() => {
    const tokenQuery = query(
      collection(db, 'groceries'),
      where('user_token', '==', `${token}`),
    );
    const queryToken = async (e) => {
      try {
        const querySnapshot = await getDocs(tokenQuery);
        const snapshotDocs = [];
        querySnapshot.forEach((doc) =>
          snapshotDocs.push({ ...doc.data(), id: doc.id }),
        );
        setDocs(snapshotDocs);
      } catch (e) {
        console.error(e.message);
      }
    };
    queryToken();
  }, [token]);

  const checked = () => {
    // let timestamp = Timestamp.now().toMillis();
    // let date = new Date(timestamp);
    //console.log(date)

    let checkbox = document.getElementById('myCheckbox');

    if (checkboxStatus === true) {
      console.log('checked');
    }
  };

  // setTimeout(checked, 2000)

  return (
    <>
      <h1>Your Items</h1>
      <h2>your token: {token}</h2>
      {docs.map((doc) => (
        <>
          <input id="myCheckbox" type="checkbox" onClick={checked} />
          <p key={doc.id}>{doc.item_name}</p>
        </>
      ))}
    </>
  );
}

export default ItemList;
