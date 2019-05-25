import React from 'react';
import { Provider } from 'react-redux';
import store from '@config/store';

const App = () => (
  <Provider store={store}>
  </Provider>
);

export default App;
