import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

export default class JobsList extends React.Component
 {

  render() {
    return (
      <Fragment>
        <Text style={styles.jobsList} >{this.props.text}</Text>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  jobsList: {
      padding:30
  },
});