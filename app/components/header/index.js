import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from './style'

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.left&&<View style={styles.left}>{this.props.left}</View>}
        {this.props.center&&<Text style={styles.center}>{this.props.center}</Text>}
        {this.props.right&&<View style={styles.right}>{this.props.right}</View>}
      </View>
    );
  }
}

