import React from 'react';
import PropTypes from 'prop-types';
import OnBoardingView from './OnBoardingView';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {Keyboard, Alert, View, Text} from 'react-native';
import _ from 'lodash';
import util from '../../util';
import {uploadImage} from '../../actions/GeneralActions';
import {createDriverProfileRequest} from '../../actions/UserActions';
import OpenSettings from 'react-native-open-settings';
import {
  INVALID_NAME_ERROR,
  INVALID_EMAIL_ERROR,
  IMAGE_MAX_WIDTH,
  IMAGE_MAX_HEIGHT,
} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {AppStyles} from '../../theme';
class OnBoardingController extends React.Component {
  constructor(props) {
    super(props);
    let data = props?.data;
    let profile = data?.driver_profile[0];

    this.state = {
      loading: false,
      imagePath: '',
      name: data ? data?.firstName + ' ' + data?.lastName : '',
      homeAddress: {
        description: profile?.homeAddress || '',
        place_id: '',
      },
      emailAddress: data?.email || '',
      image: {},
      error: {},
      num: props.num || '',
    };
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    num: PropTypes.string.isRequired,
  };
  static defaultProps = {};

  onCamPress = () => {
    ImagePicker.openCamera({
      width: IMAGE_MAX_WIDTH,
      height: IMAGE_MAX_HEIGHT,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        // console.log(image);
        this.setState({imagePath: image.path});
      })
      .catch(e => {
        this.setState({error: e});
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
  onSubmit = () => {
    if (!_.isEmpty(this.state.imagePath)) {
      const {imagePath} = this.state;
      const imageFormData = new FormData();
      const photo = {
        uri: imagePath,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      };
      imageFormData.append('tags', 'mobile_upload'); // Optional - add tag for image admin in Cloudinary
      imageFormData.append('upload_preset', 'gxwgoos3');
      imageFormData.append('file', photo);
      util.showLoader(this);

      this.props.uploadImage(imageFormData, (status, newImage = {}) => {
        if (status) {
          const image = {
            public_id: newImage.public_id,
            version: newImage.version,
            height: newImage.height,
            width: newImage.width,
            format: newImage.format,
            bytes: newImage.bytes,
            url: newImage.url,
            secure_url: newImage.secure_url,
          };
          this.setState({image}, () => {
            this.createProfile();
          });
        } else {
          util.hideLoader(this);
        }
      });
    } else {
      util.topAlert('Profile picture is required.');
    }
  };
  createProfile = () => {
    const {emailAddress, image} = this.state;
    const payload = {
      email: emailAddress,
      phone: this.props.num,
      image,
    };

    this.props.createDriverProfileRequest(payload, status => {
      util.hideLoader(this);
      if (status) {
        Actions.reset('dashboard');
      }
    });
  };
  setValue = key => {
    this.setState(key);
  };

  render() {
    const {name, emailAddress, homeAddress, num, loading} = this.state;
    return (
      <OnBoardingView
        {...this.props}
        loading={loading}
        capturePress={this.onCamPress}
        imagePath={this.state.imagePath}
        name={name}
        email={emailAddress}
        num={num}
        homeAddress={homeAddress}
        onSubmit={this.onSubmit}
        updateData={data => this.setValue(data)}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});
const actions = {uploadImage, createDriverProfileRequest};
export default connect(
  mapStateToProps,
  actions,
)(OnBoardingController);
