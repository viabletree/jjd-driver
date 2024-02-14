import React from 'react';
import PropTypes from 'prop-types';
import BookingStopItemView from './BookingStopItemView';
import {View, Text} from 'react-native';

export default class BookingStopItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    multiStop: PropTypes.bool.isRequired,
    accepted: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
  };
  static defaultProps = {};
  mapClick = () => {
    this.mapSheetRef.close();
  };
  render() {
    return (
      <BookingStopItemView
        {...this.props}
        mapSheetRef={ref => {
          this.mapSheetRef = ref;
        }}
        mapClick={this.mapClick}
        goClick={() => this.mapSheetRef.open()}
      />
    );
  }
}
