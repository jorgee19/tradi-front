import React, {Component} from 'react';

class RoundButton extends Component {
    render(){
        return (
                <div className="icon-head icon" onClick={this.props.onClick}>
                    {this.props.children}
                </div>
        );
    }
}

export default RoundButton;
