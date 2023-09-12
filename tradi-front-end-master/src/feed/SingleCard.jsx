import React, { Component } from "react";
import './SingleCard.css'

class SingleCard extends Component{

    render(){
        const data =this.props.data[0];

        let imageComponent = "";
        if(data.image !== null)
        {
          imageComponent = (
            <div className="single-image">
              <img src={`data:image/jpg;base64, ${data.image}`} alt="imagen" />
            </div>
          );
        }
        return (
            <div className="single-card">
                <div className="single-title">
                    <h3>{data.title}</h3>
                </div>

                <div className="single-date">
                    <p>{data.date}</p>
                </div>

                <div className="single-description">
                    <p>{data.description}</p>
                </div>

                {imageComponent}
                <button
                  type="button"
                  className="button-form button-form--alt-color"
                  onClick={this.props.onClick}>
                  Regresar
                </button>

            </div>
        );
    }
}
export default SingleCard;
