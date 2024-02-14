import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AdditionalVehicleInfoView from './AdditionalVehicleInfoView';
import {setAdditionalVehicleDataRequest} from '../../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {LUTON, LONG} from '../../constants';

class AdditionalVehicleInfoController extends React.Component {
  constructor() {
    super();
    this.state = {
      tailLift: false,
      lowLoader: false,
      sideCurtains: false,
      lwb: false,
      xlwb: false,
      lutonVanDisable: false,
      largeVanDisable: false,
      loading: false,
    };
  }
  static propTypes = {
    vehicles: PropTypes.array.isRequired,
    wheelBase: PropTypes.string.isRequired,
  };
  static defaultProps = {};

  componentDidMount(props) {
    //check if van is long then disable luton switches
    const {selectedVehicle} = this.props;
    if (selectedVehicle === LONG) {
      this.setState({
        lutonVanDisable: true,
      });
    }
    //check if van is luton then disable long switches
    if (selectedVehicle === LUTON) {
      this.setState({
        largeVanDisable: true,
      });
    }
  }
  onSwitchChange = data => {
    if (data === 'tailLift') {
      this.setState({
        lowLoader: false,
      });
    }
    if (data === 'lowLoader') {
      this.setState({
        tailLift: false,
      });
    }
    this.setState(previousState => {
      return {[data]: !previousState[data]};
    });
    return false;

    // if (data != 'sideCurtains') {
    //   const {tailLift, lowLoader} = this.state;
    //   let tl = false;
    //   let ll = false;
    //   if (data === 'tailLift') {
    //     tl = tailLift ? false : true;
    //     ll = lowLoader ? false : lowLoader;
    //   } else {
    //     ll = lowLoader ? false : true;
    //     tl = tailLift ? false : tailLift;
    //   }
    //   this.setState({tailLift: tl, lowLoader: ll});
    // } else {
    //   this.setState(previousState => {
    //     return {[data]: !previousState[data]};
    //   });
    // }
  };

  //atleast select one
  validate = () => {
    const {tailLift, lowLoader, sideCurtains, lwb, xlwb} = this.state;
    //if user not select any option then return false
    if (tailLift || lowLoader || sideCurtains || lwb || xlwb) {
      return true;
    }
    return false;
  };

  onSubmit = () => {
    const {tailLift, lowLoader, sideCurtains, lwb, xlwb} = this.state;

    if (this.validate()) {
      this.setState({
        loading: true,
      });
      const payload = {
        tailLift,
        lowLoader,
        sideCurtains,
        lwb,
        xlwb,
      };
      this.props.setAdditionalVehicleDataRequest(payload, status => {
        this.setState({
          loading: false,
        });
        if (status) {
          //is old user is already verify
          if (this.props.user.is_verified) {
            Actions.reset('dashboard');
          } else {
            Actions.reset('approval');
          }
        }
      });
    } else {
      util.topAlert('Please select any option');
    }
  };
  render() {
    const {
      tailLift,
      lowLoader,
      sideCurtains,
      lwb,
      xlwb,
      lutonVanDisable,
      largeVanDisable,
      loading,
    } = this.state;
    return (
      <AdditionalVehicleInfoView
        {...this.props}
        tailLift={tailLift}
        lowLoader={lowLoader}
        sideCurtains={sideCurtains}
        lwb={lwb}
        xlwb={xlwb}
        onSwitchChange={this.onSwitchChange}
        onSubmit={this.onSubmit}
        largeVanDisable={largeVanDisable}
        lutonVanDisable={lutonVanDisable}
        loading={loading}
      />
    );
  }
}
const mapStateToProps = ({user}) => ({
  user: user.data,
});
const actions = {setAdditionalVehicleDataRequest};
export default connect(
  mapStateToProps,
  actions,
)(AdditionalVehicleInfoController);
