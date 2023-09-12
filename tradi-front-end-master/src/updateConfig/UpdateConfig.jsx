import React, {Component} from 'react';
import Checkbox from '../components/Checkbox.jsx';
import './UpdateConfig.css';
import reqManager from '../libraries/reqManager';

class UpdateConfig extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: 'Actualizar Configuración',
      schoolCode: null,
      options: [{
          label: 'CHAT (Alumno - Alumno)',
          selected: false,
          idCheckbox: '1',
          changed: false,
          dbName:'alumno_alumno'
        },{
          label: 'CHAT (Alumno - Profesor)',
          selected: false,
          idCheckbox: '2',
          changed: false,
          dbName:'alumno_profesor'
        },{
          label: 'CHAT (Profesor - Profesor)',
          selected: false,
          idCheckbox: '3',
          changed: false,
          dbName:'profesor_profesor'
        },{
          label: 'CHAT (Profesor - Padre)',
          selected: false,
          idCheckbox: '4',
          changed: false,
          dbName:'profesor_tutor'
        },{
          label: 'CHAT (Profesor - Admin)',
          selected: false,
          idCheckbox: '5',
          changed: false,
          dbName:'profesor_admin'
        },{
          label: 'Grupos de Alumnos y Academicos',
          selected: false,
          idCheckbox: '6',
          changed: false,
          dbName:'galumno_profesor'
        }
      ]
    }
  }

  componentDidMount(){
    this.getChatConfig(this.props.schoolId)
    console.log("getSchool start")
    this.getSchoolCode(this.props.schoolId)
    console.log("getSchool stop")
  }



  getChatConfig = (schoolId, callback) => {
    const {options} = this.state;
    let  optionsState
    reqManager.post('/chat/getchatconfig', {'schoolId': schoolId}).then(({data}) => {
      optionsState = options.map( option => {
        option.selected = data[option.dbName]; 
        console.log("data valor:")
        console.log(option)
        return option;
      })
      console.log(optionsState)
      this.setState({'options': optionsState})
    })
  }

  updateChatConfig(schoolId, settings, callback){
    reqManager.post('/chat/updatechatconfig', {'schoolId': schoolId, 'settings': settings}).then((res) => {
        callback(res)
    }).catch(err => {
        console.log(err)
    })
}

  render(){
    const {title, options} = this.state;
    return(
      <div className="section-update-config">
        <div className="title-section">
          Escuela: 
        </div>
        <div className="options-section">
          

        <div  className='row row-options'>
          <div className="label-option">
          Código escuela: 
          </div>
          <div className="checkbox-area">
          {this.state.schoolCode}
          </div>
        </div>
          

        </div>
        <div className="title-section">
          {title}
        </div>
        <div className="options-section">
          {
            options.map((option) => {
              return(
                <div key={option.idCheckbox} className='row row-options'>
                  <div className="label-option">
                    {option.label}
                  </div>
                  <div className="checkbox-area">
                    <Checkbox checkboxData={option} 
                              onChange={this.handleCheckbox}/>
                  </div>
                </div>
              );
            })
          }
          {
            this.sendRow()
          }
        </div>
      </div>
    ) 
  }

  sendRow = () => {
    let rowSend = (
      <div className='row row-options row--send'>
        <div className="btn btn--send" onClick={this.handleUpdateConfig}>
          Guardar
        </div>
      </div>
    );
    const checkSomethingChanged = (answer, current) => {
      return answer === true || current === true;
    }
    if(this.state.options.map(e => e.changed).reduce(checkSomethingChanged)){
      return rowSend;
    }
  }

  handleCheckbox = (id) => {
    const newOptions = [...this.state.options];
    for(let index in newOptions){
      if(newOptions[index].idCheckbox === id){
        newOptions[index].selected = !(newOptions[index].selected );
        newOptions[index].changed = !(newOptions[index].changed );
      }
    }
    this.setState({options: newOptions});
  }

  handleUpdateConfig = () => {
    const settingsToSend = this.state.options.filter(element=>element.changed).map( 
      elem => {
        return {
          id: elem.idCheckbox, 
          val: elem.selected,
          dbName: elem.dbName
        }
      }
    );


    const newOptions = [...this.state.options];
    for(let index in newOptions){
      newOptions[index].changed = false;
    }
    this.setState({options: newOptions});
    console.log("settings to set: " , settingsToSend)

    this.updateChatConfig(this.props.schoolId, settingsToSend, (e)=>{
      console.log(e);
    });
  }
  

  getChatConfig = (schoolId, callback) => {
    const {options} = this.state;
    let  optionsState
    reqManager.post('/chat/getchatconfig', {'schoolId': schoolId}).then(({data}) => {
      optionsState = options.map( option => {
        option.selected = data[option.dbName]; 
        console.log("data valor:")
        console.log(option)
        return option;
      })
      console.log(optionsState)
      this.setState({'options': optionsState})
    })
  }

  getSchoolCode = (schoolId, callback) =>{
    console.log("inside getSChoolCode front: "  + schoolId)
    reqManager.post('/validations/getschoolcode/', {"schoolId":schoolId}).then(({data})=>{
      this.setState({'schoolCode':data.schoolCode})
    //callback(data.schoolCode)
    });
  }

}



export default UpdateConfig;