import React, {Component} from 'react';
import reqManager from '../libraries/reqManager.js';
import MapContainer from './MapContainer.jsx';
import EventMapCardList from './EventMapCardList.jsx';

class ExternalMap extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      locations: props.locations,
      nextPage: 0,
      cards : [],
      maxCards: 0,
      latitude:0,
      longitude:0
    }
  }

  render(){
    return (
      <React.Fragment>
        <div class='google-maps-wrapper'>
          <MapContainer lat={this.state.latitude} lng={this.state.longitude} />
        </div>
        <EventMapCardList data={this.state.cards}
                  onScroll = {this.handleScroll}
                  onClickCard = {this.onClick} />
      </React.Fragment>
    );
  }


  fetchMore = async () => {
    const {userCode} = this.props.userData;
    this.getNextPage(userCode, this.installScroll);
  } 

  removeScroll = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  installScroll = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const {innerHeight} = window;
    const {scrollTop, offsetHeight} = document.documentElement;
    // console.info(`${scrollTop + innerHeight} !== ${offsetHeight}`);
    if(scrollTop + innerHeight === offsetHeight){
      console.info("Fetch More Items");
      this.fetchMore();
      this.removeScroll();
    }
  }

  componentDidMount = async () => {
    const {userCode} = this.props.userData;
    this.getNextPage(userCode, this.installScroll);
    this.getMaxPosts(userCode);
  }

  componentWillUnmount = async () => {
    this.removeScroll();
  }

  async getMaxPosts(userCode){
    reqManager.post(`/report/outside/list/${userCode}/1`,{}).then(({data: d}) => {
      console.info(d.count);
      // this.setState('maxCards', d.count);
      this.setState({'maxCards': Number(d.count)});
    });
  }

  async getNextPage(userCode, callback){
    const {nextPage: downloadedPage} = this.state; 
    const res = await reqManager.post(`/report/outside/list/${userCode}/${downloadedPage}`, {});
    let newCards = res.data.map((card) => {
      let dateCard = new Date(card.date_part * 1000);
      const options_date = { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric'
      };

      return {
        id: card.id ,
        title: card.asunto,
        description: card.descripcion, 
        place: card.lugar, 
        date: dateCard.toLocaleDateString('es-MX', options_date),
        latitude: card.latitude,
        longitude: card.longitude
      };

    });

    const {cards: Cards} = this.state;
    const UpdatedCards = Cards.concat(newCards);
    console.log(UpdatedCards);
    this.setState({"cards": UpdatedCards, "nextPage": downloadedPage + 1})
    if( this.state.cards.length !== this.state.maxCards){
      console.info(this.state.cards.length, this.state.maxCards);
      callback();    
    } else {
    }
      
  }

  onClick = (lat,lon) =>{
    this.setState({latitude:lat,longitude:lon})
  }

  

}

export default ExternalMap;