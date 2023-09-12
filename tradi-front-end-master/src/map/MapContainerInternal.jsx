import React, {Component} from 'react';
import reqManager from '../libraries/reqManager';

const UPLOAD_SCREEN = 0;
const SHOW_SCREEN = 1;

class MapContainerInternal extends Component{
  constructor(props){
    super(props);
    this.state = {
      formData: {
        file:''
      },
    screen: SHOW_SCREEN,
    image:''
    }
  }

  componentDidMount(){
    this.schoolHasMap((res) => {
      if(res.hasMap ){ 

        this.getSchoolMap();
        
        
        this.setState({'screen': SHOW_SCREEN})
      }
      else{ 
        this.setState({'screen': UPLOAD_SCREEN})
      }
  
      
      
    });
  }

  render(){

    let currentScreen = (<div></div>)
    switch (this.state.screen) {
      case SHOW_SCREEN:

        currentScreen = 
        (
          <React.Fragment>

            <div className="school-image">
              
              <img src={`data:image/jpg;base64, ${this.state.image}`} alt="imagen" />
            </div>
            
            <div className="title-form">
                <h2>Cambiar imagen del mapa</h2> 
            </div>
            <div className="form-tradi">
                <div className="row-form">
                    <div className="cell">
                        <input  type="file" 
                                name="imagen"  
                                id="imagen" 
                                onChange={this.onChangeHandleImage} />
                    </div>
                </div>

                <div className="row-form">

                    <div className="cell">
                        <button className="button-form" onClick={this.onClickAddMap }>Subir</button>
                    </div>
                    
                </div>
                
                
            </div>
          </React.Fragment>
        );


        break;
      case  UPLOAD_SCREEN:
        currentScreen=
        (
          <React.Fragment>
            <div className="title-form">
                <h2>Subir imagen del mapa</h2> 
            </div>
            <div className="form-tradi">
                <div className="row-form">
                    <div className="cell">
                        <input  type="file" 
                                name="imagen"  
                                id="imagen" 
                                onChange={this.onChangeHandleImage} />
                    </div>
                </div>

                <div className="row-form">

                    <div className="cell">
                        <button className="button-form" onClick={this.onClickAddMap }>Subir</button>
                    </div>
                    
                </div>
                
                
            </div>
          </React.Fragment>
        )
        break;
    
      default:
        break;
    }
 
    return currentScreen;
    
  }

  schoolHasMap = (callback) => { 
    reqManager.post('/map/schoolhasmap', {"schoolId":this.props.schoolId}).then(({data})=>{
      
      callback( data)
    })
  }

  getSchoolMap = () => {
    reqManager.post('/map/get', {"schoolId":this.props.schoolId}).then(({data})=>{
      this.setState({'image':MapContainerInternal.arrayBufferToBase64(data.mapa.data)})
    })
  }

  onChangeHandleImage = (e)=>{
    const {formData} = this.state
    formData.file = e.target.files[0];
    this.setState({
        formData
    });
  }

  onClickAddMap = () => {
    this.addImage(this.state.formData);
  }

  addImage = (form) => {
    const Keys = Object.keys(form);
    const data = new FormData();
    for(let key in form){
      data.append(key, form[key]);
    }
    data.append("schoolId", this.props.schoolId);
    reqManager.post('/map/add', data, {'headers':{'Content-Type': "multipart/form-data"}}).then( res => {
    //console.info(res);
    }).catch(err => {
      console.error("Agregar post dio error: `${err.errno}`");
    });
    this.getSchoolMap()
    this.setState({'screen': SHOW_SCREEN})
  }

  static arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

}

export default MapContainerInternal;

