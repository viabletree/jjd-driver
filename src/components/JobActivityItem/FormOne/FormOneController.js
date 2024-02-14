import React from 'react';
import PropTypes from 'prop-types';
import FormOneView from './FormOneView';
import {connect} from 'react-redux';
import {updateLocation} from '../../../actions/JobsActions';
import _ from 'lodash';
import util from '../../../util';
import moment from 'moment';

class FormOneController extends React.Component {
  constructor() {
    super();
    this.state = {
      timeSpent: '00:00:00',
    };
  }
  static propTypes = {item: PropTypes.object.isRequired};
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

  updateImages = images => {
    const tempLocation = _.cloneDeep(this.props.item);
    tempLocation.localImages = images;
    this.props.updateLocation(tempLocation);
  };
  back = () => {
    const tempLocation = _.cloneDeep(this.props.item);
    tempLocation.deliveryForm = -1;
    tempLocation.deliveredTo = '';
    this.props.updateLocation(tempLocation);
  };
  next = () => {
    //change here to disable image upload
    if (this.props.item.localImages.length > 0) {
      // if (true) {
      const tempLocation = _.cloneDeep(this.props.item);
      tempLocation.deliveryForm = 1;
      this.props.updateLocation(tempLocation);
    } else {
      util.topAlert('No image captured');
    }
  };
  render() {
    return (
      <FormOneView
        {...this.props}
        updateImages={this.updateImages}
        back={this.back}
        next={this.next}
        timeSpent={this.state.timeSpent}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});
const actions = {updateLocation};
export default connect(
  mapStateToProps,
  actions,
)(FormOneController);
