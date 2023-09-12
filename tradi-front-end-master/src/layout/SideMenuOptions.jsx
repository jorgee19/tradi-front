import React, {Component} from 'react';

class SideMenuOptions extends Component {

  render(){

    return (
      <div onClick={ this.doHandleScreen } className="side-menu__menu-option">
        <div className="icon-menu">
          {this.props.elementData.icon}
        </div>
        <div className="label">
          { this.props.elementData.label }
        </div>
      </div>
    );
  }
  doHandleScreen = () => {
    this.props.handleScreen(this.props.elementData.id);
  }
}

export default SideMenuOptions;
