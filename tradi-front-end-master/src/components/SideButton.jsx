import React, {Component} from 'react';
import RoundButton  from './RoundButton.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'; 

class SideButton extends Component{
 
    render(){
        return(
            <div className="left-button">
                <RoundButton   onClick={this.props.onClick}>
                    <FontAwesomeIcon icon={faBars}/>
                </RoundButton>
            </div>
            
        );
    }
};
export default SideButton;