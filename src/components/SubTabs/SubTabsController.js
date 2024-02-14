import React from 'react';
import PropTypes from 'prop-types';
import SubTabsView from './SubTabsView';

export default class SubTabsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    tabSelect: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  render() {
    return <SubTabsView {...this.props} />;
  }
}
