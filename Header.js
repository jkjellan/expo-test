import * as React from 'react';
import {Fragment} from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu, Divider, withTheme} from 'react-native-paper';
import { PAGES } from './Constants';

class Header extends React.Component {
   // update theme from App.js
  theme = this.props.theme;

  _goBack = () => console.log('Went back');
  _openMenu1 = () => this.setState({ visible1: true });
  _closeMenu1 = () => this.setState({ visible1: false });

  state = {
    visible1: false,
  };

  render() {
    const { visible1 } = this.state;

    return (
      <Fragment>
      <Appbar.Header style = {this.styles.header}>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title={this.props.activePage}
          subtitle={this.props.operatorInfo.operatorEmail}
        />
        <Menu
          visible={visible1}
          onDismiss={this._closeMenu1}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={this._openMenu1}
            />
          }
        >
          <Menu.Item onPress={() => {this.props.setActivePage(PAGES.SIGN_IN)}} title="Log Out" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Another Menu Item" />
        </Menu>
      </Appbar.Header>
      </Fragment>
    );
  }

  styles = StyleSheet.create({
    header: {
      backgroundColor: this.theme.colors.primary
    }
  });
}

export default withTheme(Header)