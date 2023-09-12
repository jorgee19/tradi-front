import React, {Component} from 'react';
import Teacher from '../teacher/Teacher.jsx'
import ConfirmPopUp from './ConfirmPopUp.jsx'
import './changeTeacher.css';
class ChangeTeacherForm extends Component{
  state={
    confirmPopUp:false,
  };
  render(){
    const data = this.props.data;
    return(
      <React.Fragment>
        <div className="teacher-pop-up">
          <h2>Selecciona al nuevo profesor para el grupo</h2>
          <Teacher data={data} isPopUp={true} handleConfirmPopUp={this.handleConfirmPopUp}/>
        </div>

        <div className="overlay-gray" onClick={this.handleBack}></div>
        {
          this.state.confirmPopUp ?
          <ConfirmPopUp handleOkPopUp={this.handleOkPopUp} handleNoPopUp ={this.handleNoPopUp} handleBackConfirm={this.handleBackConfirm}/> :
          <div> </div>

        }
      </React.Fragment>

    );
  }
  handleOkPopUp = () =>{
    this.setState({
      confirmPopUp:false
    });
    this.props.handleChangeTeacherScreen();
  }
  handleNoPopUp = () =>{
    this.setState({
      confirmPopUp:false
    });
  }
  handleBackConfirm = () =>{
    this.setState({
      confirmPopUp:!this.state.confirmPopUp
    });
  }


  handleConfirmPopUp = () => {
    this.setState({
      confirmPopUp:true
    });
  }


  handleBack = () =>{
    this.props.handleChangeTeacherScreen();
  }

}

export default ChangeTeacherForm;
