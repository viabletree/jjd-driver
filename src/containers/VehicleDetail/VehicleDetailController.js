import React from 'react';
import PropTypes from 'prop-types';
import VehicleDetailView from './VehicleDetailView';
import _ from 'lodash';
import {connect} from 'react-redux';
// import {vehicleTypes} from '../../constants';
import {getVehiclesRequest} from '../../actions/GeneralActions';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {LUTON, LONG} from '../../constants';

class VehicleDetailController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {index: 0, vehicles: [], loading: true};
  }
  static propTypes = {
    vehicleDetails: PropTypes.object.isRequired,
    selectedVehicle: PropTypes.string.isRequired,
  };
  static defaultProps = {};
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      vehicles,
      vehicleTypeId,
      vehicleDetails,
      selectedVehicle,
    } = nextProps;

    let arrSize = vehicles.length - 1;
    let ind = 0;
    let tempArr = [];
    if (vehicles.length > 0) {
      ind = _.findIndex(vehicles, {slug: selectedVehicle});

      if (ind === arrSize) {
        for (let x = 0; x < 3; x++) {
          tempArr.push(vehicles[ind - x]);
        }
      } else if (ind === 0) {
        for (let x = 0; x < 3; x++) {
          tempArr.push(vehicles[x]);
        }
      } else {
        tempArr.push(vehicles[ind]);
        tempArr.push(vehicles[ind + 1]);
        tempArr.push(vehicles[ind - 1]);
      }
      tempArr.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    return {index: ind, vehicles: tempArr};
  }
  componentDidMount() {
    if (this.props.vehicles.length < 1) {
      this.props.getVehiclesRequest(() => {
        util.hideLoader(this);
      });
    }
  }
  onSubmit = () => {
    const {vehicleDetails, selectedVehicle} = this.props;
    if (selectedVehicle === LUTON || selectedVehicle === LONG) {
      Actions.additionalVehicleInfo({
        vehicles: this.state.vehicles,
        wheelBase: this.props.vehicleDetails.wheelBase,
        selectedVehicle,
      });
    } else {
      //is old user is already verify
      if (this.props.user.is_verified) {
        Actions.reset('dashboard');
      } else {
        Actions.reset('approval');
      }
    }
  };

  render() {
    const {index, vehicles} = this.state;

    return (
      <VehicleDetailView
        {...this.props}
        index={index}
        vehicles={vehicles}
        onSubmit={this.onSubmit}
      />
    );
  }
}
const mapStateToProps = ({user, general}) => ({
  vehicleDetails: user.data.vehicle,
  vehicles: general.vehicles,
  user: user.data,
});
const actions = {getVehiclesRequest};
export default connect(mapStateToProps, actions)(VehicleDetailController);
