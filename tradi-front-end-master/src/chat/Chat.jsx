import React, {Component} from 'react';

import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import ChatAdd from './ChatAdd';

import './Chat.css';
// import firebase from './firebase';

const CHAT_LIST = 0;
const CHAT_ROOM = 1;
const CHAT_ADD  = 2;

class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            'SCREEN': CHAT_LIST,
            'roomId': '',
            'roomTitle': ''
        }
    }

    changeToRoom = (roomId, roomTitle) => {
        console.log(roomId, roomTitle);
        this.setState({
            'roomId': roomId,
            'roomTitle': roomTitle,
            'SCREEN': CHAT_ROOM
        });
    }

    changeToChatList = () => {
        this.setState({
            'SCREEN': CHAT_LIST
        });
    }

    changeToContactList = () => {
        this.setState({
            'SCREEN': CHAT_ADD
        })
    }

    render(){
        const {userData} = this.props;
        const {SCREEN, roomId, roomTitle} = this.state;
        const idUser = userData.userId;
        const nameUser = `${userData.nombre} ${userData.apaterno} ${userData.amaterno}`;
        // const nameUser = userData.nombre + ' ' + userData.apaterno + ' ' + userData.amaterno;
        let Element;
        switch(SCREEN){
            case CHAT_LIST:
                // return JSX of ChatList
                Element = <ChatList 
                            idUser={idUser} 
                            setActiveChat={this.changeToRoom}
                            showContactList={this.changeToContactList}
                            />
                break;
            case CHAT_ROOM:
                // return JSX of ChatRoom
                Element = <ChatRoom 
                            idRoom={roomId}
                            title={roomTitle}
                            idUser={idUser}
                            getBack={this.changeToChatList}
                            />
                break;
            case CHAT_ADD:
                Element = <ChatAdd
                           idUser={idUser}
                           nameUser={nameUser}
                           getBack={this.changeToChatList}
                           openChat={this.changeToRoom}
                           />

                // return JSX ChatAdd
                break;
            default:
                Element = <div></div>
                console.error('En pantalla equivocada en Chat');
                break;
        }

        return (
            <div className="chat-container">
                {Element}
            </div>
        )
    }

}

export default Chat;