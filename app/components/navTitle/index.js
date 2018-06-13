import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from './style'

export default class Main extends Component {
  render() {
    return (<View style={styles.container}><Text style={styles.text}>{this.props.children}</Text></View>
    );
  }
}

