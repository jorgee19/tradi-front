import React, {Component} from 'react';
import RoundButton from "./RoundButton.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus} from '@fortawesome/free-solid-svg-icons';

class RemoveButton extends Component{
    
    render(){
        return(
            <div className="remove-button">
                <RoundButton onClick={this.props.handleClick}>
                    <FontAwesomeIcon icon={faMinus}/>
                </RoundButton>
            </div>
        );
    }
};

export default RemoveButton;