//* Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { StoreProvider, createStore } from 'easy-peasy';
import storeModel from './state/store';

import './styles/index.css';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

const store = createStore(storeModel);

//* Render
ReactDOM.render(
    <StoreProvider store={store}><App /></StoreProvider>,
    document.getElementById('root')
);
