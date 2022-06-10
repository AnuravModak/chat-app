import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = {
  apiKey: 'AIzaSyCa4H5xOZMoJwg12P2wXsWcQku27cmw-kc',
  authDomain: 'chat-web-app-b68a4.firebaseapp.com',
  databaseURL: 'https://chat-web-app-b68a4-default-rtdb.firebaseio.com',
  projectId: 'chat-web-app-b68a4',
  storageBucket: 'chat-web-app-b68a4.appspot.com',
  messagingSenderId: '885083644305',
  appId: '1:885083644305:web:cc71aad78d1150d4bdfa30',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
