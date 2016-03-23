'use strict';

import Relay from 'react-relay';
// import IncidenceList from './IncidenceList';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';
import Dimensions from 'Dimensions';

const { height, width } = Dimensions.get('window');

class OGameApp extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    //this.props.me.email
    const { name } = this.props.me;
    return (
      <View style={styles.wrapper}>
        <Image
          source={require('../background.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome { name }!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Shake or press menu button for dev menu
          </Text>
        </View>
      </View>
    );
  }
}

export default Relay.createContainer(OGameApp, {
  fragments: {
    me: variables => Relay.QL`
      fragment on User {
        id
        name
      }
    `,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: width,
    height: height,
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: width,
    height: height,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#F0F0F0',
    marginBottom: 5,
  },
});
