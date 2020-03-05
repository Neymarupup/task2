import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyC-YSMQuwE3zFrkyjABgAEEZHPeeSy5GEc',
  authDomain: 'fir-a5caf.firebaseio.com',
  databaseURL: 'https://fir-a5caf.firebaseio.com',
  projectId: 'fir-a5caf',
  storageBucket: 'fir-a5caf.appspot.com',
  messagingSenderId: '1069818186783',
  appId:'1:1069818186783:android:2d81356bab937f8e' 
};
let app = Firebase.initializeApp(config);
export const db = app.database();