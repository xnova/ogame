'use strict';

import React, {
  AppRegistry,
} from 'react-native';
import OGame from './app';

console.ignoredYellowBox = [
  // FIXME: https://github.com/facebook/react-native/issues/1501
  'Warning: ScrollView doesn\'t take rejection well - scrolls anyway',
];

//TODO rename AwesomeProject where is necessary
AppRegistry.registerComponent('OGame', () => OGame);
