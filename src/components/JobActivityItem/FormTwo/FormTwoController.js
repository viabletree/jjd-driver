import React from 'react';
import PropTypes from 'prop-types';
import FormTwoView from './FormTwoView';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Keyboard} from 'react-native';
import {updateLocation} from '../../../actions/JobsActions';
import util from '../../../util';
import {
  INVALID_NAME_ERROR,
  FIELD_IS_EMPTY,
  receivers,
} from '../../../constants';
import moment from 'moment';

class FormTwoController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:
        props.item.deliveredTo === receivers.self
          ? props.item.contact_name !== ''
            ? props.item.contact_name
            : '--'
          : '',
      nameError: '',
      house: '',
      houseError: '',
      timeSpent: '00:00:00',
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    stopComplete: PropTypes.func.isRequired,
    passLoading: PropTypes.bool.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {
    if (!this.timer) {
      this.timer = setInterval(this.tick.bind(this), 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  tick() {
    const {item} = this.props;
    let total = 0;

    var date1 = moment();
    let date2 = moment.unix(item.timeSpent);
    total = date1.diff(date2) / 1000;
    const hours = this.zeroPad(Math.floor(total / 3600), 10);
    // const hours = Math.floor(total / 3600);
    const minutes = this.zeroPad(Math.floor((total / 60) % 60), 10);
    // const minutes = Math.floor((total / 60) % 60);
    const seconds = this.zeroPad(Math.abs(Math.floor(total % 60)), 10);
    // const seconds = Math.abs(Math.floor(total % 60));
    this.setState({
      timeSpent: hours + ':' + minutes + ':' + seconds,
    });
  }
  zeroPad(nr, base) {
    var len = String(base).length - String(nr).length + 1;
    return len > 0 ? new Array(len).join('0') + nr : nr;
  }

  back = () => {
    const tempLocation = _.cloneDeep(this.props.item);
    tempLocation.deliveryForm = 0;
    this.props.updateLocation(tempLocation);
  };
  validate = () => {
    const {name, nameError, house, houseError} = this.state;
    this.setState({nameError: '', houseError: ''});
    if (!util.isValidName(name)) {
      this.setState({nameError: INVALID_NAME_ERROR});
      this.nameRef.focus;
      return false;
    }
    if (_.isEmpty(name)) {
      this.setState({nameError: 'Name ' + FIELD_IS_EMPTY});
      this.nameRef.focus;
      return false;
    }
    if (_.isEmpty(house)) {
      this.setState({houseError: 'House# ' + FIELD_IS_EMPTY});

      if (this.props.item.deliveredTo === receivers.neighbor) {
        this.houseRef.focus;
        return false;
      }
    }
    return true;
  };
  submit = () => {
    if (this.validate()) {
      this.props.stopComplete(this.state.house);
    }
  };
  editName = name => {
    this.setState({name});
  };
  editHouse = house => {
    this.setState({house});
  };
  render() {
    const {name, nameError, house, houseError} = this.state;
    return (
      <FormTwoView
        {...this.props}
        back={this.back}
        nameRef={ref => {
          this.nameRef = ref;
        }}
        houseRef={ref => {
          this.houseRef = ref;
        }}
        name={name}
        house={house}
        nameError={nameError}
        houseError={houseError}
        editName={this.editName}
        editHouse={this.editHouse}
        nameSubmit={() => {
          if (this.props.item.deliveredTo !== receivers.self) {
            Keyboard.dismiss();
          }
        }}
        submit={this.submit}
        timeSpent={this.state.timeSpent}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});
const actions = {updateLocation};
export default connect(
  mapStateToProps,
  actions,
)(FormTwoController);
