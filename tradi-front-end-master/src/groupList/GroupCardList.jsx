import React, {Component} from 'react';
import GroupCard from './GroupCard.jsx'
import AddButton from '../components/AddButton.jsx';

class GroupCardList extends Component{

  render(){
    const data = this.props.data;
    

    return(
      <React.Fragment>
        <div className="card-list">
          <h2>Grupos</h2>
          {
            data.map( (group) => {
              return (
                <GroupCard
                  reset = {this.reset}
                  userData = {this.props.userData}
                  key= {group.id}
                  data = {group}
                  handleScreen = { /*(this.data.type=='S')?e=>{} :*/this.props.handleScreen} reset = {this.reset}//ternario para evitar enviar el evento que muestra listas de alumnos
                  isPopUp = {this.props.isPopUp}/>

              );
            })
          }
        </div>
        {this.props.isPopUp ?
          <div> </div> :
          <div className="buttons-group">
            <AddButton handleClick={this.props.onClickAdd}/>
          </div>
        }

      </React.Fragment>
    );




  }

  reset = this.props.reset

  


}

export default GroupCardList;
