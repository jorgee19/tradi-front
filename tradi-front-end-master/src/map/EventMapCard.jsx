import React, {Component} from 'react';

class EventMapCard extends Component{

  render()
  {
    const data = this.props.data;


    return(
      <div className="card" onClick={this.handleSingleCardClick} >
        <div className="card-info">
          <h2 className="card-title">Asunto: {data.title}</h2>
          <h3 className="card-title"> Descripcion: {data.description}</h3>
          <h3 className="card-title"> Lugar: {data.place}</h3> 
          <div className="card-date">Fecha: {data.date}</div>
        </div>
      </div>
    );
  }

  handleSingleCardClick = () => {
    this.props.onClickCard(this.props.data.latitude,this.props.data.longitude); 
  }

}
export default EventMapCard;
