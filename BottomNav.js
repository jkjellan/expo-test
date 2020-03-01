import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { BottomNavigation, Text, withTheme } from 'react-native-paper';
import { PAGES } from './Constants';
import Profile from './Profile';
import JobsList from './JobsList';
import JobActive from './JobActive';
import JobsCompleted from './JobsCompleted';


const operatorProfile = (operatorInfo, setOperatorInfo) => {
  return (
    <Profile
      operatorInfo={operatorInfo}
      setOperatorInfo={setOperatorInfo}
      text={"I am an operator profile"}
    />
  )
}

const jobsList = (operatorInfo) => {
  return (
    <JobsList
      operatorInfo={operatorInfo}
      text={"I am a joblist"}
    />
  )
}

const jobActive = (operatorInfo) => {
  return (
    <JobActive 
      operatorInfo={operatorInfo}
      text={"I am a list of active jobs"}
    />
  )
}

const jobsCompleted = (operatorInfo) => {
  return (
    <JobsCompleted 
      operatorInfo={operatorInfo}
      text={"I am a list of completed jobs"}
    />
  )
}

const Pages = {
  0 : PAGES.PROFILE,
  1 : PAGES.AVAILABLE_JOBS,
  2 : PAGES.ACTIVE_JOB,
  3 : PAGES.COMPLETED_JOBS,
}

class BottomNav extends React.Component
 {
   // update theme from App.js
  theme = this.props.theme;

  static title = 'Bottom Navigation';

  state = {
    index: 0,
    routes: [
      { key: 'operatorProfile', title: 'Profile', icon: 'account-box', color: this.theme.colors.primary },
      { key: 'jobsList', title: "Jobs", icon: 'format-list-checkbox', color: this.theme.colors.primary, badge: true, },
      { key: 'jobActive', title: "Active", icon: 'checkbox-blank-outline', color: this.theme.colors.primary, },
      { key: 'jobsCompleted', title: "Completed", icon: 'check-box-outline', color: this.theme.colors.primary, },
    ],
  };

  _handleIndexChange = index => {
          this.setState({ index })
          this.props.setActivePage(Pages[index])
          }

  _renderScene = BottomNavigation.SceneMap({
          operatorProfile: () => operatorProfile(this.props.operatorInfo, this.props.setOperatorInfo),
          jobsList: () => jobsList(this.props.operatorInfo),
          jobActive: () => jobActive(this.props.operatorInfo),
          jobsCompleted: () => jobsCompleted(this.props.operatorInfo),
        });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }



  styles = StyleSheet.create({
    navBar: {
      backgroundColor: this.theme.colors.primary
    }
  });
}


export default withTheme(BottomNav)