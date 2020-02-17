import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { TextInput, HelperText, withTheme, Theme, Text, Button } from 'react-native-paper';
import { PAGES } from './Constants';

const MAX_LENGTH = 20;


class TextInputExample extends React.Component{
  static title = 'TextInput';

  signIn = () => {

  }

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.viewContainer}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
          <View style = {styles.titleContainer}>
            <Text style = {styles.title}>BYODrone</Text>
            <Image
              source={require('./assets/drone1.png')}
              style = {styles.titleIcon}
            />
          </View>
          <TextInput
            mode="outlined"
            style={[styles.inputEmail]}
            label="Email"
            //placeholder="Email"
            value={this.props.operatorEmail}
            onChangeText={email =>
              this.props.setOperatorEmail(email)
            }
          />
          <Button style={styles.buttonJoin} mode="contained" onPress={() => this.props.setActivePage(PAGES.PROFILE)}>
            <Text style={styles.buttonJoinText}>Join</Text>
          </Button>
          <View  />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  buttonJoin: {
    margin: 9,
  },
  buttonJoinText: {
    fontSize: 26,
    color: "#fff"
  },
  inputEmail: {
    margin: 8,
    fontSize: 24,
  },

  titleContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  title: {
    padding: 10,
    fontSize: 40,
  },
  titleIcon: {
    height: 80,
    width: 80,

  }
});

export default withTheme(TextInputExample);