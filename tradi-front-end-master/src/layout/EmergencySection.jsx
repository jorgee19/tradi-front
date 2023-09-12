import React, {Component} from 'react';
import EmergencySelection from './EmergencySelection.jsx'
import EmergencyForm from './EmergencyForm.jsx'

import './EmergencySection.css';

class EmergencySection extends Component{
  state ={
    emergencySelection:0
  }
  render(){
    let showComponent;
    let selectedCss;
    switch(this.state.emergencySelection){
      case 0:
        showComponent = <EmergencySelection handleSelection = {this.handleSelection}/>;
        selectedCss= "emergency-section-selection";
        break;
      case 1:
        showComponent = <EmergencyForm selectedForm={1} schoolId = {this.props.schoolId} back={this.props.handleEmergencyMenu}/>;
        selectedCss= "emergency-section-form form-tradi__scrollable";
        break;
      case 2:
        showComponent = <EmergencyForm selectedForm={2} schoolId = {this.props.schoolId} back={this.props.handleEmergencyMenu}/>;
        selectedCss= "emergency-section-form form-tradi__scrollable";
        break;
      default:
        showComponent = <div> </div>;
    }
    return(
      <React.Fragment>
        <div className={selectedCss}>
          {showComponent}
        </div>
        <div className="overlay-gray" onClick={this.props.handleEmergencyMenu}></div>
      </React.Fragment>
    );
  }
  handleSelection = (value) =>{
    this.setState({emergencySelection:value});
  }
}

export default EmergencySection;
