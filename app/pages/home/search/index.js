import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

export default class Main extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  render() {
    let { i18n: lang } = this.context.store.getState();
    return (
      <View style={styles.wrap}>
        <Icon style={styles.icon} name='md-search' />
        <TextInput
          autoCapitalize='none'
          style={styles.input}
          onChangeText={(text) => { this.props.onSearch(text) }}
          // onChangeText={(text) => this.setState({text})}
          // onEndEditing={() => this.props.onSearch(this.state.text)}
          placeholder={lang.search}
          placeholderTextColor={'#868584'}
          underlineColorAndroid={'transparent'}
        />
      </View>
    )
  }
}


