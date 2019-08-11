import React, { Component } from 'react';
import { View, StatusBar, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import moment from 'moment';
import 'moment/locale/de';
import { Provider as PaperProvider } from 'react-native-paper';
import getStore from '@config/store';
import Navigation from '@config/navigation';
import theme from '@config/theme';

const { store, persistor } = getStore();

class App extends Component {
  componentDidMount() {
    moment.locale('de');
    // temporary fix for fetch in React Native 0.60.x
    global.Blob = null;
    
    YellowBox.ignoreWarnings([
      'Warning: componentWillUpdate is deprecated',
      'Warning: componentWillMount is deprecated'
    ]);
  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <PersistGate loading={null} persistor={persistor} >
            <View style={{ flex: 1 }}>
              <StatusBar backgroundColor="#650016" barStyle="light-content" />
              <Navigation />
            </View>
          </PersistGate>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
