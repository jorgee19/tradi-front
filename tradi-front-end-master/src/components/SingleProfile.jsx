import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';

import './SingleProfile.css';

class SingleProfile extends Component {
  
  constructor(props){
    super(props);
  }

  render(){
    const { profileImage, firstName, lastName, email, phone, userId, father} = this.props.viewProfile;
    const { showEmails, showPhone, ableSendMessages } = this.props.settings
    const { userId: ownUserId} = this.props.user;

    const urlProfileImage = "data:image/jpg; base64, " + profileImage;
    const altProfileImage = "thumbnail-profile-" + userId;
    const mailtoEmail = "mailto:"+email;

    const emailProfile = (<a href={ mailtoEmail }>{email}</a>);
    const phoneProfile = <a href={"tel:" + phone}>{phone}</a>;
    const updateProfile = <FontAwesomeIcon icon={faCog} onClick={this.handleClickUpdatePassword}/>;
    const sendMessageBtn = <div className="btn btn--send-message" onClick={this.handleMessage}>Enviar Mensaje</div>;

    return (
      <div className="single-profile">
        <div className="overlay"></div>
        <div className="single-profile-section">
          <div className="single-profile-container">
            <div className="first-row row-profile">
              <div className="image-profile">
              <img src={urlProfileImage} alt={altProfileImage} className="rounded thumbnail"/>
            </div>
            <div className="user-info">
              <div className="name">
                {firstName} {lastName}
              </div>
              <div className="email">
                { (showEmails) ? emailProfile : null }
              </div>
            </div>
          </div>
          <div className="row-profile second-row">
            <div className="update-data">
              {(userId === ownUserId ) ? updateProfile : null}
              
            </div>
            <div className="phone-text">
              { (showPhone) ? phoneProfile : null }
            </div>
            <div className="send-message">
              { (ableSendMessages && userId !== ownUserId) ? sendMessageBtn : null }
            </div>
          </div>
        </div>
        </div>
        
      </div>
    );
  }

  handleClickUpdatePassword = () => {
    this.props.updateProfile(this.props.user.userId);
  }
  handleMessage = () => {
    const { userId: from } = this.props.user;
    const { userId: to} = this.props.viewProfile;
    this.props.sendMessage(from, to);
  }
}

export default SingleProfile;