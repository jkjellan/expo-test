import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet, View, Dimensions, Picker } from 'react-native';
import { BottomNavigation, Text, TextInput, withTheme, IconButton } from 'react-native-paper';
import Map from './Map';
import firebase from 'firebase';

class Profile extends React.Component
{
  constructor(props) {
    super(props);
    //this.ref = React.createRef();

    // Don't call this.setState() here!
    this.state = {
      nameEditable: false,
      addressEditable: false
    }
  }
   // update theme from App.js
  theme = this.props.theme;

  saveToDB = () => {
    console.log("uid is: ", this.props.operatorInfo.uid)
      firebase
        .database()
        .ref('/users/' + this.props.operatorInfo.uid).update({
          first_name: this.props.operatorInfo.operatorName
        })
    }
  

  componentDidMount() {
    //this.nameRef.focus()
  }

  render() {
    //console.log("render from Profile this.props.operatorInfo: ", this.props.operatorInfo)

    return (
      <Fragment>
        <View key="textInput1" style={this.styles.textInputContainer}>
          <TextInput
            ref={nameRef => this.nameRef = nameRef}
            editable={this.state.nameEditable}
            key={1}
            underlineColor='transparent'
            style={this.styles.textInput}
            label='Name'
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
          <View style={this.styles.editButtonContainer}>
            {
              this.state.nameEditable ?
              <IconButton
                icon="check"
                color={this.theme.colors.accentLight}
                size={16}
                onPress={ () => {
                  this.setState({nameEditable: false})
                  this.saveToDB();
                  }
                }
                style={this.styles.editButton}
              /> :
              <IconButton
                icon="pencil"
                color={this.theme.colors.accentLight}
                size={16}
                onPress={ () => {
                  this.setState({nameEditable: true, addressEditable: false},()=>{
                    this.nameRef.focus()
                  });
                  }
                }
                style={this.styles.editButton}
              />
            }
          </View>
        </View>
        <View key="textInput2" style={this.styles.textInputContainer}>
          <TextInput
            ref={addressRef => this.addressRef = addressRef}
            editable={this.state.addressEditable}
            key={1}
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
          <View style={this.styles.editButtonContainer}>
            {
              this.state.addressEditable ?
              <IconButton
                icon="check"
                color={this.theme.colors.accentLight}
                size={16}
                onPress={ () => {
                  this.setState({addressEditable: false})
                  }
                }
                style={this.styles.editButton}
              /> :
              <IconButton
                icon="pencil"
                color={this.theme.colors.accentLight}
                size={16}
                onPress={ () => {
                  this.setState({addressEditable: true, nameEditable: false},()=>{
                    this.addressRef.focus()
                  })}
                }
  
                style={this.styles.editButton}
              />
            }
          </View>
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
      flex: 1,
      fontSize: 24,
      backgroundColor: this.theme.colors.background,
      overflow: 'hidden',
      marginBottom: -2
    },
    textInputContainer: {
      flexDirection: 'row',
      width: "100%",
      overflow: 'hidden',
      fontSize: 24,
      backgroundColor: this.theme.colors.background,
    },
    editButton: {
      backgroundColor: this.theme.colors.primary,
      
    },
    editButtonContainer: {
      paddingTop: 24,
      paddingRight: 7
      
    },
  });
}


export default withTheme(Profile)