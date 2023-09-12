import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRoad, faDraftingCompass} from '@fortawesome/free-solid-svg-icons'; 

import './Map.css';

class BottomBar extends Component {
  
  constructor(props){
    super(props);
    this.state = {'a': 1};
  }

  render(){
    const { handleClickExternal, handleClickInternal } = this.props.buttonsActions;
    return (
      <div className="map__bottom-bar primary-color--dark">
        <BBButton onClick={ handleClickInternal }>
          <FontAwesomeIcon icon={ faRoad } /> 
        </BBButton>
        <BBButton onClick={ handleClickExternal }>
         <FontAwesomeIcon icon={ faDraftingCompass } />
        </BBButton>
      </div>
    );
  }


}

class BBButton extends Component{
  render(){
    return (
      <div className="map__button icon" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default BottomBar;