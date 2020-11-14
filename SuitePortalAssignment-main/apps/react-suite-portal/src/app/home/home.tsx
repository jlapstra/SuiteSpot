import React from 'react';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import './home.css';

import AlertHandling from '../alert-handling/alert-handling';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';




type MyProps = {};
type MyState = {
  appartmentNumber: string,
  requesterName: string,
  email: string,
  serviceType: string,
  summary: string,
  details: string,
  variant: string,
  message: string,
  show: boolean
};

const baseState: MyState = {
  appartmentNumber: "",
  requesterName: "",
  email: "",
  serviceType: "",
  summary: "",
  details: "",
  variant: "",
  message: "",
  show: false
};

class Home extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = baseState

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  public handleClose() {
    this.setState({
      show: false
    })
    this.resetForm()
  }

  public handleChange(event: { target: any }) {
    const {name, value} = event.target;
    this.setState({ [name]: value } as Pick<MyState, keyof MyState>);
  }

  private resetForm() {
    this.setState(baseState);
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const axios = require('axios');

    return axios
            .post('http://localhost:3333/api/maintenance-requests', {
              unitNumber: this.state.appartmentNumber,
              name: this.state.requesterName,
              email: this.state.email,
              serviceType: this.state.serviceType,
              summary: this.state.summary,
              details: this.state.details
            })
            .then((response) => {
                this.setState({
                  show: true,
                  variant: 'success',
                  message: 'Request ' + response.data.id + ' Submitted Successfully!'
                });

            })
            .catch(err => {
              this.setState({
                show: true,
                variant: 'error',
                message: 'Please Try Again: ' + err
              })
            });
  }

  render() {
    let options = []
    let alerts = []

    for (const option of ALL_SERVICE_TYPES) {
      options.push(
        <option key={option}>
          { option }
        </option>
      );
    }

    if (this.state.show) {
      alerts.push(
        <Alert
          key={this.state.message[0]}
          variant={ this.state.variant }
          onClose={ this.handleClose }
          dismissible>
          { this.state.message }
        </Alert>
      )
    }

    return(
      <div>
        <h3>Please Submit Maintenance Requests Below</h3>
        <Card>
          <Card.Body>
            { alerts }
            <Form onSubmit={ this.handleSubmit }>
              <Form.Group controlId="maint-form.appartmentNumber">
                <Form.Label>Appartment Unit #</Form.Label>
                <Form.Control
                  type="text"
                  name="appartmentNumber"
                  value={ this.state.appartmentNumber }
                  onChange={ this.handleChange }
                  />
              </Form.Group>
              <Form.Group controlId="maint-form.requesterName">
                <Form.Label>Requester Name</Form.Label>
                <Form.Control
                  type="text"
                  name="requesterName"
                  value={ this.state.requesterName }
                  onChange={ this.handleChange }
                  />
              </Form.Group>
              <Form.Group controlId="maint-form.email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={ this.state.email }
                  onChange={ this.handleChange }
                  />
              </Form.Group>
              <Form.Group controlId="maint-form.serviceType">
                <Form.Label>Service Type</Form.Label>
                <Form.Control
                  as="select"
                  name="serviceType"
                  value={ this.state.serviceType }
                  onChange={ this.handleChange }
                  >
                  <option key='placeholder' hidden >-- Select One --</option>
                  { options }
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="maint-form.summary">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  type="text"
                  name="summary"
                  value={ this.state.summary }
                  onChange={ this.handleChange }
                  />
              </Form.Group>
              <Form.Group controlId="maint-form.details">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="details"
                  value={ this.state.details }
                  onChange={ this.handleChange }
                  />
              </Form.Group>
              <Button variant="primary" type="submit">Submit Request</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
};

export default Home;
