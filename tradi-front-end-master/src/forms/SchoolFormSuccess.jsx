import React, {Component} from 'react';

class SchoolFormSuccess extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return (
      <React.Fragment>
        <div className="title-form">
          <h2>Escuela registrada de manera exitosa</h2>
        </div>
        <div className="form-tradi">
          <div className="row-form">
            <div className="cell">
              <div className="sub-title-form">
                <h3>Codigo de 4 digitos enviado a la direccion ingresada</h3>
              </div>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <button onClick={this.props.handleReturn}
                className="button-form">Aceptar</button>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }

}

export default SchoolFormSuccess;
