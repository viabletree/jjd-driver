import React from 'react';
import PropTypes from 'prop-types';
import CompleteJobItemView from './CompleteJobItemView';

export default class CompleteJobItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <CompleteJobItemView {...this.props} />;
  }
}
