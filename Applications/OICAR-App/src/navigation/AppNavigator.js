import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoggedInTabNavigator from '../navigator/LoggedInTabNavigator'
import {
  AuthScreen,
  LoginScreen,
  RegistrationScreen,
  ForgotPasswordScreen,
  DashboardScreen,
} from '../screens';

const Router = createStackNavigator(
  {
    Auth: AuthScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,
    ForgotPassword: ForgotPasswordScreen,
    Home: LoggedInTabNavigator,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(Router);