import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TabbarView from './TabbarView';
import {setSelectedTab} from '../../actions/GeneralActions';
import {Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

const tabsData = [
  {
    name: 'Search Jobs',
    image: Images.tab_search,
    selectedImage: Images.tab_search_selected,
    onPress: () => Actions.jump('available_jobs'),
  },
  {
    name: 'Accepted Jobs',
    image: Images.tab_jobs,
    selectedImage: Images.tab_jobs_selected,
    onPress: () => Actions.jump('accepted_jobs'),
  },
  {
    name: 'Availability',
    image: Images.tab_availability,
    selectedImage: Images.tab_availability_selected,
    onPress: () => Actions.jump('availability'),
  },
  {
    name: 'Profile',
    image: Images.tab_profile,
    selectedImage: Images.tab_profile_selected,
    onPress: () => Actions.jump('profile'),
  },
];
class TabbarController extends React.Component {
  constructor() {
    super();
    this.state = {
      showAvailabilityMark: true,
      showCounter: true,
    };
  }
  static propTypes = {
    selectedTab: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
    lastAvailabilityVisit: PropTypes.number.isRequired,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const {lastAvailabilityVisit, availableJobsUpcoming} = nextProps;
    let showAvailabilityMark = true;
    let showCounter = true;
    if (lastAvailabilityVisit != -1) {
      const lastVisit = moment.unix(lastAvailabilityVisit);
      const today = moment();
      const isSame = lastVisit.isSame(today, 'day');
      showAvailabilityMark = !isSame;
    }
    if (availableJobsUpcoming.length < 1) {
      showCounter = false;
    }
    return {showAvailabilityMark, showCounter};
  }
  componentDidMount() {
    const {lastAvailabilityVisit, availableJobsUpcoming} = this.props;
    let showAvailabilityMark = true;
    let showCounter = true;
    if (lastAvailabilityVisit != -1) {
      const lastVisit = moment.unix(lastAvailabilityVisit);
      const today = moment();
      const isSame = lastVisit.isSame(today, 'day');
      showAvailabilityMark = !isSame;
    }
    if (availableJobsUpcoming.length < 1) {
      showCounter = false;
    }
    this.setState({showAvailabilityMark, showCounter});
  }
  onTabSelect = index => {
    this.props.setSelectedTab(index);
  };
  static defaultProps = {};
  render() {
    const {showAvailabilityMark, showCounter} = this.state;
    return (
      <TabbarView
        {...this.props}
        onTabSelect={this.onTabSelect}
        tabData={tabsData}
        showAvailabilityMark={showAvailabilityMark}
        showCounter={showCounter}
      />
    );
  }
}
const mapStateToProps = ({general, jobs}) => ({
  selectedTab: general.selectedTab,
  lastAvailabilityVisit: general.lastAvailabilityVisit,
  availableJobsUpcoming: jobs.availableJobsUpcoming,
});
const actions = {setSelectedTab};
export default connect(
  mapStateToProps,
  actions,
)(TabbarController);
