import React from 'react';
import PropTypes from 'prop-types';
import OnlineSelectorView from './OnlineSelectorView';
import _ from 'lodash';
import moment from 'moment';

export default class OnlineSelectorController extends React.Component {
  constructor() {
    super();
    const roundedUp = Math.ceil(moment().minute() / 15) * 15;
    let newTime = moment()
      .minute(roundedUp)
      .second(0);
    let start = newTime.format('HH:mm');
    newTime.add(1, 'hour');
    let end = newTime.format('HH:mm');
    // console.log({start, end});
    let unavailableMessage = `${start} till ${end}`;
    this.state = {
      data: [
        {title: '1', selected: true},
        {title: '2', selected: false},
        {title: '3', selected: false},
        {title: '4', selected: false},
        {title: '6', selected: false},
        {title: '8', selected: false},
      ],
      unavailableMessage,
      start,
      end,
    };
  }
  static propTypes = {
    cancelCallback: PropTypes.func.isRequired,
    goUnavailable: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  onItemClick = position => {
    const tempData = _.cloneDeep(this.state.data);
    tempData.forEach((element, index) => {
      if (index === position) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
    const roundedUp = Math.ceil(moment().minute() / 15) * 15;
    let newTime = moment()
      .minute(roundedUp)
      .second(0);
    let start = newTime.format('HH:mm');
    newTime.add(tempData[position].title, 'hours');
    let end = newTime.format('HH:mm');
    let unavailableMessage = `${start} till ${end}`;
    this.setState({data: tempData, unavailableMessage, start, end});
  };
  onDone = () => {
    const {start, end} = this.state;
    let offHours = -1;
    this.state.data.forEach(element => {
      if (element.selected) {
        offHours = element.title;
      }
    });
    this.props.goUnavailable({
      message: this.state.unavailableMessage,
      offHours,
      start,
      end,
    });
  };
  render() {
    return (
      <OnlineSelectorView
        {...this.props}
        data={this.state.data}
        onItemClick={this.onItemClick}
        unavailableMessage={this.state.unavailableMessage}
        onDone={this.onDone}
      />
    );
  }
}
