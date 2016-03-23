import Relay from 'react-relay';
import React, {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');

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

const OGameApp = ({ me }) => (
  <View style={styles.wrapper}>
    <Image
      source={require('../background.jpg')}
      style={styles.backgroundImage}
    />
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome { me.name }!
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Shake or press menu button for dev menu
      </Text>
    </View>
  </View>
);
OGameApp.propTypes = {
  me: React.PropTypes.object.isRequired,
};

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
