import React, {Component} from 'react';
import util from '../libraries/Util'

class ReportCard extends Component{
    render(){
        const {data} = this.props;
        return(
            <div className="single-teacher">
                <div className="single-name">
                    <h3>{util.capitalize(data.name, data.fatherLastName, data.motherLastName)} </h3>
                </div>

                <div className="info-teacher">
                    <p>{data.message}</p>
                </div>
            </div>
        );
    }
}
export default ReportCard;
