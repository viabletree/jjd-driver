import React from 'react';
import PropTypes from 'prop-types';
import StopInstructionView from './StopInstructionView';
import {LOCATION} from '../../constants';

export default class StopInstructionController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <StopInstructionView {...this.props} location={LOCATION} />;
  }
}
