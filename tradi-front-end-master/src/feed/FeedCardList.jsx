import React, {Component} from 'react';
import FeedCard from './FeedCard'
import AddButton from '../components/AddButton.jsx';

class FeedCardList extends Component{
  state = {

    }

  render(){
    return(     
      <div className="card-list" onScroll={this.props.onScroll}>
        {
          this.props.cards.map( (card) => {
            return (
              <FeedCard
                key= {card.id}
                data = {card}
                onClick = {this.props.onClick} />
            );
          })
        }
          <div className="buttons-feed">
            <AddButton handleClick={this.props.addPost}/>
          </div>
      </div>



    )

    
  }

}
export default FeedCardList;
