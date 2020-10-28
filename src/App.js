/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Form from './module/form';
import List from './module/list';
import Edit from './module/edit';


export default () => {
  return (
    <>
    <Router>
      <div className="App">
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://www.tutofox.com/" style={{color:'orange',fontWeight:'bold'}}>tutofox.com</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/"> Employee List </Link>
              </li>
            </ul>
            <Link className="btn btn-info "  to="/form">Add Employee</Link>
          </div>
        </nav>

        <div className="container py-4">
          <div className="row">
            <Route path="/" exact component={List} />
            <Route path="/form" exact component={Form} />
            <Route path="/edit/:employeeId" exact component={Edit} />
          </div>
        </div>

      </div>
    </Router>
    </>
  );
}