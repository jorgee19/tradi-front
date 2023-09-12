import React, {Component} from 'react';
import reqManager from '../libraries/reqManager';

class AdminForm extends Component {
  state = {
    formData: {
      firstName: '',
      firstLastName: '',
      secondLastName: '',
      user: '',
      email: '',
      adminPass: '',
      adminConfirmPass:'',
      usertType:'A'
    }
  }

  onChangeHandle = ({ target }) => {

    const { formData } = this.state;
    if(target.name === "adminPass"){
      formData["adminPass"] = document.getElementsByName("adminPass")[0].value
    }
    else if(target.name === "adminConfirmPass"){
      formData["adminConfirmPass"] = document.getElementsByName("adminConfirmPass")[0].value
    }
    else{
      formData[target.name] = target.value;
    }
    this.setState(this.state);
  }

  onSubmit = () => {
    const toSent = this.state.formData;
    if(toSent.firstName === "" || toSent.firstLastName === "" || toSent.secondLastName === "" || toSent.email === "" || toSent.user === "" || toSent.adminPass === "" || toSent.adminConfirmPass === "" ){
      window.alert("No lleno todos los campos");
    }
    else if(toSent.adminPass.length < 8 ){
      window.alert("La constraseña debe ser de al menos 8 digitos")
    }
    else if(toSent.adminConfirmPass !== toSent.adminPass){
      window.alert("Las contraseñas no coinciden");
    }

    else {
      reqManager.post('/admins/uservalidation', {"user":this.state.formData.user}).then((res) => {

      if(res.data.used){
        window.alert("Ese nombre de usuario ya esta registrado");
      }
      else {
        reqManager.post('/validations/email', {"email":this.state.formData.email}).then((res) => {
          if(res.data.used){
            window.alert("Ese email ya esta registrado");
          }
          else {
            reqManager.post('/admins/register', this.state.formData).then((res) => {
              console.log(res);
              this.props.handleNextForm(res.data.adminId)
              window.alert("cuenta creada")
            }).catch((error) => {
              console.log(error)
            })

          }
      }).catch((error) => {
      console.log(error)
      })
    }

    }).catch((error) => {
    console.log(error)
    })


    }
      //Falta validar sintaxis Correo// y correo de confirmacion
  }
  render(){
      const {
        firstName,
        firstLastName,
        secondLastName,
        user,
        email
      } = this.state.formData;
      return(
        <React.Fragment>
          <div className="title-form">
            <h2>Datos del administrador</h2>
          </div>
          <div className="form-tradi">

            <div className="row-form">
              <div className="cell">
                <input type="text" name="firstName" value={firstName} placeholder="Nombre de pila" onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="text" name="firstLastName" value={firstLastName} placeholder="Apellido paterno" onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="text" name="secondLastName" value={secondLastName} placeholder="Apellido materno" onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="text" name="user" value={user} placeholder="Nombre de usuario" onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="email" name="email" value={email} placeholder="Correo electronico" onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="password" name="adminPass" placeholder="Contraseña" onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <input type="password" name="adminConfirmPass" placeholder="Confirmar Contraseña" onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="row-form">
              <div className="cell">
                <button onClick={this.props.handleReturn}
                  className="button-form">Regresar</button>
              </div>
              <div className="cell">
                <button onClick={ this.onSubmit }
                  className="button-form">Aceptar</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default AdminForm;
