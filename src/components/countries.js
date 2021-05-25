import React, { Component } from 'react';

class Country extends Component {


  async componentDidMount() {
    await this.loadContract()
  }



  async loadContract() {

  }

  render() {
    return (

        <ul>
          { this.props.countries.map((country, key) => {
            return(
              <div key={key}>
                <div>
                  <span>@{country.id}</span>
                  <p>{country.country}</p>
                  <p>{country.country}</p>
                  <p>{country.country}</p>
                  <p>{country.country}</p>
                  <p>{country.country}</p>
                </div>
              </div>
            )
          })}
        </ul>
    );
  }
}

export default Country;
