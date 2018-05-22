import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Animated,
  TouchableHighlight,
  Dimensions,
  Platform,
  RefreshControl
} from 'react-native';
import styles from './style';
import Item2 from '../../../components/item2/index';
import Item from '../../../components/item/index';
import GroupReportList from '../groupReportList/index';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import report from '../../../request/report';

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
      fadeAnim:new Animated.Value(-height+40),
      spread:false,
      wrapHeight:Platform.OS=='ios'?height:false,
      userInfo:false,
      dataSourceList:[],
      rows:50,//设置每一页多少行
      groupPage:1,
      reportPage:1,
      groupId:'',
      isRefreshing:false,
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
  componentWillMount(){
    this.getData();
  }
  getData(){

    let userInfo = this.context.store.getState().userInfo;
    let {dataSourceList,rows,groupPage,reportPage} = this.state;
    //获取分组列表
    report.reportGroup({
      isPublished: 1,
      isOwn: 0,
      index: groupPage,
      rows,
      loginId:userInfo.token,
      ip:userInfo.ip,
      port:userInfo.port,
    })
    .then((data)=>{
      if(data.statusCode == '200'){
        //如果分组列表结果大于rows则不需要请求report列表
        let groupMaxPage = Math.ceil(data.data.total/rows);//计算group最大页数
        if(parseInt(data.data.list.length) == parseInt(rows)){
          //判断是否是最后一页，如果是最后一页后一页，则不渲染
          if(groupMaxPage >= groupPage){
            dataSourceList = dataSourceList.concat(data.data.list);
            let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
            this.setState({
              dataSource,
              dataSourceList,
              groupPage:groupPage+1,
            });
          }
        }else{
          //获取报表列表
          report.list({
            isPublished: 1,
            isOwn: 1,
            isContainsGroupedReport: 0,
            index: reportPage,
            rows: rows-parseInt(data.data.total),//与分组互补rows
            loginId:userInfo.token,
            ip:userInfo.ip,
            port:userInfo.port,
          })
          .then((data2)=>{
            if(data2.statusCode == '200'){
              let reportMaxPage = Math.ceil(data2.data.total/rows);
              //判断是否是最后一页，如果是最后一页后一页，则不渲染↓↓↓↓↓↓
              if(groupMaxPage >= groupPage){
                dataSourceList = dataSourceList.concat(data.data.list,data2.data.list);
              }else{
                if(reportMaxPage >= reportPage){
                  dataSourceList = dataSourceList.concat(data2.data.list);
                }
              }
              //判断是否是最后一页，如果是最后一页后一页，则不渲染↑↑↑↑↑↑
              let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
              this.setState({
                dataSource,
                dataSourceList,
                reportPage:reportPage+1,
                groupPage:groupPage+1,
              });
            }
          });
        }
      }
    });
  }
  onEndReached(){
    this.getData()
  }
  onItem2Click(groupId){
    this.setState({
      groupId
    },()=>{
      this.refs.GroupReportList.handleClick();
    })
  }
  onRefresh(){
    this.setState({
      groupPage:1,
      reportPage:1,
      groupId:'',
    },()=>{this.getData()})
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
            renderRow={(rowData) => {
              if(rowData.groupName){
                //分组列表
                return <Item2 handleClick={()=>{this.onItem2Click(rowData.flowId)}} data={rowData} navigation={this.props.navigation} />
              }else{
                //非分组列表
                return <Item data={rowData} navigation={this.props.navigation} />
              }
            }}
            contentContainerStyle={styles.listWrap}
            onEndReachedThreshold={60}
            onEndReached={()=>{this.onEndReached()}}
      />
       <View style={styles.scanAllPlaceholder}></View>
       <GroupReportList navigation={this.props.navigation} groupId={this.state.groupId} ref='GroupReportList' />
       
    </Animated.View>
     
    );
  }
}

