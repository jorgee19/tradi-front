import React, {Component} from 'react';
import reqManager from '../libraries/reqManager';
import firebase from './firebase';

class ChatAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            contacts: []
        }
    }

    componentDidMount(){
        reqManager.post('/chat/contacts', {idUser: this.props.idUser}).then( (res) => {
            //console.log(res.data);
            let contacts = res.data.map(contact => {
                return ({
                 name: `${contact.nombre} ${contact.apellidopaterno} ${contact.apellidomaterno}`,
                 type: 'T',
                 id: contact.usuario   
                });
            })
            if(contacts !== null){
                this.setState({'contacts': contacts});
            }
            //console.log('Obtuve Respuesta');
        });
    }

    handleClickContact = (idUser, nombre) => {
        console.log(`Want to sent message to idUser: ${idUser} ${nombre}`);
        this.createRoom((key) => {
            this.addRoomToUser(key, nombre, this.props.idUser);
            this.addRoomToUser(key, this.props.nameUser, idUser);
            this.props.openChat(key, nombre);
        })
    }

    createRoom = (callback) => {
        const {database} = firebase;
        let newRoom = database().ref('salas/').push();
        let keyRoom = newRoom.getKey();
        callback(keyRoom)
    }

    addRoomToUser = (roomId, roomName, userId) => {
        const {database} = firebase;
        database().ref(`usuarios/${userId}/salas`).once('value', snap => {
            let allRooms = snap.val();
            if(allRooms != null){
                allRooms = Object.values(allRooms)
            } else {
                allRooms = [];
            }
            allRooms.push({idRoom: roomId, nombre: roomName});
            database().ref(`usuarios/${userId}/salas`).set(allRooms);
        })
    }


    render(){
        const ContactList = this.state.contacts.map(contact => {
            return (
                <ContactListElement
                    key={contact.id}
                    nombre={contact.name}
                    tipoDeUsuario={contact.type}
                    idUser={contact.id}
                    handleClickContact={this.handleClickContact} />
            );
        })

        return (
            <div className="chat-contacts">
                <div className="chat-contact-header">
                    <div className="back-button" onClick={this.props.getBack}>
                        Regresar
                    </div>
                    <div className="chat-contact-title">
                        Contactos
                    </div>
                </div>
                <div className="chat-contacts-list">
                    {ContactList}
                </div>
                
            </div>
        )

    }
}

class ContactListElement extends Component{
    //<div className="contact-list-type">
    //{this.props.tipoDeUsuario}
    //</div>
    render(){
        return(
            <div className="contact-list-row" onClick={this.handleClick}>
                
                <div className="contact-list-name">
                    {this.props.nombre}
                </div>
            </div>
        )
    }

    handleClick = () => {
        this.props.handleClickContact(this.props.idUser, this.props.nombre);
    }
}

export default ChatAdd;