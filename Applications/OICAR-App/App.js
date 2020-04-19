import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './src/store/reducers/auth';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/utils/theme';

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme} >
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}