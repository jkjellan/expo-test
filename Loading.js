import * as React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import firebase from 'firebase';
import { PAGES } from './Constants';


class Loading extends React.Component{

    componentDidMount(){
        console.log("Loading component did mount")
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        console.log("checkIfLoggedIn this.props: ", this.props)
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                //console.log("user on Loading.js: ", user)
                let userDataRef = firebase.database().ref('/users/' + user.uid);
                userDataRef.on('value', (userData) => {
                    console.log("snapshot userData: ", userData)
                    console.log("Snapshot from line 24 userData.child('first_name'): ", userData.child("first_name"))
                    this.props.screenProps.setOperatorInfo(prevOperatorInfo => ({
                        ...prevOperatorInfo,
                        uid: user.uid,
                        operatorName: userData.child("first_name").val() + " " + userData.child("last_name").val(),
                        operatorEmail: userData.child("gmail").val(),
                        operatorAddress: "I live here",
                        operationRadius: 10,
                    }))
                    this.props.screenProps.setActivePage(PAGES.PROFILE)
                    this.props.navigation.navigate('OperatorView')
                })
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