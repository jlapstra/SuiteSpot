import React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import './admin.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const axios = require('axios');

const baseState = {
  username: "",
  password: "",
  message: "",
  show: false
};

type MyProps = {
  history: History
};
type MyState = {
  username: string,
  password: string,
  message: string,
  show: boolean
};

class Admin extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = baseState

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  public handleClose() {
    this.resetForm("");
  }

  public handleChange(event: { target: any }) {
    const {name, value} = event.target;
    this.setState({ [name]: value } as Pick<MyState, keyof MyState>);
  }

  private resetForm(message: string) {
    this.setState(baseState);
    if (message != "") {
      this.setState({
        show: true,
        message: message
      })
    }
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    return axios
            .post('http://localhost:3333/api/admin', {
              username: this.state.username,
              password: this.state.password
            })
            .then((response) => {
              // Take to LIST PAGE
              if (response.data.loggedIn == true) {
                this.props.history.push({
                  pathname: "admin/requests",
                  state: { detail: response.data }
                });
              }
              console.log(response);
            })
            .catch(err => {
              if (err.response.status == 401) {
                this.resetForm("Incorrect Credentials: Please Try Again");
              } else {
                this.resetForm(err.name + err.message);
              }
            });
  }

  render() {
    let alerts = [];

    if (this.state.show) {
      alerts.push(
        <Alert
          key={this.state.message[0]}
          variant="danger"
          onClose={ this.handleClose }
          dismissible>
          { this.state.message }
        </Alert>
      )
    }

    return(
      <div className="contentSmall">
        <h3 className="pageTitle">Admin Login</h3>
        <h5 className="pageInfo">Please signin to view the Admin Dashboard</h5>
        <Card>
          <Card.Body>
            { alerts }
            <Form onSubmit={ this.handleSubmit }>
              <Form.Group controlId="maint-form.username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={ this.state.username }
                  onChange={ this.handleChange }
                  />
              </Form.Group>
              <Form.Group controlId="maint-form.password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={ this.state.password }
                  onChange={ this.handleChange }
                  />
              </Form.Group>
              <div className="text-center">
                <Button className="submit" variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
};

export default withRouter(Admin);
