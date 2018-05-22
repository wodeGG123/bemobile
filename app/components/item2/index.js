import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './style';
var imgObj = require('./img/chart.jpg');

export default class Main extends Component {
  handleClick(){
    this.props.handleClick()
  }

  render() {
    let {data} = this.props;
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
            <Text style={styles.imgText}>{data&&data.groupName}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

