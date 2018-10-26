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
  StatusBar
} from 'react-native';
import styles from './style';
import Item2 from '../../../components/item2/index';
import Item from '../../../components/item/index';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import report from '../../../request/report';

var { height, width } = Dimensions.get('window');
height = Platform.OS == 'ios' ? height : height - StatusBar.currentHeight;

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
      page: 1,
      isRefreshing: false,
    };
  }
  handleClick() {
    let _Val = Platform.OS == 'ios' ? this.state.wrapHeight - 64 : this.state.wrapHeight - 40
    if (!this.state.spread) {
      _Val = 0;
      this.getData();
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
    //获取外框真实高度
    let a = this.context.store.subscribe(() => {
      if (this.context.store.getState().device) {
        let { height } = this.context.store.getState().device;
        this.setState({
          fadeAnim: new Animated.Value(Platform.OS == 'ios' ? height - 64 : height - 40),
          wrapHeight: height,
        })
        a();
      }
    })
  }
  getData() {
    if (this.props.groupData.flowId) {
      let userInfo = this.context.store.getState().userInfo;
      let { dataSourceList, rows, page } = this.state;
      //获取报表列表
      report.list({
        isPublished: 1,
        isOwn: 2,
        isContainsGroupedReport: 0,
        groupId: this.props.groupData.flowId,
        loginId: userInfo.token,
        ip: userInfo.ip,
        port: userInfo.port,
      })
        .then((data) => {
          if (data && data.statusCode == '200') {
            if (data.data && data.data.list.length > 0) {
              dataSourceList = data.data.list
              let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
              this.setState({
                dataSource,
                dataSourceList,
                page: page + 1,
              });
            }

          }
        });
    }
  }
  onEndReached() {
    this.getData()
  }
  onRefresh() {
    this.setState({
      page: 1
    }, () => { this.getData() })
  }
  render() {
    return (
      <Animated.View style={[styles.container, { top: this.state.fadeAnim }]}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor='transparent'
          onPress={() => { this.handleClick() }}
        >
          <View style={styles.scanAllWrap}>
            <Text style={styles.scanAllText}>{this.props.groupData.groupName}</Text>
            <FontAwesomeIcon style={styles.scanAllIcon} name={'angle-double-down'} />
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
            //report列表
            return <Item data={rowData} detailShow={(data) => { this.props.detailShow(data) }} navigation={this.props.navigation} />
          }}
          contentContainerStyle={styles.listWrap}
          onEndReachedThreshold={60}
          onEndReached={() => { this.onEndReached() }}
        />
        <View style={styles.scanAllPlaceholder}></View>
      </Animated.View>

    );
  }
}

