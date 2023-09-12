import React, {Component} from 'react';
import reqManager from '../libraries/reqManager';

class SchoolForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      formData: {
        schoolName: '',
        neighborhood: '',
        street: '',
        numExt: '',
        numInt: '',
        postalCode: '',
        webSite: ''
        
      }
    }
  }


  onChangeHandle = ({ target }) => {

    const { formData } = this.state;

    formData[target.name] = target.value;
    
    this.setState(this.state);
  }

  onSubmit = () => {
    const toSent = this.state.formData;
    if(toSent.schoolName === "" || toSent.neighborhood === "" || toSent.street === "" || toSent.numExt === "" || toSent.postalCode === ""){
      window.alert("No lleno todos los campos");
    }
    else {
      reqManager.post('/school/register', {formData:this.state.formData,userId:this.props.userId}).then((res) => {
        this.props.handleNextForm(res.data.schoolId)
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  render(){
    return (
      <React.Fragment>
        <div className="title-form">
          <h2>Registro Escuela</h2>
        </div>
        <div className="form-tradi">
          <div className="row-form">
            <div className="cell">
              <input type="text" placeholder="Nombre de la escuela" name="schoolName" id="schoolName" value={this.state.formData.schoolName} onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <input type="text" placeholder="Colonia" name="neighborhood" id="neighborhood" value={this.state.formData.neighborhood} onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <input type="text" placeholder="Calle" name="street" id="street" value={this.state.formData.street} onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <input type="tel" placeholder="Num. exterior" name="numExt" id="numExt" value={this.state.formData.numExt} onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <input type="text" placeholder="Num. interior" name="numInt" id="numInt" value={this.state.formData.numInt} onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <input type="tel" placeholder="Código Postal" name="postalCode" id="postalCode" value={this.state.formData.postalCode} onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <input type="url" placeholder="Sitio web" name="webSite" id="webSite" value={this.state.formData.webSite} onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <button onClick={this.props.handleClickLater}
                className="button-form">Ingresar despues</button>
            </div>
            <div className="cell">
              <button onClick={this.onSubmit}
                className="button-form">Aceptar</button>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }

}

export default SchoolForm;
