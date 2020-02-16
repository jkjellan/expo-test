import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ErrorBoundary from './ErrorBoundary.js';
import OperatorView from './OperatorView.js'
import SignIn from './SignIn.js'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#444',
    accent: 'green',
  },
};

export default function Main() {
  let [isSignedIn, setIsSignedIn] = React.useState(false);
  let [email, setEmail] = React.useState("defaultEmails");

  return (
    <PaperProvider theme={theme}>
      <ErrorBoundary>
      {
        !isSignedIn ?
        <SignIn setIsSignedIn={setIsSignedIn} setEmail={setEmail}/>:
        <OperatorView email={email}/>
      }
      </ErrorBoundary>
    </PaperProvider>
  );
}
