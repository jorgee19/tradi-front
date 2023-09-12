import React, { Component } from 'react';
import RemoveButton from '../components/RemoveButton.jsx';
import EditButton from '../components/EditButton.jsx';
import './Admin.css';

class AdminCard extends Component{
    render(){
        const data = this.props.data;
        let name = `${data.name} ${data.fatherLastName} ${data.motherLastName}`;
        return (
            <div className="admin-card">
                <div className="name">
                    <h3> {name} </h3>
                </div>

                <div className="info-admin">
                    <p>{`Email: ${data.email}`}</p>
                    <p>{`Telefono: ${data.phoneNumber}`}</p>
                </div>

                <div className="buttons-admin">
                    <RemoveButton handleClick={this.props.handleClickRemove}/>
                    <EditButton handleClick={this.doClickEdit}/>
                </div>
            </div>
        );
    }
    handleClickRemove = () =>{
        console.log("Remover");
    }
    doClickEdit = () =>{
        this.props.handleClickEdit();
    }
}
export default AdminCard;