import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk'
require('dotenv').config({path: __dirname + '/.env'})

// import {ActionCableProvider} from 'react-actioncable-provider'


let store = createStore(rootReducer, applyMiddleware(thunk))


// <ActionCableProvider url={'ws://localhost:3000/cable'}>
// </ActionCableProvider>

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
