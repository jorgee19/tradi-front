import React, {Component} from 'react';
import reqManager from '../libraries/reqManager.js';
import { Document , Page} from 'react-pdf/dist/esm/entry.webpack';
import Axios from 'axios'

const UPLOAD_SCREEN = 0;
const SHOW_SCREEN = 1;

class PDFView extends Component{
 
  state = {
    formData: {
      file:''
    },
    numPages: null,
    pageNumber: 1,
    screen: SHOW_SCREEN,
    fileUrl:null
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  onChangeHandleImage = (e)=>{
    const {formData} = this.state
    formData.file = e.target.files[0];

    this.setState({
        formData
    });
}

downloadManual = async () =>{ 
  let r = await Axios.get('http://localhost:5000/manual/get/'+this.props.schoolId, {'responseType':'blob','timeout':30000});
  let urlR = URL.createObjectURL(r.data)
  this.setState({'fileUrl':urlR})
}

componentDidMount(){
  this.schoolHasManual((res) => {
    if(res.hasManual ){ 
      this.downloadManual()
      
      this.setState({'screen': SHOW_SCREEN})
    }
    else{ 
      this.setState({'screen': UPLOAD_SCREEN})
    }

    
    
  });
}
 
 
  render() {

    let currentScreen = (<div></div>)
    switch (this.state.screen) {
      case SHOW_SCREEN:


          
        const { pageNumber, numPages } = this.state;

        currentScreen = 
        (
          <React.Fragment>
            <div>
              <Document
                 file = {this.state.fileUrl}
      
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>Page {pageNumber} of {numPages}</p>
              <div  className="buttons-wrapper">
                <button className="button-form" onClick={this.onClickIncreasePage}>Siguiente</button>
              </div>
              <div className="buttons-wrapper">
                <button className="button-form" onClick={this.onClickDecreasePage}>Anterior</button>
              </div>
            </div>

            
            <div className="title-form">
                <h2>Cambiar manual en pdf</h2> 
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
                        <button className="button-form" onClick={this.onClickAddManual }>Subir</button>
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
                <h2>Subir manual en PDF</h2> 
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
                        <button className="button-form" onClick={this.onClickAddManual }>Subir</button>
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

  onClickIncreasePage  = () => {
    const {pageNumber} = this.state;
    if(pageNumber < this.state.numPages ){
      this.setState({'pageNumber' : pageNumber + 1 })
    }
  }

  onClickDecreasePage = () => {
    const {pageNumber} = this.state;
    
    if(pageNumber > 1 ){
      this.setState({'pageNumber' : pageNumber - 1 })
    }
  }

  schoolHasManual = (callback) => {
    reqManager.post('/manual/schoolhasmanual', {"schoolId":this.props.schoolId}).then(({data})=>{
      callback( data)
    })
  }

  sendManual = (form) => {
    const Keys = Object.keys(form);
    const data = new FormData(); 
    for(let key in form){
      data.append(key, form[key]);
    }
    data.append("schoolId", this.props.schoolId);
    reqManager.post('/manual/add', data, {'headers':{'Content-Type': "multipart/form-data"}}).then( res => {
      console.info(res);
      this.downloadManual();
    }).catch(err => {
      console.error("Agregar manual dio error: `${err.errno}`");
    });
    
    this.setState({'screen':SHOW_SCREEN})
  }

  onClickAddManual = () => {
    this.sendManual(this.state.formData);
}
 
}
export default PDFView;
