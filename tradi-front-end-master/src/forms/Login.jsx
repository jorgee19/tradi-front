import React, { Component } from 'react';


import reqManager from '../libraries/reqManager';
import LoginForm from './LoginForm.jsx';
import SchoolForm from './SchoolForm';
import TwoFactorForm from './TwoFactorForm';
import SchoolFormSuccess from './SchoolFormSuccess';
import AdminForm from './AdminForm.jsx';
import ParentForm from './ParentForm.jsx';
import StudentForm from './StudentForm.jsx';
import TeacherForm from './TeacherForm.jsx';
import Layout from '../layout/Layout.jsx';
import ValidationCodeForm from './ValidationCodeForm.jsx'
import StudentCodeForm from './StudentCodeForm.jsx'

class Login extends Component {
  constructor(props) {

    super(props);
    this.state = {
      userAux:null,
      schoolAux:null,
      SCREENS: {
        LOGIN_SCREEN: 0,
        REGISTER_SCHOOL: 1,
        REGISTER_ADMIN: 2,
        REGISTER_STUDENT: 3,
        REGISTER_PARENT: 4,
        REGISTER_TEACHER: 5,
        REGISTER_SCHOOL_SUCCESS: 6,
        LAYOUT:7,
        REGISTER_SCHOOL_CODE:8,
        REGISTER_STUDENT_CODE:9,
        TWO_FACTOR_AUTH:10
      },
      currentScreen: 0,
      prevScreens: [],
      userData: {
        userId: null,
        userType: null,
        schoolId: null,
        registeredSchool: null,
        nombre:'',
        apaterno:'',
        amaterno:'',
        userCode:null
      }
    };
  }

  componentDidMount(){
    this.hadTokenValid();
  }

  render() {
    const { SCREENS, currentScreen } = this.state;
    let renderItem;
    switch (currentScreen) {
      case SCREENS.LOGIN_SCREEN:
        renderItem = (
          <LoginForm
           handleRegisterAdmin = {this.handleClickRegisterAdmin}
           handleRegisterStudent = {this.handleClickRegisterStudent}
           handleRegisterParent = {this.handleClickRegisterParent}
           handleRegisterTeacher = {this.handleClickRegisterTeacher}
           onLogin = {this.handleLogginUser}
           />

        );
        break;
      case SCREENS.REGISTER_SCHOOL:
        renderItem = (
          <React.Fragment>
            <SchoolForm handleNextForm={this.handleClickRegisteredSchool} handleClickLater={this.handleClickLater}  userId={this.state.userAux}  />
          </React.Fragment>
        );
        break;
      case SCREENS.REGISTER_SCHOOL_CODE:
        renderItem = (
          <React.Fragment>
            <ValidationCodeForm userData = {this.state.userData} schoolAux = {this.state.schoolAux} handleReturn = {this.handleClickLater} handleSubmit= {this.handleClickRegisteredSchoolCode}/>
          </React.Fragment>
        );
        break;
      case SCREENS.REGISTER_SCHOOL_SUCCESS:
        renderItem = (
          <React.Fragment>
            <SchoolFormSuccess handleReturn={this.handleClickLater}/>
          </React.Fragment>
        );
        break;
      case SCREENS.REGISTER_ADMIN:
        renderItem = (
          <React.Fragment>
            <AdminForm handleNextForm={this.handleClickRegisteredAdmin} handleReturn={this.handleClickReturn} />
          </React.Fragment>
        );
        break;
      case SCREENS.REGISTER_STUDENT:
        renderItem = (
          <React.Fragment>
            <StudentForm handleNextForm={this.handleClickReturn} />
          </React.Fragment>
        );
        break;
      case SCREENS.REGISTER_PARENT:
        renderItem = (
          <React.Fragment>
            <ParentForm handleNextForm={this.handleClickReturn} />
          </React.Fragment>
          );
          break;
        case SCREENS.REGISTER_TEACHER:
          renderItem = (
            <React.Fragment>
              <TeacherForm handleNextForm = {this.handleClickRegisteredTeacher} handleReturn = { this.handleClickReturn }/>
            </React.Fragment>
          );
          break;
        case SCREENS.LAYOUT:
          renderItem = (
            <React.Fragment>
              <Layout userData={this.state.userData} schoolId={this.state.schoolAux} handleLogOut={this.handleLogOut} />
            </React.Fragment>
          );
          break;
        case SCREENS.REGISTER_STUDENT_CODE:
          renderItem = (
          <React.Fragment>
            <StudentCodeForm userData = {this.state.userData}  handleReturn = {this.handleClickLater} handleSubmit= {this.handleClickRegisteredStudentCode}/>
          </React.Fragment>
          );
          break;
        case SCREENS.TWO_FACTOR_AUTH:
          renderItem = (
            <React.Fragment>
            <TwoFactorForm />
            </React.Fragment>
          );
          break;
      default:
        renderItem = <p>Error</p>;
        break;
    }

    return (
      <div className="login-page--background">
        <div className="login-screen">
          {renderItem}
        </div>
      </div>
    );

  }

