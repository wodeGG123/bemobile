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
    store: React.PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      img: imgObj
    }
  }
  componentWillMount() {
    let { data } = this.props;
    let userInfo = this.context.store.getState().userInfo
    let img = `${userInfo.reportUrl}/${data.flowId}/img/${data.flowId}.png`
    this.setState({
      img: {
        uri: img
      }
    })
  }
  handleClick() {
    this.props.detailShow(this.props.data)
  }
  //文本太长 末尾剪切
  cutTails(str, n) {
    if (str && (str.length > n)) {
      return str.substr(0, n - 1) + '...'
    } else {
      return str
    }
  }
  render() {
    let { data } = this.props;
    return (<TouchableHighlight
      activeOpacity={0.6}
      underlayColor='transparent'
      onPress={() => { this.handleClick() }}
    >
      <View style={styles.container}>
        <View style={styles.imgWrap}>
          <Image style={styles.img}
            onError={(e) => {
              this.setState({
                img: imgObj
              })
            }}
            source={this.state.img}
            resizeMode={'cover'}
          />
          <Text style={styles.imgText}>{data && (this.cutTails(data.reportName, 16))}</Text>
        </View>
        <Text style={styles.text}>创建者：{data && (this.cutTails(data.reportOwner, 10))}</Text>
      </View>
    </TouchableHighlight>
    );
  }
}

