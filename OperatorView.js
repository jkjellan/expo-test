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
    return (
      <Fragment>
        <Header 
          activePage = {this.props.activePage} 
          setActivePage = {this.props.setActivePage} 
          operatorInfo = {this.props.operatorInfo}
        />
        <BottomNav 
          activePage= {this.props.activePage}
          setActivePage = {this.props.setActivePage}
          operatorInfo = {this.props.operatorInfo}
          setOperatorInfo = {this.props.setOperatorInfo}
        />
      </Fragment>
    );
  }


  styles = StyleSheet.create({

  });
}

export default withTheme(OperatorView)