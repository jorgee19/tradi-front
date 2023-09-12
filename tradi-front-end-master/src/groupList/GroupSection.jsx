import React, {Component} from 'react';
import GroupCardList from './GroupCardList.jsx'
import StudentCardList from '../StudentList/StudentCardList.jsx'
import ChangeTeacherForm from '../components/ChangeTeacherForm.jsx'
import ChangeStudentForm from '../components/ChangeStudentForm.jsx'
import './Group.css';
import reqManager from '../libraries/reqManager.js';
import util from '../libraries/Util.js'
import AddGroup from './AddGroup.jsx';

const  GROUPSCREEN = 1;
const  STUDENTSCREEN = 2;
const  ADDGROUP = 3;
class GroupSection extends Component{

  state = {
    n:0,
    changeTeacherScreen:false,
    changeStudentForm:false,
    selectedStudent:null,
    screen : GROUPSCREEN,
    group : -1,
    data:[],
    names:[]
  };

  componentDidMount(){

    

    switch(this.props.userData.userType){
      case 'S':
         this.getStudentGroups(this.props.userData.userCode)
        break;
      case 'T':
         this.getTeacherGroups(this.props.userData.userCode)
        break;
      case 'A':
         this.getAllGroups(this.props.userData.userCode)
        break
    }

    
  }

  getAllGroups =  (callback)=>{
     reqManager.post('/group/getallgroups', {"userId":this.props.userData.userCode}).then(({data})=>{
      const groups = data.map((row)=>{
        return {
          id:row.id,
          name: row.nombre,
          teacher:util.capitalize(row.teacher, row.apellidopaterno, row.apellidomaterno),
          code:row.codigo,
          students:[]
        }
      })
      this.setState({"data":groups})
      this.getLists(this.state.data)
    })
  }

  getStudentGroups =  (callback)=>{
     reqManager.post('/group/getstudentgroups', {"userId":this.props.userData.userCode}).then(({data})=>{
      const groups = data.map((row)=>{
        return {
          id:row.id,
          name: row.nombre,
          teacher:util.capitalize(row.teacher, row.apellidopaterno, row.apellidomaterno),
          code:row.codigo,
          students:[]
        }
      })
      this.setState({"data":groups})
      this.getLists(this.state.data)
    })
  }


  getTeacherGroups =  (callback)=>{
    reqManager.post('/group/getteachergroups', {"userId":this.props.userData.userCode}).then(({data})=>{
      const groups = data.map((row)=>{
        return {
          id:row.id,
          name: row.nombre,
          teacher:util.capitalize(this.props.userData.nombre, this.props.userData.apaterno, this.props.userData.amaterno),
          code:row.codigo,
          students:[]
        }
      })
      this.setState({"data":groups})
      this.getTeacherList(this.state.data)
    })
  }


  getLists = (callback)  =>  {

    reqManager.post('/group/getalllists', {"listId":this.state.data}).then(({data})=>{
      console.log(data)
      if(data.validated!=false)
      {
      let aux = data.map((elem)=>{
        let r = {}
        r.name = elem.anombre
        r.lastName = elem.aapellidopaterno
        r.SLastname = elem.aapellidomaterno
        r.idGroup = elem.idgroup
        return r
      })
      this.setState({"names":aux})
    }

    })

  }


  getTeacherList = (callback)  =>  {

    reqManager.post('/group/getteacherlists', {"teacherId":this.props.userData.userCode}).then(({data})=>{
      let aux = data.map((elem)=>{
        let r = {}
        r.name = elem.anombre
        r.lastName = elem.aapellidopaterno
        r.SLastname = elem.aapellidomaterno
        r.idGroup = elem.idgroup
        return r
      })
      this.setState({"names":aux})

    })

  }

  handleScreen = (screenNumber,groupId) =>{
    const newState = {screen: screenNumber, group:groupId};
    this.setState(newState);
  }

  handleChangeTeacherScreen = () =>{
    this.setState({changeTeacherScreen:!this.state.changeTeacherScreen })
  }

  handleChangeStudentScreen = (newSelectedStudent) =>{
    this.setState({
      changeStudentScreen:!this.state.changeStudentScreen,
      selectedStudent: newSelectedStudent
    });
  }
  render(){

    let displayScreen;
    
    switch(this.state.screen){
      case GROUPSCREEN:
        
          displayScreen =<GroupCardList reset={this.reset} userData = {this.props.userData} data = {this.state.data} handleScreen={this.handleScreen} onClickAdd={this.handleClickAddGroup} />;
          
        
        break;
      case STUDENTSCREEN:
        displayScreen = <StudentCardList  names = {this.state.names} data = {this.state.data.filter((group) => group.id === this.state.group)[0]}  handleChangeTeacherScreen={this.handleChangeTeacherScreen} handleChangeStudentScreen={this.handleChangeStudentScreen}/>;
        break;
      case ADDGROUP:
        displayScreen = <AddGroup onClickBack={this.handleClickBack}  userData={this.props.userData} />;
        break;
      default:
        displayScreen = <div> </div>;

    }

    return (
      <div className="group-section">
          {displayScreen}
          {(this.state.changeTeacherScreen) ?
             <ChangeTeacherForm handleChangeTeacherScreen={this.handleChangeTeacherScreen}/> :
             <div></div>
          }

          {(this.state.changeStudentScreen) ?
              <ChangeStudentForm handleChangeStudentScreen={this.handleChangeStudentScreen} groups={this.state.data.filter((group) => group.id !== this.state.group)} student = {this.state.selectedStudent}/> :
              <div></div>
          }
      </div>
    );
  }


  handleClickAddGroup = () =>{
    this.setState({
        screen: ADDGROUP
    })
  }

  handleClickBack = () =>{
    this.setState({
        screen: GROUPSCREEN
    })
    //this.getTeacherGroups(this.props.userData.userCode);
    switch(this.props.userData.userType){
      case 'S':
          this.getStudentGroups(this.props.userData.userCode)
        break;
      case 'T':
          this.getTeacherGroups(this.props.userData.userCode)
        break;
      case 'A':
          this.getAllGroups(this.props.userData.userCode)
        break
    }
  }

  reset = () =>{
    switch(this.props.userData.userType){
      case 'S':
         this.getStudentGroups(this.props.userData.userCode)
        break;
      case 'T':
         this.getTeacherGroups(this.props.userData.userCode)
        break;
      case 'A':
         this.getAllGroups(this.props.userData.userCode)
        break
    }
  }

}



export default GroupSection;
