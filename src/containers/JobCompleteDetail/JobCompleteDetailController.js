import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import JobCompleteDetailView from './JobCompleteDetailView';
import {getSingleJobRequest} from '../../actions/JobsActions';

class JobCompleteDetailController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  static propTypes = {
    onBack: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  componentDidMount() {
    // props.id from complete job listing
    const payload = {delivery_id: this.props.id};
    this.props.getSingleJobRequest(payload, () => {
      this.setState({loading: false});
    });
  }

  render() {
    const {loading} = this.state;
    return (
      <JobCompleteDetailView
        {...this.props}
        test={this.test}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = ({jobs}) => ({
  job: jobs.job,
});
const actions = {getSingleJobRequest};
export default connect(mapStateToProps, actions)(JobCompleteDetailController);
