import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCd0MwbRwaGc1MobDYvbRBNxmYI8LGExKs",
  authDomain: "adventure-finder-d509e.firebaseapp.com",
  projectId: "adventure-finder-d509e",
  storageBucket: "adventure-finder-d509e.appspot.com",
  messagingSenderId: "844998571550",
  appId: "1:844998571550:web:62c9d7ef039ddb3224e00f"
};


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
const storage=getStorage(app);

export {
    db,
    auth,
    storage,
    setDoc,
    doc,
    collection,
    getDocs
}
