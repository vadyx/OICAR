import React from 'react';
import { Provider } from 'react-native-paper';

import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/utils/theme';

export default function App() {

  return (
    <Provider theme={theme}>
      <AppNavigator />
    </Provider>
  );
}