import React, {Component} from 'react';
import RoundButton from './RoundButton.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons';

class ChangeButton extends Component{
    render(){
        return(
            <div className="change-button">
                <RoundButton onClick={this.props.handleClick}>
                    <FontAwesomeIcon icon={faExchangeAlt}/>
                </RoundButton>
            </div>

        );
    }
}
export default ChangeButton;
