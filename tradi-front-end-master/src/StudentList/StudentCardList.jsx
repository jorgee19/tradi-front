import React, {Component} from 'react';
import StudentCard from './StudentCard.jsx';
import './StudentList.css';

import util from '../libraries/Util.js';
class StudentCardList extends Component{



  render(){
    const data = this.props.data;
    return(
      <React.Fragment>
        <div className="card-list">
          <div className="header-student-list">
            <h2>Alumnos de {data.name}</h2>
            <h2>Maestro: {data.teacher}</h2>
          </div>

          {
            this.props.names.map( (name, index) => { 
              if(data.id==name.idGroup) 
              { 
                return (
                  <StudentCard
                    key = {index}
                    name = {util.capitalize(name.name, name.lastName, name.SLastname)}
                    handleChangeStudentScreen = {this.props.handleChangeStudentScreen}/>

                );

              }
            })
          }
        </div>
      </React.Fragment>
    );
  }

  
  handleClickChangeTeacher = () =>{
     this.props.handleChangeTeacherScreen();
  }



}

export default StudentCardList;
