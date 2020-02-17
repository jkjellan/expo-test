import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { PAGES } from './Constants';
import Profile from './Profile';
import JobsList from './JobsList';
import JobActive from './JobActive';
import JobsCompleted from './JobsCompleted';


const operatorProfile = (text) => {
  return (
    <Profile text={text}/>
  )
}

const jobsList = (text) => {
  return (
    <JobsList text={text}/>
  )
}

const jobActive = (text) => {
  return (
    <JobActive text={text}/>
  )
}

const jobsCompleted = (text) => {
  return (
    <JobsCompleted text={text}/>
  )
}

const Pages = {
  0 : PAGES.PROFILE,
  1 : PAGES.AVAILABLE_JOBS,
  2 : PAGES.ACTIVE_JOB,
  3 : PAGES.COMPLETED_JOBS,
}

export default class BottomNav extends React.Component
 {
  static title = 'Bottom Navigation';

  state = {
    index: 0,
    routes: [
      { key: 'operatorProfile', title: 'Profile', icon: 'account-box', color: '#2d302e' },
      { key: 'jobsList', title: "Jobs", icon: 'format-list-checkbox', color: '#2d302e', badge: true, },
      { key: 'jobActive', title: "Active", icon: 'checkbox-blank-outline', color: '#2d302e', },
      { key: 'jobsCompleted', title: "Completed", icon: 'check-box-outline', color: '#2d302e', },
    ],
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => {
          this.setState({ index })
          this.props.setActivePage(Pages[index])
          }
        }
        renderScene={BottomNavigation.SceneMap({
          operatorProfile: () => operatorProfile("I am a profile"),
          jobsList: () => jobsList("I am a list of jobs"),
          jobActive: () => jobActive("I am an active job"),
          jobsCompleted: () => jobsCompleted("I am a list of completed jobs"),
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    padding:30
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
});