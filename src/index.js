import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';
import { BrowserRouter} from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
/* import App from './App';
import reportWebVitals from './reportWebVitals';   *DELETED* */
import EXERCISE_DATA from './exercisedata/exercise-data.json';
import 'bootstrap/dist/css/bootstrap.min.css';

// import the data
//import EXERCISE_DATA from './exercisedata/exercise-data.json';
const firebaseConfig = {
  apiKey: "AIzaSyDEtczYgG6nBfT7njoA0coNRmSMDMRuZjQ",
  authDomain: "ufit-bf9e9.firebaseapp.com",
  databaseURL: "https://ufit-bf9e9-default-rtdb.firebaseio.com",
  projectId: "ufit-bf9e9",
  storageBucket: "ufit-bf9e9.appspot.com",
  messagingSenderId: "237599456884",
  appId: "1:237599456884:web:1c210753da5ae15228db21"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (!user) {
    signInAnonymously(auth)
      .then(() => console.log('Anonymous sign-in successful'))
      .catch((error) => console.error('Error during anonymous sign-in', error));
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App exerciseData={EXERCISE_DATA}/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); *DELETED*
