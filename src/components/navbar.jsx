import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/" onClick={this.props.newSearch}><h1>Donor Research</h1></Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
