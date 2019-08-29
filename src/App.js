import React, { PureComponent } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import moment from 'moment';
import 'moment/locale/de';
import getStore from '@config/store';
import Root from '@screens/Root';

const { store, persistor } = getStore();

class App extends PureComponent {
  componentDidMount() {
    moment.locale('de');
    // temporary fix for fetch in React Native 0.60.x
    // global.Blob = null;

    YellowBox.ignoreWarnings([
      'Warning: componentWillUpdate is deprecated',
      'Warning: componentWillMount is deprecated'
    ]);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
