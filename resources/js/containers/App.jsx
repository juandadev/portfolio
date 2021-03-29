import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';

import Router from '../router/Router';
import initialState from '../initialState';

const store = createStore(reducer, initialState);

const App = () => <Router />;

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
}
