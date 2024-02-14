import React from 'react';
import PropTypes from 'prop-types';
import HourItemView from './HourItemView';

export default class HourItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <HourItemView {...this.props} />;
  }
}
