import React, {Component} from 'react';
import ReportCard from './ReportCard.jsx';

class ReportCardList extends Component{
    render(){
        return(
          <React.Fragment>
              <h2>Reportes</h2>
              <div className="teacher-list">
              {
                  this.props.data.map( (report) => {
                      return (
                          <ReportCard
                              key = {report.id}
                              data = {report}
                          />
                      );
                  })
              }
              </div>
            </React.Fragment>
        )
    }
}

export default ReportCardList;
