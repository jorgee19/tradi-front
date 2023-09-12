import React, {Component} from 'react';

class SideProfile extends Component {
  
  // constructor(props){
  //   super(props);
  // }

  render(){
    return (
      <div className="side-bar__side-profile secondary-color--light">
        <div className="side-profile__image round-image">
          <img src={ this.props.profile.url } alt='profile-user'/>
        </div>
        <div className="side-profile__name h3-text">
          { this.props.profile.nombre}
        </div>
      </div>
    );
  }
}

export default SideProfile;