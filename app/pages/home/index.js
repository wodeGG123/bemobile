import React, { Component } from 'react';
import {
  Text,
  StatusBar,
  View,
  ListView,
  Dimensions,
  TouchableHighlight,
  RefreshControl
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
import report from '../../request/report';

var {height, width} = Dimensions.get('window');

export default class Main extends Component {
  static contextTypes = {
    store:React.PropTypes.object
  }
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      drawOpen:false,
      userInfo:false,
      page:1,
      rows:50,
      recentRows:5,
      dataSourceList:[],
      searchText:'',
      isRefreshing:false
    };
  }
  componentWillMount(){
    this.getRecentData();
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
  //获取最近report
  getRecentData(){
    let userInfo = this.context.store.getState().userInfo;
    let {recentRows,dataSourceList} = this.state;
    report.recentReport({
      isOwn: 1,
      limitNum: recentRows,
      glanceScene: 1,
      loginId:userInfo.token,
      ip:userInfo.ip,
      port:userInfo.port,
    })
    .then((data)=>{
      if(data.statusCode == '200'){
        dataSourceList = data.data;
        let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
        this.setState({
          dataSource,
          page:1,
          dataSourceList,
        });
      }
      
    })
  }
  //获取报表列表
  getData(){
    let userInfo = this.context.store.getState().userInfo;
    let {rows,dataSourceList,page,searchText} = this.state;

    report.list({
      searchKey: searchText,
      isPublished: 1,
      isOwn: 1,
      isContainsGroupedReport: 0,
      index: page,
      rows: rows,
      loginId:userInfo.token,
      ip:userInfo.ip,
      port:userInfo.port,
    })
    .then((data)=>{
      if(data.statusCode == '200'){
        let maxPage = Math.ceil(data.data.total/rows);//最大页数
        if(maxPage >= page){
          dataSourceList = dataSourceList.concat(data.data.list);
        }
        //如果是第一次获取
        if(page==1){
          dataSourceList=data.data.list
        }
        
        let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
        this.setState({
          dataSource,
          dataSourceList,
          page:page+1,
        });
      }
    });
  }
  onEndReached(){
    //判断是否是搜索
    if(this.state.searchText.trim() != ''){
      this.getData();
    }
  }
  onSearch(text){
    if(text.trim() == ''){
      this.getRecentData();
    }else{
      this.setState({
        searchText:text,
        page:1,
      },()=>{
        this.getData();
      })
    }
  }
  onRefresh(){
    this.getRecentData();
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
            right={<Search onSearch={(text)=>{this.onSearch(text)}} />}
          />
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                title="Loading..."
                titleColor="#eeeeee"
              />
            }
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Item data={rowData} navigation={this.props.navigation} />}
            contentContainerStyle={styles.listWrap}
            onEndReachedThreshold={60}
            onEndReached={()=>{this.onEndReached()}}
          />
          <View style={styles.scanAllPlaceholder}></View>
          <ScanAll navigation={this.props.navigation} />
        </Drawer>
      </View>
    );
  }
}

