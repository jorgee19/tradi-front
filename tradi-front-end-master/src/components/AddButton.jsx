import React, {Component} from 'react';
import RoundButton from './RoundButton.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

class AddButton extends Component{
    render(){
        return(
            <div className="add-button">
                <RoundButton onClick={this.props.handleClick}>
                    <FontAwesomeIcon icon={faPlus}/>
                </RoundButton>
            </div>
            
        );
    }
}
export default AddButton;