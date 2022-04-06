// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
const firebaseConfig = {
  apiKey: 'AIzaSyApo-FwnsG_ISGLcsrFp9dwg4DjisoqS_s',
  authDomain: 'tcl-41-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-41-smart-shopping-list',
  storageBucket: 'tcl-41-smart-shopping-list.appspot.com',
  messagingSenderId: '683972107350',
  appId: '1:683972107350:web:80b848263dca925a386ff7',
};

export const app = initializeApp(firebaseConfig);
//added 'app' inside getFirestore func
export const db = getFirestore();
