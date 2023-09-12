import React, {Component} from 'react';
import MapContainer from '../map/MapContainer.jsx';
import reqManager from '../libraries/reqManager.js'; 
class EmergencyForm extends Component{

  state ={
    formData: {
      asunto: '',
      description: '',
      place: '',
      date:'',
      schoolId:'',
      lat:'',
      lng:'',
      inside:true
    },
    date: '',
    lat:'',
    lng:''
  }
  
  onChangeHandle = ({ target }) => {

    const { formData } = this.state;

      formData[target.name] = target.value;
    this.setState(this.state);
  }
  componentDidMount(){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time; 
    this.setState({date:dateTime})
  }

  render(){
    

    const {
      asunto,
      description,
      place,
       } = this.state.formData;
    return(
      <React.Fragment>
        <div className="title-form">
          <h2>Datos de la emergencia</h2>
        </div>
        <div className="form-tradi">
          <div className="row-form">
            <div className="cell">
              <input type="text" placeholder="Asunto" name="asunto" value={asunto} onChange={this.onChangeHandle}></input>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <textarea rows="4" cols="20" placeholder="Descripcion" name="description" value={description} onChange={this.onChangeHandle}></textarea>
              </div>
          </div>
          <div className="row-form">
            <div className="cell">
              {this.props.selectedForm === 1 ? <textarea rows="4" cols="20" placeholder="Donde" name="place" value={place} onChange={this.onChangeHandle}></textarea> : <MapContainer sendCoordinates={this.selectCoordinates} />}

            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <p>Fecha: {this.state.date}</p>
            </div>
          </div>
          <div className="row-form">
            <div className="cell">
              <div className="emergency-send-selection-button" onClick={this.sendEmergency}>Enviar</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  selectCoordinates = (Selectedlat,Selectedlng) =>{
    this.setState({lat:Selectedlat, lng:Selectedlng});
  }

  sendEmergency = () =>{

    let formData = this.state.formData;
    formData.date = this.state.date; 
    formData.schoolId = this.props.schoolId;
    if(this.props.selectedForm===1){
      formData.inside=true;
    }
    else{
      formData.inside = false;
      formData.lat = this.state.lat;
      formData.lng = this.state.lng;
    }


    reqManager.post('/report/post', formData).then((res) => {
      this.props.back();
      window.alert("Alerta enviada");
    }).catch((error) => {
      console.log(error)
    }) 
  }
  
}

export default EmergencyForm;
