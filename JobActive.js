import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

export default class JobActive extends React.Component
 {

  render() {
    return (
      <Fragment>
        <Text style={styles.jobActive} >{this.props.text}</Text>       
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  jobActive: {
      padding:30
  },
});