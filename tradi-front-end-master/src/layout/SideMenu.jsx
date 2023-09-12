import React, {Component} from 'react';
import SideMenuOptions from './SideMenuOptions.jsx';


class SideMenu extends Component{

  // constructor (props) {
  //   super(props);
  // }

  render() {
    const {menuOptions} = this.props;
    const currentMenuOptions = menuOptions.filter(menuOption => menuOption.permission.includes(this.props.userType));
      
    
    return (
      <div className='side-bar__side-menu'>
        {
          currentMenuOptions.map((menuOption) => {
            return(
            <SideMenuOptions
              key={menuOption.label}
              elementData={menuOption}
              handleScreen={this.props.handleScreen}
            />
            );
          })
        }
      </div>
    );
  }



}

export default SideMenu;
