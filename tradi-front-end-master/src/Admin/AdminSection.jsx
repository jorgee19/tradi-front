import React, { Component } from 'react';
import AdminCardList from './AdminCardList.jsx';
import AddAdmin from './AddAdmin';
import EditAdmin from './EditAdmin';

class AdminSection extends Component{
    state = {
        selectedComponent : 1,
        admins: [
            {
                id:1,
                name: "Rodolfo",
                fatherLastName: "Hernandez",
                motherLastName: "Gutierrez",
                email: "rohegu@gmail.com",
                phoneNumber: "5434985431"
            },
            {
                id:2,
                name: "Enrique",
                fatherLastName: "Gonzalez",
                motherLastName: "Lopez",
                email: "engolo@gmail.com",
                phoneNumber: "3309568542"
            },
            {
                id:3,
                name: "Alfredo",
                fatherLastName: "Esparza",
                motherLastName: "Muñoz",
                email: "alesmu@gmail.com",
                phoneNumber: "3385430125"
            },
            {
                id:4,
                name: "Raul",
                fatherLastName: "Martínez",
                motherLastName: "Gonzalez",
                email: "ramago@gmail.com",
                phoneNumber: "3309854729"
            },
            {
                id:5,
                name: "Andrea",
                fatherLastName: "Padilla",
                motherLastName: "Aldapa",
                email: "anpaal@gmail.com",
                phoneNumber: "3387540193"
            }
        ]
        //list Admins 1
        //add Admin 2
        //edit Admin 3

    }
    render(){
        let renderComponent;
        switch(this.state.selectedComponent){
            case 1:
                renderComponent = <AdminCardList admins={this.state.admins} handleClickAdd={this.handleClickAddAdmin}
                handleClickEdit={this.handleClickEdit}/>
                break;
            case 2:
                renderComponent = <AddAdmin onClick={this.handleBackClick}/>
                break;
            case 3:
                renderComponent = <EditAdmin onClick={this.handleBackClick}/>
                break;
            default:
                renderComponent = <div> </div>

        }
        return(
            <div className="admin-container">
                {renderComponent}
            </div>
        );
        /*
        return(
            <div className="admin-container">

                <h2>Admins</h2>

                <AdminCardList admins={this.state.admins}/>

                <div className="buttons-admin">
                    <AddButton handleClick={this.handleClickAdd}/>
                </div>
            </div>
        );
        */
    }
    handleClickAddAdmin = () =>{
        this.setState({
            selectedComponent: 2
        });
        console.log("agregar");
    }

    handleBackClick = () => {
        this.setState({
            selectedComponent : 1
        });
    }

    handleClickEdit = () =>{
        this.setState({
            selectedComponent: 3
        });
    }
}
export default AdminSection;
