import React, {Component} from 'react';
import EventMapCard from './EventMapCard.jsx';

class EventMapCardList extends Component{
  render(){
    const data = this.props.data;
    return (
      <div className="card-list">
        {
          data.map( (card) => {
            return (
              <EventMapCard onClickCard = {this.props.onClickCard}
                key= {card.id}
                data = {card}/>

            );
          })
        }
      </div>
    );
  }
}

export default EventMapCardList;
