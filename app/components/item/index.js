import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './style';
var imgObj = require('./img/chart.png');

export default class Main extends Component {
  handleClick(){
    this.props.navigation.push('Detail');
  }
  render() {
    return (<TouchableHighlight 
              activeOpacity={0.6}
              underlayColor='transparent'
              onPress={()=>{this.handleClick()}}
            >
      <View style={styles.container}>
        <View style={styles.imgWrap}>
            <Image style={styles.img}
              source={imgObj}
              resizeMode={'cover'}
            />
            <Text style={styles.imgText}>标题</Text>
        </View>
        <Text style={styles.text}>创建者：SDC BE</Text>
      </View>
      </TouchableHighlight>
    );
  }
}

