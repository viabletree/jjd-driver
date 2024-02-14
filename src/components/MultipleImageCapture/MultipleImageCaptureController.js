import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MultipleImageCaptureView from './MultipleImageCaptureView';
import {IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT} from '../../constants';
import {connect} from 'react-redux';
import {uploadImage} from '../../actions/GeneralActions';
import {updateJobInProgress} from '../../actions/JobsActions';
import util from '../../util';
import OpenSettings from 'react-native-open-settings';

class MultipleImageCaptureController extends React.Component {
  constructor(props) {
    super(props);
    const imagePath = [];
    const currentStop =
      props.jobInProgress.location[props.jobInProgress.currentStop];
    currentStop.localImages.forEach(element => {
      imagePath.push(element.url);
    });

    this.state = {
      iteration: 3,
      imagePath,
      uploadedImages: [],
      loading: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {jobInProgress} = nextProps;
    const {imagePath} = prevState;
    const currentStopIndex = jobInProgress.currentStop;
    if (
      jobInProgress.location[currentStopIndex].localImages.length !=
      imagePath.length
    ) {
      const imagePath = [];
      const currentStop = jobInProgress.location[currentStopIndex];
      currentStop.localImages.forEach(element => {
        imagePath.push(element.url);
      });
      return {imagePath};
    } else {
      return null;
    }
  }
  static propTypes = {
    jobInProgress: PropTypes.object.isRequired,
    updateJobInProgress: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  handlePressImagePicker = index => {
    ImagePicker.openCamera({
      width: IMAGE_MAX_WIDTH,
      height: IMAGE_MAX_HEIGHT,
      compressImageQuality: 0.7,
    })
      .then(image => {
        util.showLoader(this);
        //image upload start
        const imageFormData = new FormData();
        const photo = {
          uri: image.path,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        };
        imageFormData.append('tags', 'mobile_upload'); // Optional - add tag for image admin in Cloudinary
        imageFormData.append('upload_preset', 'gxwgoos3');
        imageFormData.append('file', photo);
        util.showLoader(this);
        this.props.uploadImage(imageFormData, (status, newImage = {}) => {
          if (status) {
            util.hideLoader(this);
            //this.props.returnImages(uploadedImages);
            const tempJobInProg = _.cloneDeep(this.props.jobInProgress);
            const currentStopIndex = tempJobInProg.currentStop;

            tempJobInProg.location[currentStopIndex].localImages.push(newImage);
            this.props.updateJobInProgress(tempJobInProg);
          }
        });
        //image upload end
      })
      .catch(e => {
        if (
          (e.code && e.code === 'E_PERMISSION_MISSING') ||
          e.code === 'E_PICKER_NO_CAMERA_PERMISSION'
        ) {
          Alert.alert(
            'Permission Required',
            'Please allow this app to use your camera.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  OpenSettings.openSettings();
                },
              },
              {
                text: 'Cancle',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
        console.log(e);
      });
  };

  removeImage = index => {
    const tempJobInProg = _.cloneDeep(this.props.jobInProgress);
    const currentStopIndex = tempJobInProg.currentStop;
    tempJobInProg.location[currentStopIndex].localImages.splice(index, 1);
    this.props.updateJobInProgress(tempJobInProg);
  };
  render() {
    return (
      <MultipleImageCaptureView
        {...this.props}
        iteration={this.state.iteration}
        handlePressImagePicker={this.handlePressImagePicker}
        imagePath={this.state.imagePath}
        loading={this.state.loading}
        removeImage={this.removeImage}
      />
    );
  }
}
const mapStateToProps = ({jobs}) => ({jobInProgress: jobs.jobInProgress});
const actions = {uploadImage, updateJobInProgress};
export default connect(
  mapStateToProps,
  actions,
)(MultipleImageCaptureController);
