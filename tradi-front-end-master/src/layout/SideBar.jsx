import React, {Component} from 'react';
import SideProfile from './SideProfile.jsx';
import SideMenu from './SideMenu.jsx';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserTie, faWrench, faFlag, faFileAlt, faUsers, faCog, faUserCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

import './SideBar.css';
import util from '../libraries/Util.js'

class SideBar extends Component {

  constructor(props){
    super(props);
    if(true){
      
    }
    this.state = {
      profile: {
        url: 'https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png',
        nombre: util.capitalize(this.props.userData.nombre, this.props.userData.apaterno, this.props.userData.amaterno)
      },
      classList: [
        'layout__side-bar',
        'layout_side-bar--hidden'
      ],
      hiddenClass: 'layout_side-bar--hidden',
      menuOptions : [

        /*{
          id:4,
          label: 'Admins',
          icon: <FontAwesomeIcon icon={faUserCog}/>,
        },*/
        {
          id: 5,
          label: 'Maestros',
          icon: <FontAwesomeIcon icon={faUserTie} />,
          permission:['A']
        },
        {
          id: 6,
          label: 'Configurar chat',
          icon: <FontAwesomeIcon icon={faWrench} />,
          permission:['A']
        },
        {
          id: 7,
          label: 'Ver Reportes de Moderador',
          icon: <FontAwesomeIcon icon={faFlag} />,
          permission:['A','S','P','T']
        },
        {
          id: 8,
          label: 'Manual',
          icon: <FontAwesomeIcon icon={faFileAlt} />,
          permission:['A','T','S','P']
        },
        {
          id: 9,
          label: 'Grupos',
          icon: <FontAwesomeIcon icon={faUsers} />,
          permission:['A','T','S','P']
        },
        {
          id: 10,
          label: 'Configuración',
          icon: <FontAwesomeIcon icon={faCog} /> ,
          permission:['A']
        },
        {
          id: 11,
          label: 'Cerrar Sesion',
          icon: <FontAwesomeIcon icon={faSignOutAlt} />,
          permission:['A','T','S','P']
        },
      ]
    };
  }

  componentDidMount = () => {
    const {classList, hiddenClass} = this.state;
    setTimeout(() => {
      this.setState({
        'classList': classList.filter((classname) => {return classname !== hiddenClass;})});
    }, 100);
  }

  closeComponent = () => {
    const {classList, hiddenClass} = this.state;
    const {handleMenu} = this.props;
    classList.push(hiddenClass);
    this.setState({
      'classList': classList
    });
    setTimeout(handleMenu, 210);
  }

  render(){
    const {classList, profile, menuOptions} = this.state;
    return(
      <React.Fragment>
        <div className={ classList.join(' ') }>
          <SideProfile profile={ profile }/>
          <SideMenu handleScreen={this.props.handleScreen} menuOptions={ menuOptions } userType={this.props.userData.userType}/>
        </div>
        <Overlay onClick={this.closeComponent } />
      </React.Fragment>
    );
  }
}

function Overlay(props){
  return <div className="side-menu__overlay" onClick={props.onClick}></div>
}

export default SideBar;
