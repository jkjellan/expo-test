import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Vibration} from 'react-native';
import firebase from 'firebase';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants';
import { withTheme } from 'react-native-paper';

class JobsList extends React.Component
 {

  state = {
    expoPushToken : '',
    notification: {},
  };

   // update theme from App.js
  theme = this.props.theme;
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      try {
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
              console.log(token);
      this.setState({expoPushToken: token});

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      firebase
        .database()
        .ref('users/' + this.currentUser.uid + '/push_token')
        .set(token);
    } catch (error) {
      console.log(error);
    }
      
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };


  async componentDidMount() {
    this.currentUser = await firebase.auth().currentUser;
    console.log("current user: ", this.currentUser)
    await this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
    this._handleNotification
    );
  }

    _handleNotification = notification => {
    Vibration.vibrate()
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Push Notification From Test App',
      body: 'Test Body',
      data: { data: 'goes here' },
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = response._bodyInit;
    console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        <Button
          title="Send Push Notification"
          onPress={() => this.sendPushNotification()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withTheme(JobsList)