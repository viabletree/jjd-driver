import React from 'react';
import PropTypes from 'prop-types';
import SwitchItemView from './SwitchItemView';

export default class SwitchItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <SwitchItemView {...this.props} />;
  }
}
