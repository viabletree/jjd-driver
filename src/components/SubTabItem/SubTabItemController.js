import React from 'react';
import PropTypes from 'prop-types';
import SubTabItemView from './SubTabItemView';

export default class SubTabItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    tabSelect: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  render() {
    return <SubTabItemView {...this.props} />;
  }
}
