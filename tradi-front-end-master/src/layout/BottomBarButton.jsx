import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BottomBarButton extends Component{
  state = {

  };

  render(){

    return(
      <div className="icon" >
        <FontAwesomeIcon icon={this.props.iconProp} />
      </div>
    );
  }


  //<img src={this.props.imagesrc} alt={this.props.desc}/>

}
export default BottomBarButton;
