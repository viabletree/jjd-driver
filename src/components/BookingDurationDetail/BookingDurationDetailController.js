import React from 'react';
import PropTypes from 'prop-types';
import BookingDurationDetailView from './BookingDurationDetailView';
import Communications from 'react-native-communications';
import util from '../../util';
import {Linking} from 'react-native';

export default class BookingDurationDetailController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  smsCall = (phone, call) => {
    if (phone) {
      if (call) {
        Linking.openURL(`tel:${'+' + phone}`);
      } else {
        Linking.openURL(`sms:${'+' + phone}`);
      }
    } else {
      util.topAlert('No contact information found.');
    }
  };
  render() {
    return <BookingDurationDetailView {...this.props} smsCall={this.smsCall} />;
  }
}
