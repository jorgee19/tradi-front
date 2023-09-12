/*

Cmprender todos los criterios de seguridas
tablas del segundo documento actualizadas
uas
que herramientas de seguridad usaremos
frontend

a las 11 martes 2 de julio
*/

import React, {Component} from 'react';
import FeedCardList from './FeedCardList.jsx';
import SingleCard from './SingleCard.jsx';
import AddPost from './AddPost.jsx';
import './Feed.css';
import reqManager from '../libraries/reqManager.js';

class Feed extends Component {
    state = {
        selectedCardIndex : -1,
        selectedComponent : 1,
        nextPage: 0,
        cards : [],
        maxCards: 0,
        //feedlist 1
        //singlecard 2
    }

    componentDidMount = async () => {
      const {userCode} = this.props.userData;
      this.getNextPage(userCode, this.installScroll);
      if(!isNaN(userCode)){
        this.getMaxPosts(userCode);
      }
    }

    componentWillUnmount = async () => {
      this.removeScroll();
    }

    async getMaxPosts(userCode){

      console.log(`userCode: ${userCode}`)
      reqManager.post(`/posts/list/${userCode}/1`,{}).then(({data: d}) => {
        console.info(d.count);
        // this.setState('maxCards', d.count);
        this.setState({'maxCards': Number(d.count)});
      });
    }

    async getNextPage(userCode, callback){
      const {nextPage: downloadedPage} = this.state;
      const res = await reqManager.post(`/posts/list/${userCode}/${downloadedPage}`, {});
      // Transformar y anadir las tarjetas al estado.
      // card.image
      // console.log(res.data[0]);
      let newCards = res.data.map((card) => {
        const base64ImageString = Feed.arrayBufferToBase64(card.imagen.data);
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
          title: card.titulo,
          description: card.contenido,
          image:  base64ImageString,
          date: dateCard.toLocaleDateString('es-MX', options_date)
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

    installScroll = () => {
      window.addEventListener('scroll', this.handleScroll);
    }

    removeScroll = () => {
      window.removeEventListener('scroll', this.handleScroll);
    }

    fetchMore = async () => {
      const {userCode} = this.props.userData;
      this.getNextPage(userCode, this.installScroll);
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

   

    static arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
    };

    sendNewPost = (form) => {
      const Keys = Object.keys(form);
      const data = new FormData();
      for(let key in form){
        data.append(key, form[key]);
      }
      data.append("userId", this.props.userData.userCode);
      reqManager.post('/posts/add', data, {'headers':{'Content-Type': "multipart/form-data"}}).then( res => {
        console.info(res);
      }).catch(err => {
        console.error("Agregar post dio error: `${err.errno}`");
      });
      this.handleBackClick();
    }

    

    render(){
        let renderComponent;
        const {cards, selectedCardIndex} = this.state;
        switch(this.state.selectedComponent)
        {
            case 1:
                renderComponent = <FeedCardList 
                  onClick = {this.handleSingleCardClick} 
                  addPost = {this.handleAddPostClick}
                  onScroll = {this.handleScroll}
                  cards = {this.state.cards}
                  />;
                break;
            case 2:
                let card = cards.filter( c => c.id === selectedCardIndex);
                renderComponent = <SingleCard 
                  onClick={this.handleBackClick} 
                  data = { card } />;
                break;
            case 3:
                renderComponent = <AddPost 
                  handleSummit={ this.sendNewPost } 
                  handleBackClick = {this.handleBackClick}/>;
                break;
            default:
                renderComponent = <div></div>
                console.error("Feed Render Component: Opcion no valida.")
                break;

        }
        return (
            <div className="feed-container">
                {renderComponent}
            </div>
        );
    }

    handleSingleCardClick = (id) => {
      this.setState({
          selectedCardIndex : id,
          selectedComponent : 2
      });
    }

    handleBackClick = () => {
        this.setState({
            selectedComponent : 1
        });
    }

    handleAddPostClick = () =>{
      this.setState({
        selectedComponent : 3
      })
    }

    
}
export default Feed;
