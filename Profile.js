import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet, View, Dimensions, Picker } from 'react-native';
import { BottomNavigation, Text, TextInput, withTheme, IconButton } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import Map from './Map';

class Profile extends React.Component
{
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
  }
   // update theme from App.js
  theme = this.props.theme;

  render() {
    console.log("render from Profile this.props.operatorInfo: ", this.props.operatorInfo)

    return (
      <Fragment>
        <View key="textInput1" style={this.styles.textInputContainer}>
          <TextInput
            underlineColor='transparent'
            style={this.styles.textInput}
            label='Name'
            key={1}
            defaultValue={this.props.operatorInfo.operatorName}
            value={this.props.operatorInfo.operatorName}
            onChangeText={(name) => {
              this.props.setOperatorInfo({
                ...this.props.operatorInfo,
                operatorName: name
              })
              }
            }
          />
          <TextInput
            key="2"
            style={this.styles.textInput}
            label='Address of Operation'
            underlineColor='transparent'
            defaultValue={this.props.operatorInfo.operatorAddress}
            value={this.props.operatorInfo.operatorAddress}
            onChangeText={(address) => {
              this.props.setOperatorInfo({
                ...this.props.operatorInfo,
                operatorAddress: address
              })
              }
            }
          />
        </View>
          <Text style={this.styles.radiusTitle}>Jobs Within</Text>
        <View key="radius1" style={this.styles.radiusContainer}>
          <IconButton
            icon="minus"
            color={this.theme.colors.accentLight}
            size={16}
            onPress={ () => {
              this.props.setOperatorInfo({
                ...this.props.operatorInfo,
                operationRadius: this.props.operatorInfo.operationRadius - 5
              })
              }
            }
            style={this.styles.radiusPlusMinus}
          />
          
          <Text style={this.styles.radiusText}>{this.props.operatorInfo.operationRadius+ " "}miles</Text>

          <IconButton
            icon="plus"
            color={this.theme.colors.accentLight}
            size={16}
            onPress={ () => {
              this.props.setOperatorInfo({
                ...this.props.operatorInfo,
                operationRadius: this.props.operatorInfo.operationRadius + 5
              })
              }
            }
            style={this.styles.radiusPlusMinus}
          />
        </View>
        <View style = {this.styles.mapContainer}>
          <Map operationRadius={this.props.operatorInfo.operationRadius}/>
        </View>


      </Fragment>
    );
  }



  styles = StyleSheet.create({
    fab: {
      position: 'relative',
      height: 50,
      width: 50,
      margin: 5,
    },
    mapContainer: {
      flex:1,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: this.theme.colors.background,

    },
    radiusText: {
      fontSize: 24

    },
    radiusContainer: {
      paddingLeft: 6,
      paddingBottom: 4,
      flexDirection:'row',
      backgroundColor: this.theme.colors.background,

    },
    radiusPlusMinus: {
      backgroundColor: this.theme.colors.primary
    },
    radiusTitle: {
      paddingLeft: 12,
      paddingTop: 10,
      fontSize: 12,
      color: "#757575"
    },
    profile: {
      //flex: 1,
      padding:30,
      fontSize: 20
    },
    mapStyle: {
      width: "100%",
      height: "100%",

    },
    picker: {
      height: 60,
      width: "100%",
      backgroundColor: this.theme.colors.background,
      fontSize: 50
    },
    item: {
      fontSize: 40
    },
    textInput: {
      fontSize: 24,
      backgroundColor: this.theme.colors.background,
      overflow: 'hidden',
      marginBottom: -2
    },
    textInputContainer: {
      overflow: 'hidden',
      fontSize: 24,
      backgroundColor: this.theme.colors.background,
    }
  });
}


export default withTheme(Profile)