import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { TextInput, HelperText, withTheme, Theme, Text, Button } from 'react-native-paper';
import { PAGES } from './Constants';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const MAX_LENGTH = 20;

class Login extends React.Component{
  // constructor(props) {
  //   super(props);
  //   // Don't call this.setState() here!
  // }


  isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

  onSignIn = (googleUser) => {
  //console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const screenProps = this.props.screenProps;
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken, googleUser.accessToken);
      // Sign in with credential from the Google user.
      //console.log("firebase signIn credential: ", credential)
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(function(result) {
          //console.log('user signed in with result: ', result)

          if(result.additionalUserInfo.isNewUser)
          {
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                date_registered: Date.now(),
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name
              })
              .then(function(snapshot) {
                console.log('Snapshot', snapshot);
              }) 
            } else {
              firebase
                .database()
                .ref('/users/' + result.user.uid).update({
                  last_logged_in: Date.now()
                })
            }
        })
        .catch(function(error) {
          console.log("error: ", error)
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  }.bind(this));
}

  signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: '482380904957-9hsijrjvk8qm327gms5i8jpq6nhojo0u.apps.googleusercontent.com',
      behavior: 'web',
      //iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      this.props.screenProps.setActivePage(PAGES.PROFILE)
      this.onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}


  render() {
    console.log("Login.js this.props.screenProps: ", this.props.screenProps)
    //console.log("render from SignIn this.props.operatorInfo: ", this.props.operatorInfo)
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.viewContainer}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
          <View style = {styles.titleContainer}>
            <Text style = {styles.title}>BYODrone</Text>
            <Image
              source={require('./assets/drone1.png')}
              style = {styles.titleIcon}
            />
          </View>
          {/*<TextInput
            mode="outlined"
            style={[styles.inputEmail]}
            label="Email"
            //placeholder="Email"
            value={this.props.screenProps.operatorInfo.operatorEmail}
            onChangeText={email =>
              this.props.screenProps.setOperatorInfo({
                ...this.props.screenProps.operatorInfo,
                operatorEmail: email
              })
            }
          />*/}
          <Button style={styles.buttonJoin} mode="contained" onPress={() => {
            //console.log("on Sign in with Google button press, this.props: ", this.props)
            //this.props.navigation.navigate('LoadingScreen');
            this.signInWithGoogleAsync()
            }}>
            <Text style={styles.buttonJoinText}>Sign In With Google</Text>
          </Button>
          <View  />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    padding: 65,
    justifyContent: "center",
  },

  buttonJoin: {
    //margin: 9,
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonJoinText: {
    fontSize: 22,
    color: "#fff",

  },
  inputEmail: {
    margin: 8,
    fontSize: 24,
  },

  titleContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  title: {
    padding: 10,
    fontSize: 46,
  },
  titleIcon: {
    height: 80,
    width: 80,

  }
});

export default withTheme(Login);