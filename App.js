import * as React from 'react';
import { AppRegistry} from 'react-native';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ErrorBoundary from './ErrorBoundary.js';
import OperatorView from './OperatorView.js';
import Login from './Login.js';
import Loading from './Loading.js';
import { PAGES } from './Constants';
import { createAppContainer, createSwitchNavigator, YellowBox } from 'react-navigation';
import firebase from 'firebase';
import {firebaseConfig} from './config.js';

// Suppresses warnings in UI until fixed
console.disableYellowBox = true;

firebase.initializeApp(firebaseConfig);

export default function Main() {
  let [operatorInfo, setOperatorInfo] = React.useState({
    operatorName: '',
    operatorEmail: 'test',
    operatorAddress: '',
    operationRadius: 10
  });  

  let [activePage, setActivePage] = React.useState(PAGES.SIGN_IN);

  console.log("operatorInfoFromApp.js: ", operatorInfo)
  return (
    <PaperProvider theme={theme}>
      <ErrorBoundary>
        <AppNavigator 
          screenProps={
            {
              operatorInfo: operatorInfo,
              setOperatorInfo: setOperatorInfo,
              activePage: activePage,
              setActivePage: setActivePage,
            }
          }
        />
      </ErrorBoundary>
    </PaperProvider>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: Loading,
  LoginScreen: Login,
  OperatorView: OperatorView,
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f5f5f5",
    primary: '#444',
    backgroundAccent: "#a3940d",
    accentLight: "#fff",
  },
};