  handleLogOut = () => {
    const {SCREENS} = this.state;

    const userId = localStorage.getItem('user_id');
    const jwtToken = localStorage.getItem('jwt_token');
    reqManager.post('/login/logout', {'jwt_token': jwtToken, 'user_id': userId }).then((res) => {
      console.log(res.data);
      localStorage.removeItem('user_id');
      localStorage.removeItem('jwt_token');
      this.setState({currentScreen: SCREENS.LOGIN_SCREEN});
    });

    
    
  }

  hadTokenValid = () => {
    const user_id = localStorage.getItem('user_id');
    const token   = localStorage.getItem('jwt_token');
    if(token !== null && user_id !== null){
      reqManager.post('/login/jwt-login', { 'user': { 'id' : user_id, 'jwt_token': token}})
      .then(({data}) => {
        if(data.isValid){

          const {userData} = data;
          this.setState({'userData': userData});
          //this.handleLogInSuccess();
          switch (this.state.userData.userType) {
            case 'A':
              this.getSchoolId(this.state.userData.userCode, this.state.userData.userType, (idSchool)=>{
                this.setState({
                  schoolAux: idSchool
                });
              });

              this.isRegisteredSchool(this.state.userData.userCode, this.state.userData.userType, (registered) =>{
            
                if(registered){
                  this.isValidSchool(this.state.schoolAux, (validSchool) =>{
                    console.log(validSchool)
                    if(validSchool){
                      this.handleLogInSuccess()
                    }
                    else{
                      this.handleClickRegisterSchoolCode()
                    }
                  });
      
                }
                else{
                  this.handleClickRegisteredAdmin()
                }
              });
              
              break;
            case 'S':
              this.studentHasSchool(this.state.userData.userCode, (hasSchool) =>{
                if(hasSchool){
                  this.handleLogInSuccess()
                }
                else{
                  this.handleClickRegisterSchoolCode()
                }
              });
            
              break;
            case 'T':
              this.getSchoolId(this.state.userData.userCode, this.state.userData.userType, (idSchool)=>{
                this.setState({
                  schoolAux: idSchool
                });
              });

              this.teacherHasSchool(this.state.userData.userCode, (hasSchool) =>{
                if(hasSchool){
                  this.handleLogInSuccess()
                }
                else{
                  this.handleClickRegisterSchoolCode()
                }
              });
              break;
            case 'P':
              this.parentHasStudent(this.state.userData.userCode,(hasStudent) =>{
                if(hasStudent){
                  this.handleLogInSuccess()
                }
                else{
                  this.handleClickRegisterStudentCode()
                }
              });
              break;
            default:
              console.error("Esto no deberia estar pasando");
              break;
          }

          // */  

        } else {
          const {status} = data;
          switch (status){
            case 'jwt expired':
              localStorage.removeItem('user_id');
              localStorage.removeItem('jwt_token');
              break;
            default:
              console.log(status);
              break;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      })
    }
  }




  handleLogginUser = (id,pass) => {
    this.validUser(id,pass)
  }

  validUser = (id, pass) => {
      reqManager.post('/login/', {"user":id, "pass":pass}).then(({data}) => {
      if(data.status === 'valido'){
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user_id', data.userCode);
        // console.log(`localstorage token: ${localStorage.getItem('jwt_token')}`);
        // console.log(`localstorage token: ${data.token}`);

        this.setState(prevState => {
          let userData = Object.assign({}, prevState.userData); 
          userData = data
          return {userData}
        });


        switch (this.state.userData.userType) {
          case 'A':
            this.getSchoolId(this.state.userData.userCode, this.state.userData.userType, (idSchool)=>{
              this.setState({
                schoolAux: idSchool
              });
            });

            this.isRegisteredSchool(this.state.userData.userCode, this.state.userData.userType, (registered) =>{
          
              if(registered){
                this.isValidSchool(this.state.schoolAux, (validSchool) =>{
                  if(validSchool){
                    this.userHasTwoFactor(this.state.userData.userCode,(result) =>{
                      if(result.two_factor){
                        this.handleTwoFactor()
                      }
                      else{
                      this.handleLogInSuccess()
                      }
                    })
                  }
                  else{
                    this.handleClickRegisterSchoolCode()
                  }
                });
    
              }
              else{
                this.handleClickRegisteredAdmin()
              }
            });
            
            break;
          case 'S':
            this.studentHasSchool(this.state.userData.userCode, (hasSchool) =>{
              if(hasSchool){
                this.handleLogInSuccess()
              }
              else{
                this.handleClickRegisterSchoolCode()
              }
            });
          
            break;
          case 'T':
            this.getSchoolId(this.state.userData.userCode, this.state.userData.userType, (idSchool)=>{
              this.setState({
                schoolAux: idSchool
              });
            });

            this.teacherHasSchool(this.state.userData.userCode, (hasSchool) =>{
              if(hasSchool){
                this.handleLogInSuccess()
              }
              else{
                this.handleClickRegisterSchoolCode()
              }
            });
            break;
          case 'P':
            this.parentHasStudent(this.state.userData.userCode,(hasStudent) =>{
              if(hasStudent){
                this.handleLogInSuccess()
              }
              else{
                this.handleClickRegisterStudentCode()
              }
            });
            break;
          default:
            console.error("Esto no deberia estar pasando");
            break;
        }

      }
      else{
        window.alert("Usuario o contraseña incorrectos")

      }
    });
  }

    userHasTwoFactor = (idUser, callback) =>{
    reqManager.post('/validations/hasTwoFactor', {"userId":idUser}).then(({data}) => {
      callback(data)
    }); 
    
  }

  studentHasSchool = (userId, callback) =>{
    reqManager.post('students/hasschool',{"userId":userId}).then(({data})=>{
      callback(data.validated)
    });
  }

  teacherHasSchool = (userId, callback) =>{
    reqManager.post('/teachers/hasschool', {"userId":userId}).then(({data})=>{
      callback(data.validated)
    }); 
  }

  getSchoolId = (userId, userType, callback) =>{
    reqManager.post('/validations/getschool/', {"userId":userId, "userType":userType}).then(({data})=>{
    callback(data.idSchool)
    });
  }



  isRegisteredSchool = (userCode,userType, callback) =>{
    reqManager.post('/validations/registeredschool/', {"userCode":userCode, "userType":userType}).then(({data})=>{
    callback(data.registered)
    });
  }

  isValidSchoolCode = (schoolId, schoolCode, callback) =>{
    reqManager.post('/validations/validateSchoolCode/', {"schoolId":schoolId, "schoolCode":schoolCode}).then(({data})=>{
    callback(data.validated)
    });
  }

  isValidSchool = (schoolId,callback)=>{
    reqManager.post('/validations/validSchool', {"schoolId":schoolId}).then(({data})=>{
    callback(data.validated)
    });
  }

  findSchoolByCode = (schoolCode,callback)=>{
    reqManager.post('/validations/findschoolbycode', {"schoolCode":schoolCode}).then(({data})=>{
    callback(data.validated)
    });
  }

  addSchoolToTeacher = (schoolId, userId)=>{
    reqManager.post('/teachers/addschool', {"schoolId":schoolId, "userId":userId})
  }

  assignSchoolToStudent = (userId)=>{
    reqManager.post('/parents/assignstudent', {"userId":userId})
  }

  
  assignstudenttoparent = (studentCode, userId)=>{
    reqManager.post('/parents/assignstudenttoparent', {"userId":userId, "studentCode":studentCode})
  }
  parentHasStudent  = (userId,callback)=>{
    reqManager.post('/parents/hasstudent', {"userId":userId}).then(({data})=>{
    callback(data.validated)
    });
  }

  studentExist = (studentCode, callback) =>{
    reqManager.post('/parents/studentexist/', {"studentCode":studentCode}).then(({data})=>{
    callback(data.validated)
    });
  }

  handleChangeScreen = (screen, clearHistory = false) => {
    const { currentScreen, prevScreens } = this.state;
    const History = (clearHistory) ? [] : prevScreens.slice();
    History.push(currentScreen);
    this.setState({
      currentScreen: screen,
      prevScreens: History
    });
  }

  handleTwoFactor = () => {
    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.TWO_FACTOR_AUTH);
  }

  handleLogInSuccess = () => {
    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.LAYOUT);
  }

