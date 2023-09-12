import React, {Component} from 'react';

class StudentCodeForm extends Component {

  state = {
    codigo:''
  }

  onChangeHandle = ({ target }) => {

    let codigo = target.value;
    
    this.setState({
      'codigo':codigo
    });
  }
  handleSubmit = () =>{
    this.props.handleSubmit(this.props.userData.userCode, this.state.codigo)
  }
  render(){
    return (
      <React.Fragment>
        <div className="title-form">
          <h2>Ingrese el codigo del alumno que se le asigno</h2>
        </div>
        <div className="form-tradi">
          <div className="row-form">
            <div className="cell">
              <input type="tel" placeholder="Código" name="codigo" value={this.codigo} id="codigo" onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <button onClick={this.props.handleReturn}
                className="button-form">Ingresar despues</button>
            </div>
            <div className="cell">
              <button onClick={this.handleSubmit}
                className="button-form">Aceptar</button>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }

}

export default StudentCodeForm;
