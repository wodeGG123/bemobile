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
  //文本太长 末尾剪切
  cutTails(str,n){
    if(str.length>n){
      return str.substr(0,n-1)+'...'
    }else{
      return str
    }
  }
  render() {
    let {data} = this.props;
    return (<TouchableHighlight 
              activeOpacity={0.6}
              underlayColor='transparent'
              onPress={()=>{this.props.handleClick()}}
            >
      <View style={styles.container}>
        <View style={styles.imgWrap}>
            <Image style={styles.img}
              source={imgObj}
              resizeMode={'cover'}
            />
            <Text style={styles.imgText}>{data&&(this.cutTails(data.groupName,16))}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

