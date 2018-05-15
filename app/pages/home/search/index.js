import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

export default class RightButton extends Component {
  render() {
    return (
      <View style={styles.wrap}>
        <Icon style={styles.icon} name='md-search' />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder={'搜索内容'}
          placeholderTextColor={'#868584'}
          underlineColorAndroid={'transparent'}
        />
      </View>
    )
  }
}


