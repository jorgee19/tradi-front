import React, { Component } from 'react';
import AdminCard from './AdminCard.jsx';
import AddButton from '../components/AddButton.jsx';


class AdminCardList extends Component{
    render(){
        return (
            <div className="admin-list">
                <h2>Admins</h2>
                {
                    this.props.admins.map( (admin) =>{
                        return (
                            <AdminCard
                                key = {admin.id}
                                data = {admin} 
                                handleClickEdit = {this.props.handleClickEdit}
                            />
                        );
                    })
                }
                    <div className="buttons-admin">
                        <AddButton handleClick={this.props.handleClickAdd}/>
                    </div>
            </div>
        );
    }
    
}
export default AdminCardList;