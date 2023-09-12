import React, {Component} from 'react';
import RemoveButton from '../components/RemoveButton.jsx';
import reqManager from '../libraries/reqManager';
const  STUDENTSCREEN = 2;

class GroupCard extends Component{

    render(){
      const data = this.props.data;
      return(
        <div className="single-group" >
          <div className="card-info" onClick={this.selectGroup}>
            <h3 className="card-title">{data.name}</h3>
          </div>
          {this.props.userData.userType=='S'?
            <div> </div> :
            <div className="buttons-group">
                <RemoveButton handleClick={this.handleClickRemove}/>
            </div>
          }

        </div>

      );
    }
    selectGroup = () =>{
      if(this.props.isPopUp){
      }
      else {
        this.props.handleScreen(STUDENTSCREEN , this.props.data.id)
      }
    }

    handleClickRemove = () =>{
      this.deleteGroup(this.props.data.id, this.props.data.code)
      this.props.reset()
    }

    
    deleteGroup = (id, code)=>{
      reqManager.post('/group/deletegroup', {"groupID":id, "groupCode":code})
    }


}
export default GroupCard;
