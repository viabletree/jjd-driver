import React from 'react';
import PropTypes from 'prop-types';
import MapAlertViewView from './MapAlertViewView';
import {createOpenLink} from 'react-native-open-maps';
import {connect} from 'react-redux';
import {MAP_TYPES, SOMETHING_WRONG} from '../../../constants';
import util from '../../../util';
import {WAZE_BASE_URL} from '../../../config/WebService';
import _ from 'lodash';

class MapAlertViewController extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLocation: {},
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    orderNumber: PropTypes.string.isRequired,
    mapOnClick: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  async componentDidMount() {
    if (_.isEmpty(this.state.currentLocation)) {
      const location = await util.findCoordinates();
      this.setState({
        currentLocation: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    }
  }
  _onNavBtnPress = (provider, startAddress, endAddress) => {
    if (provider === MAP_TYPES.WAZE) {
      // Util.openLinkInBrowser(`${WAZE_BASE_URL}q=${endAddress}`);
      this.props.mapOnClick();

      util.openLinkInBrowser(
        `${WAZE_BASE_URL}ll=${endAddress.latitude},${
          endAddress.longitude
        }&navigate=yes`,
      );
    } else {
      if (startAddress.latitude && startAddress.longitude) {
        const payload = {
          end: `${endAddress.latitude},${endAddress.longitude}`,
          provider,
          ...(startAddress && {
            start: `${startAddress.latitude},${startAddress.longitude}`,
          }),
        };

        const openYosemite = createOpenLink(payload);
        this.props.mapOnClick();
        openYosemite();
      } else {
        util.topAlert(SOMETHING_WRONG);
      }
    }
  };
  render() {
    return (
      <MapAlertViewView
        {...this.props}
        onNavBtnPress={this._onNavBtnPress}
        currentLocation={this.state.currentLocation}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});
const actions = {};
export default connect(
  mapStateToProps,
  actions,
)(MapAlertViewController);
