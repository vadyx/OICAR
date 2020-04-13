import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  ForgotPasswordScreen,
  DashboardScreen,
} from '../screens';

const Router = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,
    ForgotPassword: ForgotPasswordScreen,
    Dashboard: DashboardScreen,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(Router);