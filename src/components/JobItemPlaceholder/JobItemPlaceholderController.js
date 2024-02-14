import React from "react";
import PropTypes from "prop-types";
import JobItemPlaceholderView from "./JobItemPlaceholderView";

export default class JobItemPlaceholderController extends React.Component {
 constructor(){
 super();
 this.state={}
} 
static propTypes = {};
  static defaultProps = {};
 render() { 
   return <JobItemPlaceholderView {...this.props}/>
 } 
 };