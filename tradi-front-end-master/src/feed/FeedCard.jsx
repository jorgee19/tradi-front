import React, {Component} from 'react';

class FeedCard extends Component{


  /*renderCardList = () => {
    cards.map(card => return )
  }
*/
  render()
  {
    const {data} = this.props;
    let shortDescription = data.description;
    if(shortDescription.length > 240) {
      shortDescription = shortDescription.slice(0, 300) + "...";
    }
    let imageComponent = "";
    if(data.image !== null)
    {
      // imageComponent = (
      //   <div className="image-thumbnail">
      //     <img src={data.image } alt="imagen" />
      //   </div>
      // );

      imageComponent = (
        <div className="image-thumbnail">
          <img src={`data:image/jpg;base64, ${data.image}`} />
        </div>
      );

    }
    return(
      <div className="card" onClick={this.handleSingleCardClick}>
        {imageComponent}
        <div className="card-info">
          <h3 className="card-title">{data.title}</h3>
          <div className="card-date">{data.date}</div>
          <p className="card-description">{shortDescription}</p>
        </div>
      </div>
    );
  }

  handleSingleCardClick = () => {
    this.props.onClick(this.props.data.id);
  }

}
export default FeedCard;
