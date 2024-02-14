import React from 'react';
import PropTypes from 'prop-types';
import BookingStopsView from './BookingStopsView';
import {connect} from 'react-redux';
import util from '../../util';
import moment from 'moment';
import _ from 'lodash';
class BookingStopsController extends React.Component {
  constructor() {
    super();
    this.state = {
      location: {},
      data: [],
      loading: true,
    };
  }
  static propTypes = {
    job: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  async componentDidMount() {
    this.makeData();
  }
  makeData = async () => {
    let data = [];
    let todayDate = moment();
    const today = !moment(this.props.job.pickup).isAfter(moment(), 'date');
    const tomorrow = !moment(this.props.job.pickup).isAfter(
      moment().add(1, 'days', 'date'),
    );

    let rangeText = ` btw ${moment(this.props.job.pickup).format(
      'hha',
    )} & ${moment(this.props.job.pickup)
      .add(this.props.job.collectionRange, 'hours')
      .format('hha')} `;

    for (let i = 0; i < this.props.job.location.length; i++) {
      const localLocation = this.props.job.location[i];

      const item = {
        des:
          localLocation.street +
          ', ' +
          localLocation.town +
          ', ' +
          localLocation.postcode,
        latitude: localLocation.latitude,
        longitude: localLocation.longitude,
      };
      if (i === 0) {
        data.push({
          title: 'Stop#1',

          postcode: localLocation.postcode,
          info: `${
            localLocation.stairs == 0
              ? 'Ground'
              : util.ordinal_suffix_of(localLocation.stairs)
          } floor, ${localLocation.has_lift ? 'with lift' : 'no lift'}`,
          eta: today
            ? 'Today' + rangeText
            : tomorrow
            ? 'Tom' + rangeText
            : moment(this.props.job.pickup).format('ddd, Do, MMM') + rangeText,

          item,
        });
      } else if (i === this.props.job.location.length - 1) {
        data.push({
          title: 'Dropoff',
          postcode: localLocation.postcode,
          info: `${
            localLocation.stairs == 0
              ? 'Ground'
              : util.ordinal_suffix_of(localLocation.stairs)
          } floor, ${localLocation.has_lift ? 'with lift' : 'no lift'}`,
          item,
        });
      } else {
        data.push({
          title: `Stop#${i + 1}`,
          postcode: localLocation.postcode,
          info: `${
            localLocation.stairs == 0
              ? 'Ground'
              : util.ordinal_suffix_of(localLocation.stairs)
          } floor, ${localLocation.has_lift ? 'with lift' : 'no lift'}`,
          item,
        });
      }
    }

    this.setState({data, loading: false}, () => {
      this.props.callback();
    });
  };

  render() {
    return (
      <BookingStopsView
        {...this.props}
        data={this.state.data}
        loading={this.state.loading}
        accepted={this.props.job.accepted}
        status={this.props.job.status}
      />
    );
  }
}
const mapStateToProps = ({user}) => ({vehicleData: user.vehicleData});
export default connect(mapStateToProps)(BookingStopsController);
