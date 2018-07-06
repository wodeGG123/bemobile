import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';
import styles from './style'
var { height, width } = Dimensions.get('window');
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0),
    }
  }
  start() {
    Animated.timing(       // Uses easing functions
      this.state.progress, // The value to drive
      {
        toValue: width,        // Target
        duration: this.props.time || 20000,    // Configuration
      },
    ).start();             // Don't forget start!
  }
  end() {
    this.state.progress.setValue(width)
    setTimeout(() => {
      this.state.progress.setValue(0)
    }, 50);
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.inner, { width: this.state.progress }]}>

        </Animated.View>
      </View>
    );
  }
}

