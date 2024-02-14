import React from 'react';
import PropTypes from 'prop-types';
import JobActivityItemView from './JobActivityItemView';
import FabStyles from '../Fab/FabStyles';
import {LOCATION} from '../../constants';
import {connect} from 'react-redux';
import {
  updateLocation,
  updateJobInProgress,
  stopCompleteRequest,
  arrivedDestinationRequest,
} from '../../actions/JobsActions';
import {uploadImage} from '../../actions/GeneralActions';
import _ from 'lodash';
import moment from 'moment';
import util from '../../util';

class JobActivityItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      showListingDetail: props.location.showListingDetail,
      isImageModalShow: false,
      selectedImgIndex: 0,
      foundLocation: props.location.foundLocation,
      failLoading: false,
      passLoading: false,
      jobCompleted: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      location: nextProps.location,
      showListingDetail: nextProps.location.showListingDetail,
      foundLocation: nextProps.location.foundLocation,
      jobCompleted: nextProps.jobInProgress.completed,
    };
  }
  static propTypes = {
    location: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    orderNumber: PropTypes.string.isRequired,
    jobInProgress: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  componentDidUpdate() {}
  componentDidMount() {
    const finalSheetRef = {};
    finalSheetRef.open = () => {
      console.log('open');
    };
    this.finalSheetRef = finalSheetRef;
    if (this.props.location.instructionsRead) {
      if (this.locationSheetRef) {
        this.locationSheetRef.open();
      }
    }
  }
  handlePressShowDetail = () => {
    this.setState({
      showListingDetail: true,
    });
  };

  handlePressShowImageModal = slectedIndex => {
    this.setState({
      isImageModalShow: true,
      selectedImgIndex: slectedIndex,
    });
  };

  handlePressHideImageModal = () => {
    this.setState({
      isImageModalShow: false,
    });
  };
  startClick = () => {
    const tempLocation = _.cloneDeep(this.props.location);
    tempLocation.showFind = true;
    this.props.updateLocation(tempLocation);

    this.mapSheetRef.open();
  };
  findLocationClick = async found => {
    const tempLocation = _.cloneDeep(this.props.location);
    const currentLocation = await util.findCoordinates();
    const payload = {
      current_lat: currentLocation.latitude,
      current_long: currentLocation.longitude,
      delivery_id: this.props.jobInProgress.delivery,
      destination_id: tempLocation.dest_id,
    };
    this.props.arrivedDestinationRequest(payload, status => {
      if (status) {
        tempLocation.foundLocation = found;
        if (tempLocation.timeSpent < 0) {
          tempLocation.timeSpent = moment().unix();
        }
        this.props.updateLocation(tempLocation);
        this.setState({foundLocation: found}, () => {
          this.locationSheetRef.open();
        });
      }
    });
  };
  mapClick = () => {
    this.mapSheetRef.close();
  };
  initialFail = () => {
    const tempLocation = _.cloneDeep(this.props.location);
    tempLocation.initialFail = true;
    this.props.updateLocation(tempLocation);
  };
  revertInitialFail = () => {
    const tempLocation = _.cloneDeep(this.props.location);
    tempLocation.initialFail = false;
    this.props.updateLocation(tempLocation);
  };
  resetFlags = () => {
    const tempLocation = _.cloneDeep(this.props.location);
    tempLocation.initialFail = false;
    tempLocation.foundLocation = false;
    this.props.updateLocation(tempLocation);
  };
  hideMainSheet = () => {
    this.locationSheetRef.close();
  };
  setDeliveredTo = data => {
    const tempLocation = _.cloneDeep(this.props.location);
    tempLocation.deliveredTo = data;
    tempLocation.deliveryForm = 0;
    this.props.updateLocation(tempLocation);
  };
  finalFail = async imagesData => {
    const {location} = this.props;
    this.setState({failLoading: true});
    const currentLocation = await util.findCoordinates();
    const payload = {
      delivery_id: this.props.delivery,

      is_success: false,
      is_completed: true,
      destination_id: location.dest_id,
      fail_reason: location.foundLocation
        ? 'Can’t deliver anywhere'
        : 'Location not found',
      delivered_to: '',
      images: location.localImages,
      delivered_house: '',
      start_time: moment.unix(location.timeSpent).format('YYYY-MM-DD HH:mm:ss'),
      end_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      duration_seconds: moment().diff(
        moment.unix(location.timeSpent),
        'seconds',
      ),
    };

    this.props.stopCompleteRequest(payload, status => {
      this.setState({failLoading: false});
      if (status) {
        //this.hideMainSheet();
        if (this.props.jobInProgress.completed) {
          if (this.finalSheetRef) {
            this.finalSheetRef.open();
          }
        }
      }
    });
  };
  stopComplete = async house => {
    const {location} = this.props;
    this.setState({passLoading: true});
    const currentLocation = await util.findCoordinates();
    const payload = {
      delivery_id: this.props.delivery,

      is_success: true,
      is_completed: true,
      destination_id: location.dest_id,
      fail_reason: '',
      delivered_to: location.deliveredTo,
      images: location.localImages,
      delivered_house: house,
      start_time: moment.unix(location.timeSpent).format('YYYY-MM-DD HH:mm:ss'),
      end_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      duration_seconds: moment().diff(
        moment.unix(location.timeSpent),
        'seconds',
      ),
    };

    this.props.stopCompleteRequest(payload, status => {
      this.setState({passLoading: false});
      if (status) {
        if (this.mapStateToProps) this.hideMainSheet();
        if (this.props.jobInProgress.completed) {
          if (this.finalSheetRef) {
            this.finalSheetRef.open();
          }
        }
      }
    });
  };
  render() {
    const images = [
      {
        url: LOCATION.images[0].secure_url,
      },
      {
        url: LOCATION.images[0].secure_url,
      },
      {
        url: LOCATION.images[0].secure_url,
      },
    ];
    const {
      showListingDetail,
      isImageModalShow,
      selectedImgIndex,
      failLoading,
      passLoading,
    } = this.state;
    console.log('jobInProgress');
    console.log(JSON.stringify(this.props.jobInProgress));
    return (
      <JobActivityItemView
        {...this.props}
        handlePressShowDetail={this.handlePressShowDetail}
        showListingDetail={showListingDetail}
        images={images}
        handlePressShowImageModal={this.handlePressShowImageModal}
        isImageModalShow={isImageModalShow}
        handlePressHideImageModal={this.handlePressHideImageModal}
        selectedImgIndex={selectedImgIndex}
        mapSheetRef={ref => {
          this.mapSheetRef = ref;
        }}
        finalSheetRef={ref => {
          this.finalSheetRef = ref;
        }}
        locationSheetRef={ref => {
          this.locationSheetRef = ref;
        }}
        startClick={this.startClick}
        mapClick={this.mapClick}
        findLocationClick={this.findLocationClick}
        initialFail={this.initialFail}
        finalFail={this.finalFail}
        revertInitialFail={this.revertInitialFail}
        resetFlags={this.resetFlags}
        hideMainSheet={this.hideMainSheet}
        failLoading={failLoading}
        setDeliveredTo={this.setDeliveredTo}
        stopComplete={this.stopComplete}
        passLoading={passLoading}
      />
    );
  }
}
const mapStateToProps = ({jobs}) => ({
  jobInProgress: jobs.jobInProgress,
  onJob: jobs.onJob,
});
const actions = {
  updateLocation,
  updateJobInProgress,
  uploadImage,
  stopCompleteRequest,
  arrivedDestinationRequest,
};
export default connect(
  mapStateToProps,
  actions,
)(JobActivityItemController);
