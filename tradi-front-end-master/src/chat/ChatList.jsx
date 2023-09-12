import React, { Component } from 'react';

import firebase from './firebase';

const {database} = firebase;


class ChatList extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            chatList: []
        }
    }

    componentDidMount(){
        const {idUser} = this.props;
        database().ref(`usuarios/${idUser}`).on('value', (snap) => {
            let currentChats = snap.val();
            // console.log(currentChats.salas);
            if(currentChats != null){
                this.setState({chatList: currentChats.salas});
            }
        });
    }

    componentWillUnmount(){
        const {idUser} = this.props;
        database().ref(`usuarios/${idUser}`).off('value');
    }

    // handleClickList = (room, nombre) => {
    //     this.props.setActiveChat(room, nombre);
    // }

    render(){
        const chatRows = this.state.chatList.map( (room) => {
            return (<ChatListElement 
                key={room.idRoom}
                roomId={room.idRoom}
                nombre={room.nombre}
                setActiveChat={this.props.setActiveChat}
            />);
        })

        return(
            <div className="chatlist-container">
                <div className="chatlist">
                    {chatRows}
                </div>
                <div className="chatlist-bottom">
                    <div className="button-agregar" onClick={this.props.showContactList}>
                        Agregar Chat
                    </div>
                </div>
            </div>
            
        );
    }
}

class ChatListElement extends Component{
    handleClick = () => {
        const {setActiveChat, roomId, nombre} = this.props;
        setActiveChat(roomId, nombre);
    }

    render(){
        return(
            <div className="chatlist-element" onClick={this.handleClick}>
                <div className="nombre-chat">
                    {this.props.nombre}
                </div>
            </div>
        );
    }
}

export default ChatList;