// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppRegistry, View, NativeModules, StatusBar} from 'react-native';
import {MessageBar, Text} from './components';
import configureStore from './store';
import AppNavigator from './navigator';
import applyConfigSettings from './config';
import AppStyles from './theme/AppStyles';
import Util from './util';
import DataHandler from './services/DataHandler';
import {notificationSerivces} from './Helper/PushNotification';
import ForegroundHander from './Helper/ForegroundNotification.js';

const reducers = require('./reducers').default;

applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  componentDidMount() {
    notificationSerivces();
    console.log('notificationSerivces');
    // if (Util.isPlatformAndroid()) {
    //   setTimeout(() => {
    //     NativeModules.SplashScreen?.hide();
    //   }, 2000);
    // }
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={AppStyles.flex}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
          translucent={true}
        />
        <ForegroundHander />

        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
        <MessageBar />
      </View>
    );
  }
}

AppRegistry.registerComponent('AutoConnect', () => App);
