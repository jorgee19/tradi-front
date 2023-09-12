import React, {Component} from 'react';

class modifyStudent extends Component {
  // state = {
  // }

  render(){
      return(
        <React.Fragment>
          <div className="title-form">
            <h2>Datos de Alumno</h2>
          </div>
          <div className="form-tradi">

            <div className="row-form">
              <div className="cell">
                <input type="text" placeholder="Nombre de pila"/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="text" placeholder="Apellido paterno"/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="text" placeholder="Apellido materno"/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="text" placeholder="Nombre de usuario"/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="email" placeholder="Correo electronico"/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <button onClick={ this.props.handleNextForm }
                  className="button-form">Aceptar</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default modifyStudent;
