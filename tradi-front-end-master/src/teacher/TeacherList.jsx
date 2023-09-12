import React, {Component} from 'react';
import SingleTeacher from './SingleTeacher.jsx';

class TeacherList extends Component{

    render(){
        return(
            <div className="teacher-list">
              <h2>Maestros</h2>
              {
                  this.props.teachers.map( (teacher) => {
                      return (
                          <SingleTeacher
                              key = {teacher.id}
                              data = {teacher}
                              isPopUp = {this.props.isPopUp}
                              handleConfirmPopUp = {this.props.handleConfirmPopUp}
                              handleClickRemove = {this.props.handleClickRemove}
                          />
                      );
                  })
              }
            </div>

        )
    }
}
export default TeacherList;
