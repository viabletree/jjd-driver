import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AcceptedJobsView from './AcceptedJobsView';
import {
  getAcceptedUpcomingJobsRequest,
  completeJobsRequest,
} from '../../actions/JobsActions';
import {setSelectedTab} from '../../actions/GeneralActions';
import util from '../../util';
import _ from 'lodash';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';

class AcceptedJobsController extends React.Component {
  constructor() {
    super();
    this.state = {
      toDetail: false,
      rawData: [],
      upcomingData: [],
      loading: true,
      lastSelected: 0,
      tabs: [
        {id: 0, title: 'Upcoming', selected: true},
        {id: 1, title: 'Completed', selected: false},
      ],
      completeJobsLoader: true,
      completeJobLimit: 1,
      completeJobPage: 1,
    };
    AcceptedJobsController.instance = this;
  }
  static onExit() {
    if (AcceptedJobsController.instance) {
      AcceptedJobsController.instance._onExit();
    }
  }

  static onEnter() {
    if (AcceptedJobsController.instance) {
      AcceptedJobsController.instance._onEnter();
    }
  }
  _onExit() {}

  _onEnter() {
    this.props.setSelectedTab(1);
    const tabs = [
      {id: 0, title: 'Upcoming', selected: true},
      {id: 1, title: 'Completed', selected: false},
    ];
    if (this.state.toDetail) {
      this.setState({toDetail: false});
    } else {
      this.setState({
        tabs,
        lastSelected: 0,
      });
    }

    this.getData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(
    //   nextProps.availableJobsUpcoming.length,
    //   prevState.rawData.length,
    // );

    let upcomingData = util.jobSectionByDate(nextProps.availableJobsUpcoming);
    // upcomingData = [];

    return {upcomingData, rawData: nextProps.availableJobsUpcoming};
  }
  static propTypes = {
    getAcceptedUpcomingJobsRequest: PropTypes.func.isRequired,
    availableJobsUpcoming: PropTypes.array.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    util.showLoader(this);
    this.props.getAcceptedUpcomingJobsRequest(status => {
      util.hideLoader(this);
    });
  };
  onTabSelect = index => {
    const {tabs, lastSelected} = this.state;
    tabs[lastSelected].selected = false;
    tabs[index].selected = true;
    this.setState({tabs, lastSelected: index, page: 1}, () => {
      console.log(this.state);
    });
  };
  _jobCompleteItemClick = () => {
    this.setState({toDetail: true});
  };

  render() {
    const {tabs, loading, upcomingData} = this.state;
    return (
      <AcceptedJobsView
        {...this.props}
        tabs={tabs}
        tabSelect={this.onTabSelect}
        loading={loading}
        upcomingData={upcomingData}
        getData={this.getData}
        jobCompleteItemClick={this._jobCompleteItemClick}
      />
    );
  }
}

const mapStateToProps = ({jobs}) => ({
  availableJobsUpcoming: jobs.availableJobsUpcoming,
  onJob: jobs.onJob,
  jobInProgress: jobs.jobInProgress,
});
const actions = {
  getAcceptedUpcomingJobsRequest,
  setSelectedTab,
};
export default connect(
  mapStateToProps,
  actions,
)(AcceptedJobsController);
