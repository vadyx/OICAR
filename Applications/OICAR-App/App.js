import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './src/store/reducers/auth';
import profileReducer from './src/store/reducers/profile';
import vehicleDataReducer from './src/store/reducers/vehicleData';
import newListingReducer from './src/store/reducers/newListing';
import listingsReducer from './src/store/reducers/listings';
import reservationReducer from './src/store/reducers/reservation';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/utils/theme';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  vehicleData: vehicleDataReducer,
  newListing: newListingReducer,
  listings: listingsReducer,
  reservation: reservationReducer
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