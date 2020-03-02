import * as React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import firebase from 'firebase';


class Loading extends React.Component{

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.props.navigation.navigate('OperatorView')
            } else {
                this.props.navigation.navigate('LoginScreen')
            }
        })
    }


  render() {
    return (
        <View style = {styles.loadingContainer}>
            <ActivityIndicator size = "large" />
        </View >
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default withTheme(Loading);