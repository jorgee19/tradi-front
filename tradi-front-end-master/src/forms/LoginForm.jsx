import React, { Component } from 'react';
import Logo from '../components/Logo.jsx'

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonAreShown: false,
      form: {
        user: '',
        pass: ''
      }
    }
  }

  listClassesButtonsHide = () => {
    let classes = 'button-section ' + ((this.state.buttonAreShown) ? 'show-buttons' : 'hide-buttons');
    return (classes);
  }

  handleSignupSection = () => {
    this.setState({
      buttonAreShown: !(this.state.buttonAreShown)
    });
  }

  handleKeyUp = (evt) => {
    if(evt.key === 'Enter'){
      this.handleOnSubmit();
    }
  }

  handleOnChangeUser = (evt) => {
    const form = this.state.form;
    form.user = evt.target.value;
    this.setState(form);
  }

  handleOnChangePassword = (evt) => {
    const form = this.state.form;
    form.pass = evt.target.value;
    this.setState(form);
  }

  handleOnSubmit = () => {
    const { user, pass } = this.state.form;
    this.props.onLogin(user, pass);
  }

  render() {
    const { user } = this.state.form;
    return (


      <div className="login">
        <Logo />

        <div className="form-tradi">
          <div className="row-form">
            <div className="cell">
              <input
                type="text"
                className="user"
                placeholder="Usuario"
                value={user}
                onChange={this.handleOnChangeUser} />
            </div>
          </div>

          <div className="row-form">
            <div className="cell">
              <input
                type="password"
                className="pass"
                placeholder="Contraseña"
                name="generalPass"
                onChange={this.handleOnChangePassword}
                onKeyPress={this.handleKeyUp}
              />
            </div>
          </div>

          <div className="row-form">
            <div className="cell">
              <button
                type="button"
                className="button-form button-form--alt-color"
                onClick={this.handleSignupSection}>
                Registrarse
              </button>
              <button
                type="submit"
                className="button-form"
                onClick={this.handleOnSubmit}>
                Ingresar
              </button>
            </div>
          </div>

          <div className="row-form">
            <div className="cell">
              <div className={this.listClassesButtonsHide()}>
                <button
                  type="button"
                  onClick={this.props.handleRegisterAdmin}
                  className="button-form button-form--alt-color" >
                  Administrador
                </button>
                <button
                  type="button"
                  className="button-form button-form--alt-color"
                  onClick={this.props.handleRegisterStudent}>
                  Estudiante
                </button>
                <button
                  type="button"
                  className="button-form button-form--alt-color"
                  onClick={this.props.handleRegisterParent}>
                  Padre/Tutor
                </button>
                <button
                  type="button"
                  className="button-form button-form--alt-color"
                  onClick={this.props.handleRegisterTeacher}>
                  Maestro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default LoginForm;
