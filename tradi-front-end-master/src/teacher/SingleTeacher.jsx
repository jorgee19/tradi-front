import React, {Component} from 'react';
import './Teacher.css';
import RemoveButton from '../components/RemoveButton.jsx';
import Util from '../libraries/Util.js';
import reqManager from '../libraries/reqManager';


class SingleTeacher extends Component{

    onClickRemove = () =>{
        this.props.handleClickRemove(this.props.data.id)
      }

    render(){
        const {data} = this.props;
        let printName = Util.capitalize(data.name, data.fatherLastName, data.motherLastName);
        let fullComponent;
        const single = <React.Fragment>
                          <div className="single-name">
                              <h3>{printName}</h3>
                          </div>

                          <div className="info-teacher">
                              <p>{`Email: ${data.email}`}</p>
                          </div>
                          {this.props.isPopUp ?
                            <div></div>:
                            <div className="buttons-teacher">
                                <RemoveButton handleClick={this.onClickRemove}/>
                            </div>
                          }
                       </React.Fragment>;
        if(this.props.isPopUp){
          fullComponent = <div className="single-teacher" onClick={this.props.handleConfirmPopUp}>
                            {single}
                          </div>
        }
        else{
          fullComponent = <div className="single-teacher">
                            {single}
                          </div>
        }

        return(fullComponent);
    }


}
export default SingleTeacher;
