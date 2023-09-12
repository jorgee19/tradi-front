import React, {Component} from 'react';
import reqManager from '../libraries/reqManager';


class TeacherForm extends Component{
    state = {
        formData:{
            firstName: '',
            firstLastName: '',
            secondLastName: '',
            user: '', 
            email: '',
            teacherPass: '',
            teacherConfirmPass:'',
            usertType:'T'
        }
    }

    onChangeHandle = ({ target }) => {

        const { formData } = this.state;
        if(target.name === "teacherPass"){
          formData["teacherPass"] = document.getElementsByName("teacherPass")[0].value
        }
        else if(target.name === "teacherConfirmPass"){
          formData["teacherConfirmPass"] = document.getElementsByName("teacherConfirmPass")[0].value
        }
        else{
          formData[target.name] = target.value;
        }
        this.setState(this.state);
      }

      onSubmit = () => {
        const toSent = this.state.formData;
        if(toSent.firstName === "" || toSent.firstLastName === "" || toSent.secondLastName === "" || toSent.email === "" || toSent.user === "" || toSent.teacherPass === "" || toSent.teacherConfirmPass === "" ){
          window.alert("No lleno todos los campos");
        }
        else if(toSent.teacherPass.length < 8 ){
          window.alert("La constraseña debe ser de al menos 8 digitos")
        }
        else if(toSent.teacherConfirmPass !== toSent.teacherPass){
          window.alert("Las contraseñas no coinciden");
        }
    
        else {
          reqManager.post('/teachers/uservalidation', {"user":this.state.formData.user}).then((res) => {
    
          if(res.data.used){
            window.alert("Ese nombre de usuario ya esta registrado");
          }
          else {
            reqManager.post('/teachers/emailvalidation', {"email":this.state.formData.email}).then((res) => {
              if(res.data.used){
                window.alert("Ese email ya esta registrado");
              }
              else {
                reqManager.post('/teachers/register', this.state.formData).then((res) => {
                  console.log(res);
                  this.props.handleNextForm()
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
                        <h2>Agregar Maestro</h2>  
                    </div>
                
                    <div className="form-tradi">
                        <div className="row-form">
                            <div className="cell">
                                <input type="text" name="firstName" value={firstName}  placeholder="Nombre" onChange={this.onChangeHandle}/>
                            </div>
                        </div>

                        <div className="row-form">
                            <div className="cell">
                                <input type="text" name="firstLastName" value={firstLastName} placeholder="Apellido Paterno" onChange={this.onChangeHandle}/>
                            </div>
                        </div>

                        <div className="row-form">
                            <div className="cell">
                                <input type="text" name="secondLastName" value={secondLastName} placeholder="Apellido Materno" onChange={this.onChangeHandle}/>
                            </div>
                        </div>

                        <div className="row-form">
                            <div className="cell">
                                <input type="text" name="user" value={user} placeholder="Nombre de usuario" onChange={this.onChangeHandle}/>
                            </div>
                        </div>

                        <div className="row-form">
                            <div className="cell">
                                <input type="text" name="email" value={email} placeholder="Correo electronico" onChange={this.onChangeHandle}/>
                            </div>
                        </div>

                        <div className="row-form">
                          <div className="cell">
                            <input type="password" name="teacherPass" placeholder="Contraseña" onChange={this.onChangeHandle}/>
                          </div>
                        </div>

                        <div className="row-form">
                          <div className="cell">
                            <input type="password" name="teacherConfirmPass" placeholder="Confirmar Contraseña" onChange={this.onChangeHandle}/>
                          </div>
                        </div>

                        <div className="row-form">
                            <div className="cell">
                                <button onClick={this.props.handleReturn}
                                className="button-form">Regresar</button>
                            </div>
                            <div className="cell">
                                <button onClick={ this.onSubmit } className="button-form">Aceptar</button>
                            </div>
                            
                        </div>
                        
                        
                    </div>
                </React.Fragment>
            );
    }
}
export default TeacherForm;