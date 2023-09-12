import React, {Component} from 'react';
import reqManager from '../libraries/reqManager';

class AddGroup extends Component{
    state={
        codigo:''
    }

    onChangeHandle = ({ target }) => {

        let codigo = target.value;
        
        this.setState({
          'codigo':codigo
        });
      }

    render(){
        return(
            <React.Fragment>
                <div className="title-form">
                    {
                        this.props.userData.userType == 'S'?
                        <h2>Ingresa el codigo del grupo a entrar</h2>:<h2>Agregar Grupo</h2> 
                    } 
                </div>
            
                <div className="form-tradi">
                    <div className="row-form">
                        <div className="cell">
                            <input type="text" placeholder="Nombre" name="codigo" value={this.codigo} id="codigo" onChange={this.onChangeHandle}/>
                        </div>
                    </div>

                    <div className="row-form">
                        <div className="cell">
                            <button onClick={this.props.onClickBack} className="button-form">Regresar</button>
                        </div>
                        <div className="cell">
                            <button onClick={ this.handleAddGroup } className="button-form">Aceptar</button>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </React.Fragment>
        );
    }

    handleAddGroup = (callback)=>{
        if(this.props.userData.userType == 'S'){
            reqManager.post('/group/addstudentgroup', {"userId":this.props.userData.userCode, "groupId":this.state.codigo}).then(({data})=>{
                if(data.validated!=false){
                    window.alert("Ya fuiste agregado al grupo")

                }
                else{
                    window.alert("El codigo de grupo ingresado es repetido o no pertenece a esta escuela")
                }
                this.props.onClickBack()
            });
        }
        else{
            reqManager.post('/group/addgroup', {"userId":this.props.userData.userCode, "className":this.state.codigo}).then(({data})=>{
                window.alert("Grupo creado")
                this.props.onClickBack()
            });
        }  
    }

      addSchoolToTeacher = (schoolId, userId)=>{
        reqManager.post('/teachers/addschool', {"schoolId":schoolId, "userId":userId})
      }

}
export default AddGroup;