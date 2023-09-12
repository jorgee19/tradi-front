import React, {Component} from 'react';
import GroupCardList from '../groupList/GroupCardList.jsx'
import './ChangeStudent.css';

class ChangeStudentForm extends Component{

  render(){
    const groups = this.props.groups;
    const student = this.props.student;
    return(
      <React.Fragment>
        <div className="group-pop-up">
          <h2>Selecciona el nuevo grupo para {student[0]}</h2>
          <GroupCardList data={groups} isPopUp={true}/>
        </div>

        <div className="overlay-gray" onClick={this.handleBack}></div>
      </React.Fragment>

    );
  }
  handleBack = () =>{
      this.props.handleChangeStudentScreen(null);
  }

}

export default ChangeStudentForm;
