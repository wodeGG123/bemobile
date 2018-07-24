/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import App from './app/index';


export default class bemobile extends Component {
    render() {
        return (<App />);
    }
}
AppRegistry.registerComponent('bemobile', () => bemobile);
