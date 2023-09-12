import React, {Component} from 'react';
import Teacher from '../teacher/Teacher.jsx'
class groupForm extends Component {
  // state = {
  // }

  render(){
      return(
        <React.Fragment>
          <div className="title-form">
            <h2>Nuevo grupo</h2>
          </div>
          <div className="form-tradi">
            <div className="row-form">
              <div className="cell">
                <input type="text" placeholder="Nombre del grupo"/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <Teacher isPopUp={true}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <button className="button-form">Aceptar</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default groupForm;
