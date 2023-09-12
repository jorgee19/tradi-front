import React, {Component} from 'react';
import TeacherList from './TeacherList.jsx';
import './Teacher.css';
import AddTeacher from './AddTeacher';
import reqManager from '../libraries/reqManager';

class Teacher extends Component{
    state = {
        selectedComponent : 1,
        teachers: []

    }
    
    getSchoolTeachers = (callback)=>{
        reqManager.post('/admins/getschoolteachers', {"schoolId":this.props.schoolId}).then(({data})=>{
            const teachers = data.map((row)=>{
            return {
                id:row.id,
                name: row.nombre,
                fatherLastName: row.apellidopaterno,
                motherLastName: row.apellidomaterno,
                email: row.email
            }
            })
            this.setState({"teachers":teachers})
        })
    }   

    componentDidMount(){
        this.getSchoolTeachers(this.props.schoolId)
      }
    render(){
        let renderComponent;
        switch(this.state.selectedComponent){
            case 1:
                renderComponent = <TeacherList teachers = {this.state.teachers}
                 isPopUp={this.props.isPopUp}
                 handleConfirmPopUp={this.props.handleConfirmPopUp}
                 handleClickAdd={this.handleClickAddTeacher}
                 handleClickRemove={this.handleClickRemove}
                  />

                break;
            case 2:
                renderComponent = <AddTeacher onClick={this.handleBackClick}/>
                break;
            default:
              renderComponent =<div></div>
        }
        return(
            <div className="teacher-container">
                {renderComponent}
            </div>
        );
    }
    handleClickAddTeacher = () =>{
        this.setState({
            selectedComponent: 2
        })
        console.log("Agregar");
    }

    handleBackClick = () => {
        this.setState({
            selectedComponent : 1
        });
    }
    handleClickRemove = (userId)=>{
        reqManager.post('/teachers/deleteteacher', {"userId":userId}).then((data)=>{
            this.getSchoolTeachers(this.props.schoolId)
        });
    } 
}
export default Teacher;
