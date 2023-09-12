import React, {Component} from 'react';
import ReportCardList from './ReportCardList.jsx'
import reqManager from '../libraries/reqManager';

const  SINGLESCREEN = 2;
const  LISTSCREEN = 1;
class ReportSection extends Component{

  state = {
    screen : LISTSCREEN,
    report : -1,
    data:[]
  }; 


  getReports = (callback)=>{
    reqManager.post('/report/getreports', {"schoolId":this.props.schoolId}).then(({data})=>{

      const report = data.map((row)=>{
        
        return {
            id:row.mensajeid,
            name: row.nombre,
            fatherLastName: row.apellidopaterno,
            motherLastName: row.apellidomaterno,
            message: row.mensaje
        }
      });
      console.log(report)
      this.setState({"data":report})
    })
  }
  
  componentDidMount(){
    this.getReports(this.props.schoolId)
  }

  render(){
    let displayScreen;
    switch(this.state.screen){
      case LISTSCREEN:
        displayScreen =<ReportCardList data = {this.state.data}/>;
        break;
      case SINGLESCREEN:
        displayScreen = <div> </div>
        break;
      default:
        displayScreen = <div> </div>;

    }

    return (
      <div className="teacher-container">
          {displayScreen}
      </div>
    );
  }

}

export default ReportSection;
