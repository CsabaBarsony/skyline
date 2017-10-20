import React, { Component } from 'react';
import 'react-bootstrap';
import {
  Nav,
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap/lib';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import DataListPage from './pages/DataListPage';
import FormPage from './pages/FormPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>

          <Grid>
            <Row className="app-header">
              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">SkyLine Test App</Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                    <NavItem href="#">Log out</NavItem>
                    <NavDropdown title="Csaba" id="basic-nav-dropdown">
                      <MenuItem>Options</MenuItem>
                      <MenuItem>Another action</MenuItem>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Row>
            <Row className="container">
              <Col sm={3} md={3} lg={3}>
                <ul className="sidebar nav nav-pills nav-stacked">
                  <li role="presentation">
                    <Link to="/">Data List Page</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/form">Form List</Link>
                  </li>
                </ul>
              </Col>
              <Col sm={9} md={9} lg={9}>
                <Route exact path="/" component={DataListPage}/>
                <Route path="/form" component={FormPage}/>
              </Col>
            </Row>
          </Grid>

        </Router>
      </div>
    );
  }
}

export default App;
