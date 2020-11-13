import React from 'react';

import './app.css';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Switch, Route, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Home from './home/home';
import Admin from './admin/admin';

import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {

  return (
    <div className="app">
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" className="d-flex">
        <Navbar.Brand href="/">SuiteSpot Maintenance Requests</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="1" as={Link} to="/">
              Submit Request
            </Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/admin">
              Admin Page
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <Switch>
          <Route exact path={ "/admin" } component={ Admin }/>
          <Route exact path={ "/" } component={ Home }/>
        </Switch>
      </main>
    </div>
  );
};

export default App;
