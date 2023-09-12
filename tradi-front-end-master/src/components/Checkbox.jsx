import React, {Component} from 'react';
import './Checkbox.css';


class Checkbox extends Component{
  
  render(){
    const {selected, idCheckbox} = this.props.checkboxData;
    const idInput = 'cbx-' + idCheckbox;
    return (
      <div className="checkbox-container">
        <input type="checkbox" 
               id={idInput} 
               checked={selected}
               onChange={this.handleClick} />
        <label htmlFor={idInput} 
               className="toggle">
                 <span></span>
        </label> 
      </div>
    );
  }
  handleClick = () => {
    const {idCheckbox} = this.props.checkboxData;
    this.props.onChange(idCheckbox);
  }
}


export default Checkbox;