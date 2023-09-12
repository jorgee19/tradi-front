import React, {Component} from 'react';
import BottomBar from './BottomBar.jsx';
import SideBar from './SideBar.jsx';
import SuperiorButtons from './SuperiorButtons.jsx';
import Feed from '../feed/Feed.jsx';
import GroupSection from '../groupList/GroupSection.jsx';
import Map from '../map/Map.jsx';
import Teacher from '../teacher/Teacher.jsx';
import EmergencySection from './EmergencySection.jsx'
import UpdateConfig from '../updateConfig/UpdateConfig.jsx';
import AdminSection from '../Admin/AdminSection.jsx';
import ReportSection from '../report/ReportSection.jsx';
import Chat from '../chat/Chat.jsx';
import PDFView from '../components/PDFView.jsx'

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            'showMenu': false,
            'screen' : 1,
            'showEmergencyMenu':false
        };
    }



    render(){


        return (

            <React.Fragment>
                <SuperiorButtons handleMenu={this.handleMenu} handleEmergencyMenu={this.handleEmergencyMenu}/>
                <Principal screen = {this.state.screen} userData={this.props.userData} schoolId = {this.props.schoolId} handleLogOut={this.props.handleLogOut}/>
                <BottomBar handleScreen={this.handleScreen} />
                {(this.state.showMenu) ? <SideBar userData={this.props.userData} schoolId = {this.props.schoolId}  handleScreen={this.handleScreen} handleMenu={this.handleMenu}/> : <div></div> }
                {(this.state.showEmergencyMenu) ? <EmergencySection handleEmergencyMenu={this.handleEmergencyMenu} schoolId = {this.props.schoolId}/> : <div></div>}
            </React.Fragment>
        );
    }

    handleMenu = () => {
        const newState = {showMenu : !this.state.showMenu}
        this.setState(newState);
    }

    handleEmergencyMenu = () => {
        const newState = {showEmergencyMenu : !this.state.showEmergencyMenu}
        this.setState(newState);
    }

    handleScreen = (screenNumber) =>{
      let showMenu;
      if(this.state.showMenu){
        showMenu = !this.state.showMenu;
      }
      else {
        showMenu = this.state.showMenu;
      }
      const newState = {showMenu : showMenu, screen: screenNumber}
      this.setState(newState);
    }
}



class Principal extends Component {
    render(){
      let displayScreen;
      switch(this.props.screen){
        case 1:
          displayScreen = <Feed userData={this.props.userData}/>;
          break;
        case 2:
          displayScreen = <Chat userData={this.props.userData} />;
          break;
        case 3:
          displayScreen = <Map schoolId = {this.props.schoolId} userData={this.props.userData}/>;
          break;
        case 4:
          displayScreen = <AdminSection/>;
          break;
        case 5:
          displayScreen = <Teacher userData={this.props.userData} schoolId = {this.props.schoolId} isPopUp={false}/>;
          break;
        case 6:
          displayScreen = <UpdateConfig schoolId = {this.props.schoolId} />; //configurar chat
          break;
        case 7:
          displayScreen = <ReportSection schoolId = {this.props.schoolId}/>;
          break;
        case 8:
          displayScreen = <PDFView schoolId = {this.props.schoolId}/>;
          break;
        case 9:
          displayScreen = <GroupSection userData={this.props.userData} schoolId = {this.props.schoolId} />;
          break;
        case 10:
          displayScreen = <div> </div>;
          break;
        case 11: // Cerrar sesion
          this.props.handleLogOut();
          displayScreen = <div></div> 
          break;
        default:
          break;

      }
        return(
            <div className="principal">
                {displayScreen}
            </div>
        );
    }

}

export default Layout;
