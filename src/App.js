import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navbar';
import FecResults from './components/fecResults';
const API_KEY = process.env.REACT_APP_API_KEY

class App extends Component {
  state = {
      results: [],
      loading: false,
      error: ""
  }

  getResultsFromFEC = async (queries) => {
    const baseURL = `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${API_KEY}&per_page=100&sort=contribution_receipt_date&is_individual=true`
    this.setState({loading: true});
    try{
      var res = await fetch(`${baseURL+queries}`)
      var json = await res.json()
      this.setState({results: json.results, loading: false});
    }
    catch(err){
      this.setState({error: err, loading: false});
    }
  }

  newSearch = () => {
    this.setState({results: ""});
  }

  render() {
    return (
      <div>
        <NavBar newSearch={this.newSearch}/>
        <div>
          <Route exact path='/' render={() => { return <Home appState={this.state} getFEC={this.getResultsFromFEC}/> } }/>
          <Route exact path='/fecResults' render={() => { return <FecResults appState={this.state}/> } }/>
        </div>
      </div>
    );
  }
}

export default App;
