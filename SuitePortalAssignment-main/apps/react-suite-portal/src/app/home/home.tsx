import React from 'react';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import './home.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type MyProps = {};
type MyState = {
  appartmentNumber: string,
  requesterName: string,
  email: string,
  serviceType: string,
  summary: string,
  details: string,
};
class Home extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      appartmentNumber: "",
      requesterName: "",
      email: "",
      serviceType: "",
      summary: "",
      details: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: { target: any }) {
    const {name, value} = event.target;
    this.setState({ [name]: value } as Pick<MyState, keyof MyState>);
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // // TODO:
  }

  render() {
    let options = []

    for (const option of ALL_SERVICE_TYPES) {
      options.push(
        <option>
          { option }
        </option>
      );
    }

    return(
      <div>
        <p>Please Submit Maintenance Requests Below</p>

        <Card>
          <Card.Body>
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
                  <option key='placeholder' hidden>-- Select One --</option>
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
