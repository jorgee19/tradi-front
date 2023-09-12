import React, {Component} from 'react';
import AdminForm from './AdminForm.jsx';
import ParentForm from './ParentForm.jsx';
import StudentForm from './StudentForm.jsx';
class UserSingUpForm extends Component {
  state = {
    type:3
  }

  render(){

    return(
      <React.Fragment>
        {
          this.selectForm()
        }

      </React.Fragment>


    );
  }

  selectForm = () => {

    if(this.state.type === 1) {
        return <AdminForm/>
    }
    else if(this.state.type === 2) {
        return <ParentForm/>
    }
    else if(this.state.type===3) {
        return <StudentForm/>
    }
  }

}

export default UserSingUpForm;
