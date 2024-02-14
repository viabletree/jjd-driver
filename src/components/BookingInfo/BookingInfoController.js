import React from 'react';
import PropTypes from 'prop-types';
import BookingInfoView from './BookingInfoView';

export default class BookingInfoController extends React.Component {
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <BookingInfoView {...this.props} />;
  }
}
