import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from './store'
// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import logger from 'redux-logger'

// const store = createStore(
//  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
//  )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>

   <App />
    </Provider>
  
);


