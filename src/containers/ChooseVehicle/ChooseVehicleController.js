import React from 'react';
import {Keyboard} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {FIELD_IS_EMPTY, CARGO, SELECT_VEHICLE} from '../../constants';
import ChooseVehicleView from './ChooseVehicleView';
import {getVehiclesRequest} from '../../actions/GeneralActions';
import {getVehicleDetailDataRequest} from '../../actions/UserActions';
import util from '../../util';
class ChooseVehicleController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vanRegNumber: '',
      vanRegNumberError: '',
      showRegFiled: false,
      showLoader: true,
      vehicleList: [],
      activeVanSlug: '',
      loading: true,
      btnLoading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    // send the request when page loads
    this.props.getVehiclesRequest(() => {
      this.setState({
        vehicleList: this.props.vehicles,
        loading: false,
      });
    });
  }

  //get the slug of selected vehicle
  checkVanType = vanTypeSlug => {
    //set active slug in state for add active class
    this.setState({
      activeVanSlug: vanTypeSlug,
    });

    //if user select cargo bike then van registration field not show
    if (vanTypeSlug === CARGO) {
      this.setState({
        showRegFiled: false,
        vanRegNumber: null,
        vanRegNumberError: '',
      });
    } else {
      this.setState({
        showRegFiled: true,
      });
    }
  };

  //set registration field value in state
  onChange = regNumber => {
    this.setState({
      vanRegNumber: regNumber,
    });
  };

  //validate van registration number
  _validate = () => {
    const {
      vanRegNumber,
      vanRegNumberError,
      activeVanSlug,
      showRegFiled,
    } = this.state;

    if (activeVanSlug === CARGO) {
      return true;
    }
    //check if filed show then validate
    if (showRegFiled) {
      if (_.isEmpty(vanRegNumber)) {
        // check Van Reg Number is empty
        this.setState({
          vanRegNumberError: FIELD_IS_EMPTY,
        });
        //van reg field empty then focus on field
        this.regTextInput.focus();
        return false;
      }
    }
    return true;
  };

  //on submit
  _onSubmit = () => {
    const {vanRegNumber, activeVanSlug, showRegFiled} = this.state;

    //if user did not select any vehicle then show alert
    if (activeVanSlug === '') {
      util.topAlert(SELECT_VEHICLE);
      return false;
    }

    if (this._validate()) {
      this.setState({
        vanRegNumberError: '',
        btnLoading: true,
      });

      const payload = {reg: vanRegNumber, wheelBase: activeVanSlug};
      this.props.getVehicleDetailDataRequest(payload, success => {
        //button loading false
        this.setState({
          btnLoading: false,
        });
        //keyboard hide on callback
        Keyboard.dismiss();
        //if callback status true then goes to next screen
        if (success) {
          // if selected van is cargo then send to approve screen
          if (activeVanSlug === CARGO) {
            Actions.reset('approval');
          } else {
            Actions.vehicleDetail({selectedVehicle: activeVanSlug});
          }
        }
      });
    }
  };

  render() {
    const {
      showRegFiled,
      vanRegNumber,
      vanRegNumberError,
      activeVanSlug,
      loading,
      btnLoading,
    } = this.state;
    return (
      <ChooseVehicleView
        {...this.props}
        showRegFiled={showRegFiled}
        checkVanType={this.checkVanType}
        vehicleList={this.props.vehicles}
        activeVanSlug={activeVanSlug}
        onSubmit={this._onSubmit}
        onChange={this.onChange}
        vanRegNumber={vanRegNumber}
        vanRegNumberError={vanRegNumberError}
        loading={loading}
        btnLoading={btnLoading}
        txtInputRef={ref => {
          this.regTextInput = ref;
        }}
      />
    );
  }
}
const mapStateToProps = ({general}) => ({
  vehicles: general.vehicles,
});
const actions = {getVehiclesRequest, getVehicleDetailDataRequest};
export default connect(mapStateToProps, actions)(ChooseVehicleController);
