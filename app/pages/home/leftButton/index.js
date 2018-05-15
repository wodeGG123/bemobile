import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

export default class RightButton extends Component {
  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor='transparent'
        onPress={()=>{this.props.onPress()}}
      >
        <Icon style={styles.rightIcon} name='md-reorder' />
      </TouchableHighlight>
    )
  }
}


