import React, { Component } from 'react';
import {
  Text,
  StatusBar,
  View,
  ListView,
  Dimensions,
  TouchableHighlight,
  RefreshControl,
  Platform,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import _ from 'lodash';
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
import DetailScreen from './detail/index';
import config from '../../config'
import i18n from '../../statics/i18n/index'

let lang = i18n(config.LANGUAGE)
var { height, width } = Dimensions.get('window');
let lastBackPressed = Date.now();
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
      userInfo: false,
      page: 1,
      rows: 50,
      recentRows: 5,
      dataSourceList: [],
      searchText: '',
      isRefreshing: false,
      detailData: false,
    };
  }

  componentWillMount() {
    this.getRecentData();

  }
  drawOpen() {
    this.setState({
      drawOpen: true,
    })
  }
  drawClose() {
    this.setState({
      drawOpen: false,
    })
  }
  //获取最近report
  getRecentData() {
    let userInfo = this.context.store.getState().userInfo;
    let { recentRows, dataSourceList } = this.state;
    report.recentReport({
      isOwn: 2,
      limitNum: recentRows,
      glanceScene: 1,
      loginId: userInfo.token,
      ip: userInfo.ip,
      port: userInfo.port,
    })
      .then((data) => {
        if (data.statusCode == '200') {
          dataSourceList = data.data;
          let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
          this.setState({
            dataSource,
            page: 1,
            dataSourceList,
          });
        }

      })
  }
  //获取报表列表
  getData() {
    let userInfo = this.context.store.getState().userInfo;
    let { rows, dataSourceList, page, searchText } = this.state;

    report.list({
      searchKey: searchText,
      isPublished: 1,
      isOwn: 2,
      isContainsGroupedReport: 0,
      index: page,
      rows: rows,
      loginId: userInfo.token,
      ip: userInfo.ip,
      port: userInfo.port,
    })
      .then((data) => {
        if (data.statusCode == '200') {
          let maxPage = Math.ceil(data.data.total / rows);//最大页数
          if (maxPage >= page) {
            dataSourceList = dataSourceList.concat(data.data.list);
          }
          //如果是第一次获取
          if (page == 1) {
            dataSourceList = data.data.list
          }

          let dataSource = this.state.dataSource.cloneWithRows(dataSourceList);
          this.setState({
            dataSource,
            dataSourceList,
            page: page + 1,
          });
        }
      });
  }
  onEndReached() {
    //判断是否是搜索
    if (this.state.searchText.trim() != '') {
      this.getData();
    }
  }
  onBackPressed() {
    if (lastBackPressed + 2000 < Date.now()) {
      lastBackPressed = Date.now()
      ToastAndroid.show(lang.back_exit, ToastAndroid.SHORT);
      return true
    }
  }
  componentDidMount() {
    BackAndroid.addEventListener("hardwareBackPress", this.onBackPressed)
  }

  //组件卸载之前移除监听
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
  }
  onSearch = _.debounce((text) => {
    if (text.trim() == '') {
      this.getRecentData();
      this.setState({
        searchText: text,
        page: 1,
      });
    } else {
      this.setState({
        searchText: text,
        page: 1,
      }, () => {
        this.getData();
      })
    }
  }, 500)
  onRefresh() {
    this.getRecentData();
  }
  setWraperSize(e) {
    this.context.store.dispatch({
      type: 'SET_DEVICE_SIZE',
      data: {
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
      }
    })
  }
  detailShow(data) {
    this.setState({
      detailData: data
    }, () => {
      this.refs.Detail.show(data)
    })
  }
  render() {
    return (
      <View style={styles.container} onLayout={this.setWraperSize.bind(this)}>
        <StatusBar barStyle={'light-content'} />
        <Drawer
          type="overlay"
          content={<UserBox navigation={this.props.navigation} close={() => { this.drawClose() }} />}
          open={this.state.drawOpen}
          acceptTap={true}
          openDrawerOffset={width - 240}
          onClose={() => { this.drawClose() }}
        >
          <Header
            left={<LeftButton onPress={() => { this.drawOpen() }} />}
            right={<Search onSearch={(text) => { this.onSearch(text) }} />}
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
            renderRow={(rowData) => <Item data={rowData} detailShow={(data) => { this.detailShow(data) }} navigation={this.props.navigation} />}
            contentContainerStyle={styles.listWrap}
            onEndReachedThreshold={60}
            onEndReached={() => { this.onEndReached() }}
          />
          <View style={styles.scanAllPlaceholder}></View>
          <ScanAll detailShow={(data) => { this.detailShow(data) }} navigation={this.props.navigation} />
        </Drawer>
        {this.state.detailData && <DetailScreen ref='Detail' data={this.state.detailData} />}
      </View>
    );
  }
}

