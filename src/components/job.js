import React, { Component } from 'react';

class Job extends Component {


  async componentDidMount() {
    await this.loadContract()
  }



  async loadContract() {

  }

  render() {
    return (

        <ul>
          { this.props.job.map((job, key) => {
            return(
              <div key={key}>
                <div>
                  <span>@{job.id}</span>
                  <p>{job.country}</p>
                  <p>{job.country}</p>
                  <p>{job.country}</p>
                  <p>{job.country}</p>
                  <p>{job.country}</p>
                </div>
              </div>
            )
          })}
        </ul>
    );
  }
}

export default Job;
