import React from 'react';
import PropTypes from 'prop-types';
import PerformJobView from './PerformJobView';
import {connect} from 'react-redux';

class PerformJobController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    jobInProgress: PropTypes.object.isRequired,
    onJob: PropTypes.bool.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {}

  render() {
    console.log('perform job');
    return <PerformJobView {...this.props} />;
  }
}
const mapStateToProps = ({jobs}) => ({
  onJob: jobs.onJob,
  jobInProgress: jobs.jobInProgress,
});
const actions = {};
export default connect(mapStateToProps, actions)(PerformJobController);
