import * as React from 'react';
import {Fragment} from 'react';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { PAGES } from './Constants';

export default class Header extends React.Component {
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
      <Appbar.Header>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title={this.props.activePage}
          subtitle={this.props.operatorEmail}
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
}