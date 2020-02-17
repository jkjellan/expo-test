import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import BottomNav from './BottomNav';
import Header from './Header';

export default class OperatorView extends React.Component
 {

  render() {
    return (
      <Fragment>
        <Header activePage={this.props.activePage} setActivePage = {this.props.setActivePage} operatorEmail={this.props.operatorEmail}/>
        <BottomNav activePage={this.props.activePage} setActivePage = {this.props.setActivePage} operatorEmail={this.props.operatorEmail}/>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({

});