import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CompleteJobListingView from './CompleteJobListingView';
import {completeJobsRequest} from '../../../actions/JobsActions';
import {Actions} from 'react-native-router-flux';

const LIMIT = 10;
class CompleteJobListingController extends React.Component {
  constructor() {
    super();
    this.state = {
      hasLoadMore: false,
      loadingData: true,
      isFetching: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    //complete jobs listing request
    const payload = {limit: LIMIT, page: 1};
    this.props.completeJobsRequest(payload, () => {
      this.updateLoadMoreState();
      this.setState({
        loadingData: false,
      });
    });
  }

  updateLoadMoreState = () => {
    if (this.props.completeJobsListing.length > 0) {
      if (this.props.completeJobsListing.length % LIMIT === 0) {
        // Server has more data, show load more
        this.setState({
          hasLoadMore: true,
        });
      } else {
        this.setState({
          hasLoadMore: false,
        });
      }
    } else {
      this.setState({
        hasLoadMore: false,
      });
    }
  };

  //load more data
  _loadMoreListData = () => {
    if (this.state.hasLoadMore) {
      //request
      const payload = {
        limit: LIMIT,
        page: this.props.completeJobsListing.length / LIMIT,
      };
      this.props.completeJobsRequest(payload, () => {
        this.updateLoadMoreState();
      });
    }
  };
  _itemClick = item_id => {
    Actions.JobCompleteDetail({
      id: item_id,
      CompleteJob: true,
    });
    this.props.jobCompleteItemClick();
  };

  onRefresh = () => {
    const payload = {limit: LIMIT, page: 1};
    this.setState({isFetching: true});
    this.props.completeJobsRequest(payload, () => {
      this.setState({
        isFetching: false,
      });
    });
  };

  render() {
    const {hasLoadMore, loadingData, isFetching} = this.state;

    return (
      <CompleteJobListingView
        {...this.props}
        completeJobsListing={this.props.completeJobsListing}
        loadMoreListData={this._loadMoreListData}
        hasLoadMore={hasLoadMore}
        loadingData={loadingData}
        isFetching={isFetching}
        onRefresh={this.onRefresh}
        itemClick={this._itemClick}
      />
    );
  }
}

const mapStateToProps = ({jobs}) => ({
  completeJobsListing: jobs.completeJobsListing,
});
const actions = {
  completeJobsRequest,
};
export default connect(
  mapStateToProps,
  actions,
)(CompleteJobListingController);
