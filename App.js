import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ErrorBoundary from './ErrorBoundary.js';
import OperatorView from './OperatorView.js';
import SignIn from './SignIn.js';
import { PAGES } from './Constants';


export default function Main() {
  let [operatorInfo, setOperatorInfo] = React.useState({
    operatorName: '',
    operatorEmail: 'test',
    operatorAddress: '',
    operationRadius: 10
  });  
  // let [operatorName, setOperatorName] = React.useState();
  // let [operatorEmail, setOperatorEmail] = React.useState();
  // let [operatorAddress, setOperatorAddress] = React.useState();
  // let [operationRadius, setOperationRadius] = React.useState();
  let [activePage, setActivePage] = React.useState(PAGES.SIGN_IN);

  console.log("operatorInfoFromApp.js: ", operatorInfo)
  return (
    <PaperProvider theme={theme}>
      <ErrorBoundary>
      {
        activePage == PAGES.SIGN_IN ?
        <SignIn 
          setActivePage={setActivePage}
          operatorInfo={operatorInfo}
          setOperatorInfo={setOperatorInfo} 
        />:
        <OperatorView 
          setActivePage={setActivePage}
          activePage={activePage} 
          operatorInfo={operatorInfo}
          setOperatorInfo={setOperatorInfo}
        />
      }
      </ErrorBoundary>
    </PaperProvider>
  );
}

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
