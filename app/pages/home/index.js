import React, { Component } from 'react';
import {
  Text,
  StatusBar,
  View,
  ListView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import styles from './style';
import Header from '../../components/header/index';
import LeftButton from './leftButton/index';
import Search from './search/index';
import UserBox from './userBox/index';
import ScanAll from './scanAll/index';
import Item from '../../components/item/index';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

var {height, width} = Dimensions.get('window');

export default class Main extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2']),
      drawOpen:false,
    };
  }
  drawOpen(){
    this.setState({
      drawOpen:true,
    })
  }
  drawClose(){
    this.setState({
      drawOpen:false,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Drawer
          type="overlay"
          content={<UserBox navigation={this.props.navigation} close={()=>{this.drawClose()}} />}
          open={this.state.drawOpen}
          acceptTap={true}
          openDrawerOffset={width-240}
          onClose={()=>{this.drawClose()}}
          >
          <Header
            left={<LeftButton onPress={()=>{this.drawOpen()}}/>}
            right={<Search />}
          />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Item navigation={this.props.navigation} />}
            contentContainerStyle={styles.listWrap}
          />
          <View style={styles.scanAllPlaceholder}></View>
          <ScanAll navigation={this.props.navigation} />
        </Drawer>
      </View>
    );
  }
}

