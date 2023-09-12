import React, {Component} from 'react';
import RoundButton from './RoundButton.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'; 

class EditButton extends Component{
    render(){
        return(
            <div className="edit-button">
                <RoundButton onClick={this.props.handleClick}>
                    <FontAwesomeIcon icon={faPencilAlt}/>
                </RoundButton>
            </div>
        );
    }
}
export default EditButton;