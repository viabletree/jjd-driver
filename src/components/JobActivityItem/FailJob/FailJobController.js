import React from 'react';
import PropTypes from 'prop-types';
import FailJobView from './FailJobView';
import util from '../../../util';
import {connect} from 'react-redux';

class FailJobController extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    revertInitial: PropTypes.func.isRequired,
    finalFail: PropTypes.func.isRequired,
    failLoading: PropTypes.bool.isRequired,
    jobInProgress: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  failPress = () => {
    const {jobInProgress} = this.props;
    const currentStopIndex = this.props.jobInProgress.currentStop;
    //change here to disable image
    if (jobInProgress.location[currentStopIndex].localImages.length < 1) {
      util.topAlert('No image captured');
    } else {
      this.props.finalFail(this.state.images);
    }
  };
  render() {
    return <FailJobView {...this.props} failPress={this.failPress} />;
  }
}
const mapStateToProps = ({jobs}) => ({jobInProgress: jobs.jobInProgress});
const actions = {};
export default connect(
  mapStateToProps,
  actions,
)(FailJobController);
