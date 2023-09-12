import React, {Component} from 'react';

class SchoolCodeForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return (
      <React.Fragment>
        <div className="title-form">
          <h2></h2>
        </div>
        <div className="form-tradi">
          <div className="row-form">
            <div className="cell">
              <div className="sub-title-form">
                <h3>Ingrese el codigo enviado por correo postal</h3>
              </div>
            </div>
          </div>

          <div className="row-form">
            <div className="cell">
              <input type="text" maxlength="4" style="font-size:100px;" name="activation" size="4"/>
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
