import React from 'react';
import PropTypes from 'prop-types';
import ApprovalView from './ApprovalView';

export default class ApprovalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <ApprovalView {...this.props} />;
  }
}
