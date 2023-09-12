import React, {Component} from 'react';
import reqManager from '../libraries/reqManager';


class AddPost extends Component{

    state = {
        formData: {
            titulo:'',
            contenido:'',
            file:''
        }
    }

    onChangeHandle = ({ target }) => {
        const { formData } = this.state;
        formData[target.name] = target.value;
        this.setState(this.state);
    }

    onChangeHandleImage = (e)=>{
        const {formData} = this.state
        formData.file = e.target.files[0];
        this.setState({
            formData
        });
    }

    onClickAddPost = () => {
        this.props.handleSummit(this.state.formData);
    }

    render(){
        return(
            <React.Fragment>
                <div className="title-form">
                    <h2>Nuevo Post</h2> 
                </div>
                <div className="form-tradi">
                    <div className="row-form">
                        <div className="cell">
                            <input  type="text" 
                                    placeholder="Titulo" 
                                    name="titulo" 
                                    value={this.titulo} 
                                    id="titulo" 
                                    onChange={this.onChangeHandle}/>
                        </div>
                    </div>
                    <div className="row-form">
                        <div className="cell">
                            <textarea   cols="40" 
                                        rows="5" 
                                        placeholder="contenido..." 
                                        name="contenido" 
                                        value={this.contenido} 
                                        id="contenido" 
                                        onChange={this.onChangeHandle}>
                                    </textarea>
                        </div>
                    </div>
                    <div className="row-form">
                        <div className="cell">
                            <input  type="file" 
                                    name="imagen"  
                                    id="imagen" 
                                    onChange={this.onChangeHandleImage} />
                        </div>
                    </div>

                    <div className="row-form">
                        <div className="cell">
                            <button className="button-form" 
                                    onClick={ this.props.handleBackClick }>
                                        Regresar
                                </button>
                        </div>
                        <div className="cell">
                            <button className="button-form" onClick={this.onClickAddPost }>Enviar</button>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </React.Fragment>
        );
    }
    
}
export default AddPost;