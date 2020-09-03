//* Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { StoreProvider, createStore } from 'easy-peasy';
import storeModel from './state/store';

import './styles/index.css';
import './styles/animation.css';

const store = createStore(storeModel);

//* Render
ReactDOM.render(
    <StoreProvider store={store}><App /></StoreProvider>,
    document.getElementById('root')
);
