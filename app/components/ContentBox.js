import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';

let { width } = Dimensions.get('window');
width -= 20;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1014',
    width,
    height: 100,
    marginTop: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  headerBg: {
    width,
    height: 27,
    resizeMode: 'stretch',
  },
  headerBgLeft: {
    position: 'absolute',
    top: -1,
    left: -10,
    width: 33,
    height: 28,
    resizeMode: 'stretch',
  },
  headerBgRight: {
    position: 'absolute',
    top: -1,
    right: 0,
    width: 33,
    height: 28,
    resizeMode: 'stretch',
  },
  title: {
    position: 'absolute',
    top: 0,
    color: '#6f9fc8',
    textAlign: 'center',
    width,
    fontFamily: 'Verdana',
    fontWeight: '700',
    fontSize: 12,
  },
});

class ContentBox extends Component {
  render() {
    const { title, items } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../header-bg.png')}
            style={styles.headerBg}
          />
          <Image
            source={require('../header-left.png')}
            style={styles.headerBgLeft}
          />
          <Image
            source={require('../header-right.png')}
            style={styles.headerBgRight}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}

export default ContentBox;
