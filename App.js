import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ErrorBoundary from './ErrorBoundary.js';
import OperatorView from './OperatorView.js';
import SignIn from './SignIn.js';
import { PAGES } from './Constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#444',
    accent: 'green',
  },
};

export default function Main() {
  let [operatorEmail, setOperatorEmail] = React.useState();
  let [activePage, setActivePage] = React.useState(PAGES.SIGN_IN);

  return (
    <PaperProvider theme={theme}>
      <ErrorBoundary>
      {
        activePage == PAGES.SIGN_IN ?
        <SignIn setActivePage={setActivePage} setOperatorEmail={setOperatorEmail} operatorEmail={operatorEmail}/>:
        <OperatorView setActivePage={setActivePage} activePage={activePage} operatorEmail={operatorEmail}/>
      }
      </ErrorBoundary>
    </PaperProvider>
  );
}
