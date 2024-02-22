import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from './LoginView';
import {Keyboard} from 'react-native';
import util from '../../util';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {requestCode} from '../../actions/UserActions';

class LoginController extends React.Component {
  constructor() {
    super();
    this.state = {
      // number: '',
      number: '',
      // number: '7778900009',
      // number: '07557857345', //amarnath.sivert@gmail.com
      // number: '07557857540', //bernard.sivert1@gmail.com
      // number: '07557857547', //Support@kiffgo.io
      // number: '07557857888', //anas@kiffgo.io
      loading: false,
    };
  }
  static defaultProps = {};

  static propTypes = {};

  email;
  password;

  emailValue = '';
  passwordValue = '';
  onNumberChange = number => {
    this.setState({number});
  };
  _validateForm(number) {
    Keyboard.dismiss();
    const errors = {};
    if (_.isEmpty(number)) {
      // email is required

      util.topAlert('Number is required');
      return false;
    }
    if (!util.isValidMobileNumber('44' + number)) {
      util.topAlert('Invalid number');
      return false;
    }

    return true;
  }

  _onSubmit = () => {
    let number = '' + this.state.number;
    // console.log(number.charAt(0));

    if (_.isEqual(number.charAt(0), '0')) {
      number = number.substr(1);
    }
    // console.log(number);
    if (this._validateForm(number)) {
      const payload = {
        phone: '44' + number,
      };
      util.showLoader(this);
      this.props.requestCode(payload, (status, code) => {
        util.hideLoader(this);
        if (status) {
          Actions.otp({num: number, code});
        }
      });
      // Actions.otp({num: this.state.number});
    }
  };
  render() {
    return (
      <LoginView
        {...this.props}
        keyOpen={this.state.keyOpen}
        onNumberChange={this.onNumberChange}
        onSubmit={this._onSubmit}
        loading={this.state.loading}
        number={this.state.number}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});
const actions = {requestCode};
export default connect(mapStateToProps, actions)(LoginController);
