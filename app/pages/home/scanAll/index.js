import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Animated,
  TouchableHighlight,
  Dimensions,
  Platform,
} from 'react-native';
import styles from './style';
import Item from '../../../components/item/index';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

var {height, width} = Dimensions.get('window');

export default class Main extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2']),
      drawOpen:false,
      fadeAnim:new Animated.Value(-height+40),
      spread:false,
      wrapHeight:Platform.OS=='ios'?height:false,
    };
  }
  handleClick(){
    let _Val = -this.state.wrapHeight+40;
    if(!this.state.spread){
      _Val = Platform.OS=='ios'?-64:-40;
    }
    Animated.timing(          
      this.state.fadeAnim,    
      {toValue: _Val},           
    ).start();               
    this.setState({
      spread:!this.state.spread
    })
  }
  onLayout(e){
    let {x,y,width,height:reHeight} = e.nativeEvent.layout;
    if(height != reHeight && !this.state.wrapHeight){
      this.setState({
        fadeAnim:new Animated.Value(-reHeight+40),
        wrapHeight:reHeight
      })
    }
  }
  render() {
    return (
    <Animated.View onLayout={(e) => {this.onLayout(e)}} style={[styles.container,{bottom:this.state.fadeAnim}]}>
       <TouchableHighlight
              activeOpacity={0.6}
              underlayColor='transparent'
              onPress={()=>{this.handleClick()}}
            >
              <View style={styles.scanAllWrap}>
                <Text style={styles.scanAllText}>查看所有</Text>
                <FontAwesomeIcon style={styles.scanAllIcon} name={this.state.spread?'angle-double-down':'angle-double-up'} />
              </View>
      </TouchableHighlight>
      <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Item navigation={this.props.navigation} />}
            contentContainerStyle={styles.listWrap}
      />
       <View style={styles.scanAllPlaceholder}></View>
    </Animated.View>
     
    );
  }
}

