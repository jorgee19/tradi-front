import React, {Component} from 'react';

import BottomBarButton from './BottomBarButton.jsx';



import {faCommentDots, faNewspaper,faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';

import './BottomBar.css';

class BottomBar extends Component{
  state = {
  };

  render(){

    return(
      <div className="bottom-menu">
        <div className="bottom-element" onClick={ this.handleMessagesClick }>
          <BottomBarButton  iconProp={faCommentDots} > </BottomBarButton>
        </div>
        <div className="bottom-element" onClick={ this.handleNewsClick }>
          <BottomBarButton  iconProp={faNewspaper}> </BottomBarButton>
        </div>
        <div className="bottom-element" onClick={ this.handleMapClick } >
          <BottomBarButton iconProp={faMapMarkedAlt}> </BottomBarButton>
        </div>
      </div>
    );
  }



  handleMessagesClick = () => {
    this.props.handleScreen(2);
  }

  handleNewsClick = () => {
    this.props.handleScreen(1);
  }

  handleMapClick = () => {
    this.props.handleScreen(3);
  }
}
export default BottomBar;
