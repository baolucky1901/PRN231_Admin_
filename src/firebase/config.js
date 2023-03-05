import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
    apiKey: "AIzaSyAqeJxzZ8sAPSqCT8HtPAMbKralQLLK3Tk",
    authDomain: "bookstoreapi-jff.firebaseapp.com",
    projectId: "bookstoreapi-jff",
    storageBucket: "bookstoreapi-jff.appspot.com",
    messagingSenderId: "335777351366",
    appId: "1:335777351366:web:5ee8f63dbdafddfafc79c7",
    measurementId: "G-Z2H1M7KG8V"
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// import firebase from 'firebase/app';
// import 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyAqeJxzZ8sAPSqCT8HtPAMbKralQLLK3Tk",
//     authDomain: "bookstoreapi-jff.firebaseapp.com",
//     projectId: "bookstoreapi-jff",
//     storageBucket: "bookstoreapi-jff.appspot.com",
//     messagingSenderId: "335777351366",
//     appId: "1:335777351366:web:5ee8f63dbdafddfafc79c7",
//     measurementId: "G-Z2H1M7KG8V"
// };

// firebase.initializeApp(firebaseConfig);