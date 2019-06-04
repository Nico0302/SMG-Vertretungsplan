import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import moment from 'moment';
import 'moment/locale/de';
import { Provider as PaperProvider } from 'react-native-paper';
import getStore from '@config/store';
import Navigation from '@config/navigation';
import theme from '@config/theme';
import LoadingBanner from '@components/LoadingBanner';

const { store, persistor } = getStore();

class App extends Component {
  componentDidMount() {
    moment.locale('de');
  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <PersistGate loading={<LoadingBanner />} persistor={persistor} >
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
