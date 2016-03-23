import Relay from 'react-relay';
// import IncidenceList from './IncidenceList';
import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';

const { height, width } = Dimensions.get('window');

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
    width,
    height,
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width,
    height,
    resizeMode: 'cover',
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

class OGameApp extends Component {
  render() {
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
    me: () => Relay.QL`
      fragment on User {
        id
        name
      }
    `,
  },
});
