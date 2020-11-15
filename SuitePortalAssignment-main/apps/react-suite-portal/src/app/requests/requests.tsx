import React from 'react';

import './requests.css';

import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const axios = require('axios');

import { History } from 'history';

type MyProps = {
  history: History,
  location: any
}

type MyState = {
  isLoggedIn: boolean,
  username: string,
  source: any,
  requests: any,
  show: boolean,
  curId: string
};

class Requests extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const detail = this.props.location.state.detail;
    this.state = {
      isLoggedIn: detail.loggedIn,
      username: detail.username,
      source: source,
      requests: [],
      curId: "",
      show: false
    }

    this.getData = this.getData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.markComplete = this.markComplete.bind(this);
  }

  getData() {
    axios.get('http://localhost:3333/api/maintenance-requests',
      { cancelToken: this.state.source.token }
    ).then(response => {
      if (response == undefined) {
        this.props.history.push('/admin');
        return;
      }
      this.setState({requests: response.data})
      return response.data;
    })
  }

  getVariant(service: string) {
    switch(service) {
      case "electrical":
        return "info";
      case "plumbing":
        return "success";
      case "pest-control":
        return "primary";
      case "general":
        return "danger";
    }
  }

  getTime(time: string) {
    var d = new Date(time);
    return d.toUTCString();
  }

  markComplete(id: string) {
    //Are you Sure Modal
    this.setState({
      curId: id
    })
    this.handleShow();
  }

  handleShow() {
    this.setState({
      show: true
    })
  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handleSubmit(id: string) {
    var url = 'http://localhost:3333/api/maintenance-requests/' + id + '/close';
    axios
      .put(url).then(response => {
        this.handleClose();
        this.getData();
      }).catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    const data = this.getData();
  }

  componentWillUnmount() {
    this.state.source.cancel('Operation canceled by user');
    return;
  }

  render() {
    let rows = [];

    if (this.state.requests !== []) {
      for (const [index, request] of this.state.requests.entries()) {
        rows.push(
          <tr key={ index }>
            <td key='id'>{ request.id }</td>
            <td key='unitNumber'>{ request.unitNumber }</td>
            <td key='submitAt'>{ this.getTime(request.submittedAt) }</td>
            <td key='service'>
              <Badge variant={ this.getVariant(request.serviceType) }>
                { request.serviceType }
              </Badge>
            </td>
            <td key='name'>{ request.name }</td>
            <td key='email'>{ request.email }</td>
            <td key='summary'>{ request.summary }</td>
            <td key='detail'>{ request.details }</td>
            <td key='actions'>
              <Button variant="warning" onClick={() => this.markComplete(request.id) }>
                Close
              </Button>
            </td>
          </tr>
        )
      }
    }

    return(
      <>
        <div className="content center">
          <h3 className="pageTitle">Outstanding Maintenance Requests</h3>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Unit Number</th>
                <th>Submitted At</th>
                <th>Service Type</th>
                <th>Requester Name</th>
                <th>Email</th>
                <th>Summary</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </Table>
        </div>

        <Modal show={ this.state.show } onHide={ this.handleClose }>
          <Modal.Header closeButton>Close { this.state.curId }?</Modal.Header>
          <Modal.Body>
            Are you sure you would like to close request { this.state.curId }?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ this.handleClose }>
              Cancel
            </Button>
            <Button variant="warning" onClick={() => this.handleSubmit(this.state.curId) }>
              Close Request
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
};


export default Requests;
