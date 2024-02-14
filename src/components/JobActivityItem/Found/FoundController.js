import React from 'react';
import PropTypes from 'prop-types';
import FoundView from './FoundView';
import moment from 'moment';
import util from '../../../util';

export default class FoundController extends React.Component {
  constructor() {
    super();
    this.state = {
      timeSpent: '00:00:00',
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    initialFail: PropTypes.func.isRequired,
    setDeliveredTo: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {
    if (!this.timer) {
      this.timer = setInterval(this.tick.bind(this), 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  tick() {
    const {item} = this.props;
    let total = 0;

    var date1 = moment();
    let date2 = moment.unix(item.timeSpent);
    total = date1.diff(date2) / 1000;
    const hours = this.zeroPad(Math.floor(total / 3600), 10);
    // const hours = Math.floor(total / 3600);
    const minutes = this.zeroPad(Math.floor((total / 60) % 60), 10);
    // const minutes = Math.floor((total / 60) % 60);
    const seconds = this.zeroPad(Math.abs(Math.floor(total % 60)), 10);
    // const seconds = Math.abs(Math.floor(total % 60));
    this.setState({
      timeSpent: hours + ':' + minutes + ':' + seconds,
    });
  }
  zeroPad(nr, base) {
    var len = String(base).length - String(nr).length + 1;
    return len > 0 ? new Array(len).join('0') + nr : nr;
  }
  render() {
    const {timeSpent} = this.state;
    return <FoundView {...this.props} timeSpent={timeSpent} />;
  }
}
