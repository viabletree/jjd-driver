import React from 'react';
import PropTypes from 'prop-types';
import InstructionsView from './InstructionsView';
import util from '../../../util';
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import {updateLocation} from '../../../actions/JobsActions';

class InstructionsController extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLocation: {},
      timeSpent: '00:00:00',
    };
  }
  async componentDidMount() {
    if (_.isEmpty(this.state.currentLocation)) {
      const location = await util.findCoordinates();
      if (!this.timer) {
        this.timer = setInterval(this.tick.bind(this), 1000);
      }
      this.setState({
        currentLocation: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
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
  static propTypes = {
    item: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  buttonClick = () => {
    const item = _.cloneDeep(this.props.item);
    item.instructionsRead = true;
    this.props.updateLocation(item);
  };
  render() {
    const {timeSpent} = this.state;
    return (
      <InstructionsView
        {...this.props}
        timeSpent={timeSpent}
        buttonClick={this.buttonClick}
      />
    );
  }
}
const mapStateToProps = ({jobs}) => ({jobInProgress: jobs.jobInProgress});
const actions = {updateLocation};
export default connect(
  mapStateToProps,
  actions,
)(InstructionsController);
