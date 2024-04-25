import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS5pTYxjgIy9i9yY4lRhph29GwxrnT0-E",
  authDomain: "csc179-trailmix.firebaseapp.com",
  databaseURL: "https://csc179-trailmix.firebaseio.com",
  projectId: "csc179-trailmix",
  storageBucket: "csc179-trailmix.appspot.com",
  messagingSenderId: "812559398282",
  appId: "1:812559398282:android:b7d1f1aa6afc823064c473",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

AppRegistry.registerComponent(appName, () => App);
