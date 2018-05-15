import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

export default class RightButton extends Component {
  handleExit(){
    this.props.navigation.pop();
  }
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.backWrap}>
          <Icon style={styles.backIcon} onPress={()=>{this.props.close()}} name='md-arrow-round-back' />
        </View>
        <View style={styles.userInfoWrap}>
          <Icon style={styles.userInfoIcon} name='md-contact' />
          <Text style={styles.userInfoText}>Admin</Text>
        </View>
        <View style={styles.exitWrap}>
          <Button onPress={()=>{this.handleExit()}} style={{backgroundColor: '#F6B610'}}>
            <View style={styles.exitContent}>
              <Icon style={styles.exitIcon} name='md-log-in' />
              <Text style={styles.exitText}>退出登录</Text>
            </View>
          </Button>
        </View>
        <View style={styles.infoWrap}>
            <Text style={styles.infoText1}>SDC BE</Text>
            <Text style={styles.infoText2}>v1.0.0</Text>
        </View>
      </View>
    )
  }
}


