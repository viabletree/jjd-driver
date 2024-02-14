import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import JobSummaryView from './JobSummaryView';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';
import util from '../../util';
import {acceptJobRequest} from '../../actions/JobsActions';

class JobSummaryController extends React.Component {
  constructor() {
    super();
    this.state = {
      helperTitle: '',
      helperSubeTitle: '',
      yesBtnLoader: false,
      acceptBtnLoading: false,
    };
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    extraScroll: PropTypes.bool,
  };
  static defaultProps = {
    extraScroll: false,
  };

  //on press accept job
  acceptPress = id => {
    if (this.props.data.vehicle.max_helper > 1) {
      // bottom sheet open
      this.setState({
        helperTitle: 'Helper required',
        helperSubeTitle: 'Do you have a helper to do the job',
      });
      this.RBSheet.open();
    } else {
      util.showLoader(this);
      this.setState({
        acceptBtnLoading: true,
      });
      const payload = {
        delivery_id: id,
      };
      this.props.acceptJobRequest(payload, status => {
        util.hideLoader(this);
        this.setState({
          acceptBtnLoading: false,
        });
        if (status) {
          Actions.jump('accepted_jobs');
        }
      });
    }
  };

  //if user press yes
  handlePressOnYes = id => {
    this.setState({
      yesBtnLoader: true,
    });
    const payload = {
      delivery_id: id,
    };
    this.props.acceptJobRequest(payload, status => {
      this.RBSheet.close();
      util.hideLoader(this);
      this.setState({
        yesBtnLoader: false,
      });
      if (status) {
        Actions.jump('accepted_jobs');
      }
    });
  };

  //if user press cancel
  handlePressOnCancle = () => {
    this.RBSheet.close();
  };

  render() {
    const {
      helperTitle,
      helperSubeTitle,
      yesBtnLoader,
      acceptBtnLoading,
    } = this.state;
    return (
      <JobSummaryView
        {...this.props}
        acceptPress={this.acceptPress}
        bottomSheetRef={ref => {
          this.RBSheet = ref;
        }}
        handlePressOnYes={this.handlePressOnYes}
        handlePressOnCancle={this.handlePressOnCancle}
        helperTitle={helperTitle}
        helperSubeTitle={helperSubeTitle}
        yesBtnLoader={yesBtnLoader}
        acceptBtnLoading={acceptBtnLoading}
      />
    );
  }
}

const mapStateToProps = () => ({});
const actions = {acceptJobRequest};
export default connect(
  mapStateToProps,
  actions,
)(JobSummaryController);
