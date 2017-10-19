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
      <div className="app container">
        <Router>
          <Grid>
            <Row>
              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">SkyLine Test App</Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                    <NavItem eventKey={2} href="#">Log out</NavItem>
                    <NavDropdown eventKey={3} title="Csaba" id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}>Options</MenuItem>
                      <MenuItem eventKey={3.2}>Another action</MenuItem>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Row>
            <Row>
              <Col sm={3} md={3} lg={3}>
                <ul>
                  <li><Link to="/">Data List</Link></li>
                  <li><Link to="/form">Form</Link></li>
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
