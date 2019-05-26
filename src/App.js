import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from '@config/store';
import Navigation from '@config/navigation';
import theme from '@config/theme';

const App = () => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#650016" barStyle="light-content" />
        <Navigation/>
      </View>
    </PaperProvider>
  </Provider>
);

export default App;
