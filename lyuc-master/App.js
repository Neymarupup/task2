/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as firebase from 'firebase';

import cfgStore, { persistor } from './src/store/configureStore'
import Root from './src/containers'

var firebaseConfig = {
  apiKey: "AIzaSyACuogpUgXR5qiD8PSG2BK4nDUmvXzkpm0",
  authDomain: "lynx-99b44.firebaseapp.com",
  databaseURL: "https://lynx-99b44.firebaseio.com",
  projectId: "lynx-99b44",
  storageBucket: "lynx-99b44.appspot.com",
  messagingSenderId: "1096293473407",
  appId: "1:1096293473407:web:e4a633695e4ea28c0f734a"
};

firebase.initializeApp(firebaseConfig);
const store = cfgStore();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
