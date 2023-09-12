import React, {Component} from 'react';
import RoundButton  from "./RoundButton.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

class WarningButton extends Component{

    render(){
        return(
            <div className="right-button">
                <RoundButton  onClick={this.props.onClick}>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </RoundButton>
            </div>

        );
    }
};
export default WarningButton;
