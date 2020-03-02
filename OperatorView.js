import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text, withTheme } from 'react-native-paper';
import BottomNav from './BottomNav';
import Header from './Header';

class OperatorView extends React.Component
 {
   // update theme from App.js
  theme = this.props.theme;

  render() {
    //console.log("render from OperatorView this.props.operatorInfo: ", this.props.screenProps.operatorInfo)
    return (
      <Fragment>
        <Header 
          activePage = {this.props.screenProps.activePage} 
          setActivePage = {this.props.screenProps.setActivePage} 
          operatorInfo = {this.props.screenProps.operatorInfo}
          navigate = {this.props.navigation.navigate}
        />
        <BottomNav 
          activePage= {this.props.screenProps.activePage}
          setActivePage = {this.props.screenProps.setActivePage}
          operatorInfo = {this.props.screenProps.operatorInfo}
          setOperatorInfo = {this.props.screenProps.setOperatorInfo}
        />
      </Fragment>
    );
  }


  styles = StyleSheet.create({

  });
}

export default withTheme(OperatorView)