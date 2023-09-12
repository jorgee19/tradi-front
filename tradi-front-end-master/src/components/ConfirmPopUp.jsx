import React,{Component} from 'react';

import './ConfirmPopUp.css'

class ConfirmPopUp extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="confirm-pop-up">
          <div className="confirm-title"><h4>¿Estas seguro?</h4></div>
          <div className="confirm-button" onClick={this.props.handleOkPopUp}>SI</div>
          <div className="confirm-button" onClick={this.props.handleNoPopUp}>NO</div>
        </div>
        <div className="overlay-gray-confirm" onClick={this.props.handleBackConfirm}></div>
      </React.Fragment>
    );
  }
}


export default ConfirmPopUp;
