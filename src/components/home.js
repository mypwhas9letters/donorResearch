import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import listOfCandidates from './dataLists/listOfCandidates'

class Home extends Component {
  constructor(){
    super()

    this.state = {
      params: {
        firstName: "",
        lastName: "",
        contributor_city: "",
        contributor_zip: "",
        contributor_state: "",
        contributor_occupation: "",
        contributor_employer: "",
        two_year_transaction_period: "",
        min_date: "",
        max_date: "",
        min_amount: 200,
        committee_id: "",
      },
      searchTerm: "",
      searchTermRes: "",
      showModal: false,
    }
  }


  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  onKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  }


  onChange = (e) => {
    if(e.target.name === "searchTerm" || e.target.name === "searchTermRes" ){
      this.setState({[e.target.name]: e.target.value});
    }else{
      this.setState({ params: {...this.state.params, [e.target.name]: e.target.value}});
    }
  }

  buildUrl = (e) => {
    e.preventDefault()
    const { params } = this.state
    var queryString = ""
    var combineName = []
    for(let i in params){
      if(i === "firstName" || i === "lastName" ){
        if(params[i]){
          combineName.push(params[i])
        }
      }else{
        if(params[i]){
          queryString += `&${i}=${params[i]}`
        }
      }
    }
    if(combineName.length > 0 ){queryString += `&contributor_name=${combineName.join("%20")}`}
    this.props.getFEC(queryString)
  }

  setCommitteeID = (e) => {
    this.setState({params: {...this.state.params, committee_id: e.currentTarget.dataset.id}});
  }

  searchCommittee = (e) => {
    e.preventDefault()
    const result = listOfCandidates.filter(com => {
      return com.committeeName.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    this.setState({searchTermRes: result});
  }

  render() {
    const { params } = this.state
    if(this.props.appState.results){
      return <Redirect to='./fecResults'></Redirect>
    }
    if(this.props.appState.loading){
      return <h1 className="text-center">Loading<p className="loader"></p></h1>
    }
    let searchTermList = this.state.searchTermRes ? this.state.searchTermRes.map(name => <li  className="committeeList" data-dismiss="modal" key={name.committeeName} onClick={this.setCommitteeID} data-id={name.committeeId}>{name.committeeName}</li>) : ""

    return (
      <div className="container homeMargin">
        <h1 className="text-center">Donor Research</h1>
        <form onSubmit={this.buildUrl}  onKeyPress={this.onKeyPress} className="card-body">
          <div className="form-row">
           <div className="col-md-6 mb-3">
             <label>First name</label>
             <input type="text" className="form-control" placeholder="First name" name="firstName" onChange={this.onChange} value={params.firstName} />
           </div>
           <div className="col-md-6 mb-3">
             <label>Last name</label>
             <input type="text" className="form-control" placeholder="Last name" name="lastName" onChange={this.onChange} value={params.lastName} />
           </div>
         </div>
         <div className="form-row">
           <div className="col-md-4 mb-3">
             <label>City</label>
             <input type="text" className="form-control" placeholder="City" name="contributor_city" onChange={this.onChange} value={params.contributor_city} />
           </div>
           <div className="col-md-4 mb-3">
             <label>State</label>
             <input type="text" className="form-control" placeholder="State" name="contributor_state" onChange={this.onChange} value={params.contributor_state} />
           </div>
            <div className="col-md-4 mb-3">
              <label>Zip</label>
              <input type="text" className="form-control" placeholder="Zip" name="contributor_zip" onChange={this.onChange} value={params.contributor_zip} />
            </div>
          </div>
          <div className="form-row">
           <div className="col-md-6 mb-3">
             <label>Occupation</label>
             <input type="text" className="form-control" placeholder="Occupation" name="contributor_occupation" onChange={this.onChange} value={params.contributor_occupation} />
           </div>
           <div className="col-md-6 mb-3">
             <label>Employer</label>
             <input type="text" className="form-control" placeholder="Employer" name="contributor_employer" onChange={this.onChange} value={params.contributor_employer} />
           </div>
         </div>
         <div className="form-row">
            <div className="col-md-6 mb-3">
              <label>Year</label>
              <select  className="form-control" placeholder="Year" name="two_year_transaction_period" onChange={this.onChange} value={params.two_year_transaction_period}>
                <option value=""></option>
                <option value="2018">2018</option>
                <option value="2016">2016</option>
                <option value="2014">2014</option>
                <option value="2012">2012</option>
              </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Minimum Amount</label>
            <input type="text" className="form-control" placeholder="Minumum Amount" name="min_amount" onChange={this.onChange} value={params.min_amount} />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label>Committee ID</label>
            <input type="text" className="form-control" placeholder="Committee ID" name="committee_id" onChange={this.onChange} value={params.committee_id} />
          </div>

         <div className="col-md-6 mb-3">
           <label>Search for Committee ID</label>

            <button type="button" className="form-control btn btn-primary  btn-block" data-toggle="modal" data-target="#exampleModal">
             Look for candidates
           </button>
         </div>

         <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Search for Committee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" placeholder="Search" name="searchTerm" onChange={this.onChange} value={this.state.searchTerm} />
                <br />
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button className="btn btn-primary" onClick={this.searchCommittee}>Save changes</button>
              </div>
              <div className="modal-body">
                <ul>
                  {searchTermList}
                </ul>
              </div>
            </div>
          </div>
        </div>
       </div>
         <button type="submit" className="btn btn-primary btn-block">Search</button>
       </form>
      </div>
    );
  }
}

export default Home;
