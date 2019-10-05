import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';

import QRCodeScanner from 'react-native-qrcode-scanner';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
class QRCodeScannerScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isModalVisible: false,
  };

  onSuccess = e => {
    let datas = e.data;
    var items = [];
    items.push(datas.split(','));
    console.log(items);
    this.setState({isModalVisible: !this.state.isModalVisible});
    setTimeout(() => {
      this.setState({isModalVisible: !this.state.isModalVisible});
      this.props.navigation.navigate('ProductsScreen', {data: items});
    }, 2000);
  };

  render() {
    console.disableYellowBox = true;

    return (
      <View style={{flex: 1}}>
        <QRCodeScanner
          ref={node => {
            this.scanner = node;
          }}
          onRead={this.onSuccess}
          showMarker
          markerStyle={{
            borderWidth: 1,
          }}
          containerStyle={{flex: 1}}
          cameraStyle={{
            height: '100%',
          }}
          checkAndroid6Permissions
        />
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn="slideInUp"
          onBackButtonPress={() => {
            this.setState({isModalVisible: !this.state.isModalVisible});
            this.scanner.reactivate();
          }}>
          <View
            style={{
              height: 250,
              width: 250,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              elevation: 10,
              borderRadius: 5,
            }}>
            <LottieView
              source={require('../static/done.json')}
              autoPlay
              loop={false}
            />
          </View>
        </Modal>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 10,
            backgroundColor: '#fdfdfd',
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            padding: 10,
          }}>
          <TouchableOpacity onPress={() => this.scanner.reactivate()}>
          <Icon name="refresh" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default QRCodeScannerScreen;
