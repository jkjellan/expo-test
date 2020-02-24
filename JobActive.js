import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text, withTheme } from 'react-native-paper';

class JobActive extends React.Component
 {
   // update theme from App.js
  theme = this.props.theme;

  render() {
    return (
      <Fragment>
        <Text style={this.styles.jobActive} >{this.props.text}</Text>       
      </Fragment>
    );
  }


  styles = StyleSheet.create({
    jobActive: {
        padding:30
    },
  });
}

export default withTheme(JobActive)