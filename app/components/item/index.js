import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './style';
import sys from '../../request/system';
var imgObj = require('./img/chart.jpg');

export default class Main extends Component {
  static contextTypes = {
    store:React.PropTypes.object
  }
  handleClick(){
    let userInfo = this.context.store.getState().userInfo;
    this.props.navigation.push('Detail',{
      reportUrl:userInfo.reportUrl,
      flowId:this.props.data.flowId,
    });
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
            <Text style={styles.imgText}>{data&&data.reportName}</Text>
        </View>
        <Text style={styles.text}>创建者：{data&&data.createUserId}</Text>
      </View>
      </TouchableHighlight>
    );
  }
}

