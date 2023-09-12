import React, {Component} from 'react';

class EmergencySelection extends Component{
  render(){
    return(
        <div className="emergency-place-selection">
          <div className="emergency-title"><h4>¿Donde es tu emergencia?</h4></div>
          <div className="emergency-selection-button" onClick={this.clickDentro}>Dentro</div>
          <div className="emergency-selection-button" onClick={this.clickFuera}>Fuera</div>
        </div>
    );
  }
  clickDentro = () => {
    this.props.handleSelection(1);
  }
  clickFuera = () => {
    this.props.handleSelection(2);
  }
}

export default EmergencySelection;
