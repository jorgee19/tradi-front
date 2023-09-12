import React, {Component} from 'react';

class AddTeacher extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="title-form">
                    <h2>Agregar Maestro</h2>  
                </div>
            
                <div className="form-tradi">
                    <div className="row-form">
                        <div className="cell">
                            <input type="text" placeholder="Nombre"/>
                        </div>
                    </div>

                    <div className="row-form">
                        <div className="cell">
                            <input type="text" placeholder="Apellido Paterno"/>
                        </div>
                    </div>

                    <div className="row-form">
                        <div className="cell">
                            <input type="text" placeholder="Apellido Materno"/>
                        </div>
                    </div>

                    <div className="row-form">
                        <div className="cell">
                            <input type="text" placeholder="Correo electronico"/>
                        </div>
                    </div>

                    <div className="row-form">
                        <div className="cell">
                            <input type="text" placeholder="Telefono"/>
                        </div>
                    </div>

                    <div className="row-form">
                        <div className="cell">
                            <button onClick={this.props.handleNextForm}
                            className="button-form">Regresar</button>
                        </div>
                        <div className="cell">
                            <button onClick={ this.props.handleClick } className="button-form">Aceptar</button>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </React.Fragment>
        );
    }
}
export default AddTeacher;