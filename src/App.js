import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider } from 'react-native-paper';
import getStore from '@config/store';
import Navigation from '@config/navigation';
import theme from '@config/theme';
import LoadingBanner from '@components/LoadingBanner';

const { store, persistor } = getStore();

const App = () => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <PersistGate loading={<LoadingBanner/>} persistor={persistor} >
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#650016" barStyle="light-content" />
          <Navigation/>
        </View>
      </PersistGate>
    </PaperProvider>
  </Provider>
);

export default App;
