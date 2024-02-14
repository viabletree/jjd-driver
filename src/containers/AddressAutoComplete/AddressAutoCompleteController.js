import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLocations} from '../../actions/UserActions';
import AddressAutoCompleteView from './AddressAutoCompleteView';
import util from '../../util';
import {ERROR_SOMETHING_WENT_WRONG} from '../../config/WebService';

class AddressAutoCompleteController extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      locations: [],
      loading: false,
    };
  }
  static propTypes = {
    onItemSelect: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  getLocations = text => {
    this.setState({text});
    if (text.length >= 2) {
      const payload = {
        line: text,
      };
      util.showLoader(this);
      this.props.getLocations(payload, (status, locations) => {
        util.hideLoader(this);

        if (status) {
          console.log({upperTextUp: text});
          if (this.state.text.length >= 2) {
            console.log({upperText: this.state.text});
            this.setState({locations});
          }
        } else {
          util.topAlert(ERROR_SOMETHING_WENT_WRONG);
        }
      });
    } else {
      console.log({text});
      this.setState({text, locations: []});
    }
  };
  clearText = () => {
    this.setState({text: '', locations: []});
  };
  render() {
    const {locations, loading, text} = this.state;
    return (
      <AddressAutoCompleteView
        {...this.props}
        getLocations={this.getLocations}
        locations={locations}
        clearText={this.clearText}
        loading={loading}
        text={text}
      />
    );
  }
}
const mapStateToPros = ({}) => ({});
const actions = {getLocations};
export default connect(
  mapStateToPros,
  actions,
)(AddressAutoCompleteController);
