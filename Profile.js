import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

export default class Profile extends React.Component
 {

  render() {
    return (
      <Fragment>
        <Text style={styles.profile} >{this.props.text}</Text>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
    profile: {
      padding:30
  },
});