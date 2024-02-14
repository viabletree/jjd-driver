import React from 'react';
import PropTypes from 'prop-types';
import NewJobReceiverView from './NewJobReceiverView';
import util from '../../util';
import {connect} from 'react-redux';
import moment from 'moment';
import {getSingleJobRequest} from '../../actions/JobsActions';

class NewJobReceiverController extends React.Component {
  constructor(props) {
    super(props);
    const notiTime = moment(props.notification_time);
    const maxNotiTime = moment();
    const time_diff = maxNotiTime.diff(notiTime) / 1000;
    let timer = -1;
    timer = props.timeout - time_diff;
    this.state = {
      timer: parseInt(timer),
      setInterval: '',
      loading: true,
      acceptBtn: true,
    };
  }
  static propTypes = {
    delivery_id: PropTypes.number.isRequired,
    notification_time: PropTypes.string.isRequired,
    timeout: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  componentDidMount() {
    this.initialCall();
  }

  initialCall = () => {
    const payload = {
      delivery_id: this.props.delivery_id,
    };
    this.props.getSingleJobRequest(payload, status => {
      util.hideLoader(this);
      if (status) {
        this.timer();
      }
    });
  };

  //set function handleMinusSecond into setInterval and setInterval into state for reference
  timer = () => {
    this.setState({
      setInterval: setInterval(this.handleMinusSecond, 1000),
    });
  };

  //for minus 1 second from minute
  handleMinusSecond = () => {
    if (this.state.timer <= 0) {
      clearInterval(this.state.setInterval);
      util.topAlert('Job expired');
      this.setState({acceptBtn: false});
    } else {
      this.setState({
        timer: this.state.timer - 1,
      });
    }
  };

  render() {
    console.log(this.state.timer);
    //if time is zero then stop

    const {loading, timer, acceptBtn} = this.state;
    console.log({jobDetail12: this.props.jobDetail});
    return (
      <NewJobReceiverView
        {...this.props}
        data={this.props.jobDetail}
        timer={timer}
        loading={loading}
        acceptBtn={acceptBtn}
      />
    );
  }
}

const mapStateToProps = ({jobs}) => ({
  jobDetail: jobs.job,
});
const actions = {getSingleJobRequest};
export default connect(
  mapStateToProps,
  actions,
)(NewJobReceiverController);
