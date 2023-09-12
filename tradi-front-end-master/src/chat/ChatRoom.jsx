import React, {Component} from 'react';
import firebase from './firebase';

class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputMessage: '',
            messages: []
        }
    }

    componentDidMount(){
        const {idRoom} = this.props;
        const {database} = firebase;
        database().ref(`salas/${idRoom}/messages`).on( 'value', (snap) => {
            const currentMessages = snap.val();
            if(currentMessages != null){
                this.setState({
                    messages: currentMessages
                })
            }
        });
    }

    componentDidUpdate(){
        this.scrollToBottomChat();
    }

    scrollToBottomChat = () => {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentWillUnmount(){
        const {idRoom} = this.props;
        const {database} = firebase;
        database().ref(`salas/${idRoom}/messages`).off('value');
    }

    handleMessageOnChange = (e) => {
        // console.log(e.target);
        this.setState({
            inputMessage: e.target.value
        })
    }

    handleSendClick = (e) => {
        console.log(`Send Message: ${this.state.inputMessage}`);
        this.sendMessage(() => {
            this.setState({'inputMessage': ''});
        });
    }

    sendMessage = (callback) => {
        const {database} = firebase;
        const newMessage = {
            usuario: this.props.idUser,
            id: this.state.messages.length,
            text: this.state.inputMessage
        }
        database().ref(`salas/${this.props.idRoom}/messages/${newMessage.id}`)
            .set(newMessage);
        callback();
    }



    render(){

        const MessagesList = this.state.messages.map( (chatline) => {
            const sameUserId = this.props.idUser === chatline.usuario;
            const classes = "chatroom-message" + ((sameUserId)? " chatroom-message--own" : "");

            return (
                <div key={chatline.id} className={classes}>
                    <div className="chatroom-message-container">
                        <div className="chatrooom-message-sender">
                            {chatline.usuario}
                        </div>
                        <div className="chatroom-message-text">
                            {chatline.text}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="chatroom-container">
                <div className="chatroom-header">
                    <div className="back-button-section" onClick={this.props.getBack}>
                            Regresar
                    </div>
                    <div className="chatroom-title">
                        {this.props.title}
                    </div>
                    <div className="report-button-section">
                        Reportar
                    </div>
                </div>
                <div className="chatroom-messages"
                     ref={ div => {this.messageList = div}}>
                    {MessagesList}
                </div>
                <div className="chatroom-form">
                    <input 
                        onChange={this.handleMessageOnChange}
                        value={this.state.inputMessage} 
                        placeholder="Escribe un mensaje" />
                    <button
                        type="button"
                        className="button-form button-form--alt-color"
                        onClick={this.handleSendClick}
                        >
                        Enviar
                    </button>
                </div>
            </div>
        );
    }
}

export default ChatRoom;
