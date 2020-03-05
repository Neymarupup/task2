import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import cfgStore, { persistor } from './store/configureStore';

import Root from './containers'

import * as firebase from 'firebase';
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
// alert(firebase.authDomain)

const store = cfgStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Root/>
                </PersistGate>
            </Provider>
        )
    }
}
