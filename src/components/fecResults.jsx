import React, { Component } from 'react';
import ChartData from './chart'

class FecResults extends Component {

  render(){
    const tableRows = this.props.appState.results ? this.props.appState.results.map(contribution => ChartData(contribution)) : null;
    return(
      <main className="container">
      <h2 className="text-center homeMargin">Contributor</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>State</th>
              <th>City</th>
              <th>Zip</th>
              <th>YTD</th>
              <th>Amount</th>
              <th>Committee Name</th>
              <th>Committee State</th>
              <th>Memo Text</th>
              <th>Date</th>
              <th>Contributor Occupation</th>
              <th>Contributor Employer</th>
              <th>PDF URL</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
        </div>
      </main >
    )
   }
 }

export default FecResults;
