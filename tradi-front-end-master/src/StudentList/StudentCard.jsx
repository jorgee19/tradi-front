import React, {Component} from 'react';
import './StudentList.css';
import RemoveButton from '../components/RemoveButton.jsx';
import EditButton from '../components/EditButton.jsx';
import ChangeButton from '../components/ChangeButton.jsx';

class StudentCard extends Component{
    render(){
      return(
        <div className="student-card">
          <div className="single-name">
            <h3 className="show-student-name">{this.props.name}</h3>
          </div>

        </div>
      );
    }
    doChangeStudent = () =>{
      this.props.handleChangeStudentScreen(this.props.data); 
    }

}
export default StudentCard;