  handleClickRegisterAdmin = () => {
    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_ADMIN);
  }

  handleClickRegisterStudent = () => {
    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_STUDENT);
  }

  handleClickRegisterParent = () => {
    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_PARENT);
  }

  handleClickRegisteredAdmin = (userAux) => {
    if(this.state.userData.userCode==null){
      console.log('userAux:' + userAux )
      this.setState({
        
        'userAux':userAux 
      });
    }
    else{
      console.log('userCode:' + this.state.userData.userCode)
      this.setState({
        'userAux':this.state.userData.userCode
      });
    }

    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_SCHOOL);
  }


  handleClickRegisteredSchool = (schoolId) => {
    if(this.state.userData.schoolId==null){
      this.setState({
        'schoolAux':schoolId
      });
    }
    else{
      this.setState({
        'schoolAux':this.state.userData.schoolId
      });
    }



    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_SCHOOL_SUCCESS, true);
  }

  handleClickRegisterTeacher = () => {
    const {SCREENS} = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_TEACHER, true);
  }

  handleClickRegisteredTeacher = () => {
    const { SCREENS } = this.state;
    this.handleChangeScreen(SCREENS.LOGIN_SCREEN);
  }

  handleClickRegisterSchoolCode = () => {
    const {SCREENS} = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_SCHOOL_CODE, true);
  }

  handleClickRegisterStudentCode = () => {
    const {SCREENS} = this.state;
    this.handleChangeScreen(SCREENS.REGISTER_STUDENT_CODE, true);
  }



  handleClickRegisteredStudentCode = (userId, studentCode) =>{
    this.studentExist(studentCode,(validated)=>{
      console.log(validated)
      if(validated){
        this.assignstudenttoparent(studentCode,userId)
        this.handleLogInSuccess()  
      }
      else{
        console.log("codigo incorrecto")
      }
    });
  }

  handleClickRegisteredSchoolCode = (schoolCode, userId) => {
    
    if(this.state.userData.userType=="A"){
      this.isValidSchoolCode(this.state.schoolAux, schoolCode, (validated)=>{
        if(validated){
          this.handleLogInSuccess()  
        }
        else{
          console.log("codigo incorrecto")
        }
      });
    }
    else if(this.state.userData.userType=="T"){
      this.findSchoolByCode(schoolCode, (validated)=>{
        if(validated){
          this.addSchoolToTeacher(schoolCode, userId)
          this.handleLogInSuccess()  
        }
        else{
          console.log("codigo incorrecto")
        }
      });
    }
    else if(this.state.userData.userType=='S'){
      this.findSchoolByCode(schoolCode, (validated)=>{
        if(validated){
          this.assignSchoolToStudent(userId)
          this.handleLogInSuccess()  
        }
        else{
          console.log("codigo incorrecto")
        }
      });
    }

  }

  handleClickReturn = () => {
    const { prevScreens } = this.state;
    const History = prevScreens.slice();
    let newCurrent = History.pop();
    this.setState({
      currentScreen: newCurrent,
      prevScreens: History
    });
  }

  handleClickLater = () => {
    this.setState({
      currentScreen: 0,
      prevScreens: []
    });
  }
}



export default Login;