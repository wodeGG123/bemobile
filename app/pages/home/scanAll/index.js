import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Animated,
  TouchableHighlight,
  Dimensions,
  Platform,
  RefreshControl,
  StatusBar,
} from 'react-native';
import styles from './style';
import Item2 from '../../../components/item2/index';
import Item from '../../../components/item/index';
import GroupReportList from '../groupReportList/index';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import report from '../../../request/report';


export default class Main extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      drawOpen: false,
      fadeAnim: 0,
      spread: false,
      wrapHeight: 0,
      userInfo: false,
      dataSourceList: [],
      rows: 50,//设置每一页多少行
      groupPage: 1,
      reportPage: 1,
      groupData: false,
      isRefreshing: false,
      unGettingSize: () => { }
    };
  }
  handleClick() {
    let _Val = this.state.wrapHeight - 40
    if (!this.state.spread) {
      _Val = Platform.OS == 'ios' ? 64 : 40;
    }
    Animated.timing(
      this.state.fadeAnim,
      { toValue: _Val },
    ).start();
    this.setState({
      spread: !this.state.spread
    })
  }
  componentWillMount() {
    this.getData();
    //获取外框真实高度
    let a = this.context.store.subscribe(() => {
      if (this.context.store.getState().device) {
        let { height } = this.context.store.getState().device;
        this.setState({
          fadeAnim: new Animated.Value(height - 40),
          wrapHeight: height,
          unGettingSize: a
        })
      }
    })

  }
  componentWillUnmount() {
    //组件销毁的时候取消监听
    this.state.unGettingSize();
  }
  getData() {
    let userInfo = this.context.store.getState().userInfo;
    let { dataSourceList, rows, groupPage, reportPage } = this.state;
    if (groupPage == 1) {
      dataSourceList = [];
    }
    //获取分组列表
    report.reportGroup({
      isPublished: 1,
      isOwn: 2,
      index: groupPage,
      rows,
      loginId: userInfo.token,
      ip: userInfo.ip,
      port: userInfo.port,
    })
      .then((data) => {
        if (data.statusCode == '200') {
          //如果分组列表结果大于rows则不需要请求report列表
          let groupMaxPage = Math.ceil(data.data.total / rows);//计算group最大页数
          if (parseInt(data.data.list.length) == parseInt(rows)) {
            //判断是否是最后一页，如果是最后一页后一页，则不渲染
            if (groupMaxPage >= groupPage) {
              dataSourceList = dataSourceList.concat(data.data.list);
              let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
              this.setState({
                dataSource,
                dataSourceList,
                groupPage: groupPage + 1,
              });
            }
          } else {
            //获取报表列表
            report.list({
              isPublished: 1,
              isOwn: 2,
              isContainsGroupedReport: 0,
              index: reportPage,
              rows: rows - parseInt(data.data.total),//与分组互补rows
              loginId: userInfo.token,
              ip: userInfo.ip,
              port: userInfo.port,
            })
              .then((data2) => {
                if (data2.statusCode == '200') {
                  let reportMaxPage = Math.ceil(data2.data.total / rows);
                  //判断是否是最后一页，如果是最后一页后一页，则不渲染↓↓↓↓↓↓
                  if (groupMaxPage >= groupPage) {
                    dataSourceList = dataSourceList.concat(data.data.list, data2.data.list);
                  } else {
                    if (reportMaxPage >= reportPage) {
                      dataSourceList = dataSourceList.concat(data2.data.list);
                    }
                  }
                  //判断是否是最后一页，如果是最后一页后一页，则不渲染↑↑↑↑↑↑
                  let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
                  this.setState({
                    dataSource,
                    dataSourceList,
                    reportPage: reportPage + 1,
                    groupPage: groupPage + 1,
                  });
                }
              });
          }
        }
      });
  }
  onEndReached() {
    this.getData()
  }
  onItem2Click(data) {
    this.setState({
      groupData: data
    }, () => {
      this.refs.GroupReportList.handleClick();
    })
  }
  onRefresh() {
    this.setState({
      groupPage: 1,
      reportPage: 1,
      groupId: '',
    }, () => { this.getData() })
  }
  render() {
    let { i18n: lang } = this.context.store.getState();
    return (
      <Animated.View style={[styles.container, { top: this.state.fadeAnim }]}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor='transparent'
          onPress={() => { this.handleClick() }}
        >
          <View style={styles.scanAllWrap}>
            <Text style={styles.scanAllText}>{lang.home_scanall_spread}</Text>
            <FontAwesomeIcon style={styles.scanAllIcon} name={this.state.spread ? 'angle-double-down' : 'angle-double-up'} />
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
            if (rowData && rowData.groupName) {
              //分组列表
              return <Item2 handleClick={() => { this.onItem2Click(rowData) }} data={rowData} navigation={this.props.navigation} />
            } else {
              //非分组列表
              return <Item data={rowData} detailShow={(data) => { this.props.detailShow(data) }} navigation={this.props.navigation} />
            }
          }}
          contentContainerStyle={styles.listWrap}
          onEndReachedThreshold={60}
          onEndReached={() => { this.onEndReached() }}
        />
        <View style={styles.scanAllPlaceholder}></View>
        <GroupReportList navigation={this.props.navigation} detailShow={(data) => { this.props.detailShow(data) }} groupData={this.state.groupData} ref='GroupReportList' />

      </Animated.View>

    );
  }
}

