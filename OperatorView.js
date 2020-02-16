import * as React from 'react';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

const PhotoGallery = ({ route }) => {
  const PHOTOS = Array.from({ length: 24 }).map(
    (_, i) => `https://unsplash.it/300/300/?random&__id=${route.key}${i}`
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {PHOTOS.map(uri => (
        <View key={uri} style={styles.item}>
          <Image source={{ uri }} style={styles.photo} />
        </View>
      ))}
    </ScrollView>
  );
};

const operatorProfile = (email) => {
  return (
    <Text style={styles.profile} >{email}</Text>
  )
}

export default class BottomNavigationExample extends React.Component
 {
  static title = 'Bottom Navigation';

  state = {
    index: 0,
    routes: [
      { key: 'operatorProfile', title: 'Profile', icon: 'account-box', color: '#2d302e' },
      {
        key: 'library',
        title: 'Library',
        icon: 'inbox',
        color: '#2d302e',
        badge: true,
      },
      {
        key: 'favorites',
        title: 'Favorites',
        icon: 'heart',
        color: '#2d302e',
      },
      {
        key: 'purchased',
        title: 'Purchased',
        icon: 'shopping-music',
        color: '#2d302e',
      },
    ],
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        // @ts-ignore
        renderScene={BottomNavigation.SceneMap({
          operatorProfile: () => operatorProfile(this.props.email),
          library: PhotoGallery,
          favorites: PhotoGallery,
          purchased: PhotoGallery,
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        // there is no 'grid' type in RN :(
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gridRowGap: '8px',
        gridColumnGap: '8px',
        padding: 8,
      },
      item: {
        width: '100%',
        height: 150,
      },
    },
    default: {
      content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
      },
      item: {
        height: Dimensions.get('window').width / 2,
        width: '50%',
        padding: 4,
      },
    },
  }),
  profile: {
    padding:30
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
});