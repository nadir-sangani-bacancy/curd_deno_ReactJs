import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';


class User_list extends React.Component {

  constructor() {
    super()
    this.state = {
      users: [],
      show: false,
      error: null,
      clickedbuttonid: ''
    }
  }

  componentDidMount() {

    Axios.get(`http://192.168.2.65:3030/posts`)
      .then(response => response)
      .then(data => this.setState({
        users: data.data.data,
      })
      )
      .catch(error => this.setState({ error: error }));
  }

  componentWillReceiveProps() {
    Axios.get(`http://192.168.2.65:3030/posts`)
      .then(response => response)
      .then(data => this.setState({
        users: data.data.data,
      })
      )
      .catch(error => this.setState({ error: error }));
  }

  handleShow = (e) => {
    this.setState({
      clickedbuttonid: e.target.id,
      show: !this.state.show
    })
  }

  refreshuserlist = () => {
    Axios.get(`http://192.168.2.65:3030/posts`)
      .then(response => response)
      .then(data => this.setState({
        users: data.data.data,
      })
      )
      .catch(error => this.setState({ error: error }));

    this.props.callbackfunction("1")
  }

  handleClose = (e, a) => {
    if (e) {
      return this.setState({ show: !this.state.show, clickedbuttonid: '' })
    }
    else {
      Axios.delete(`http://192.168.2.65:3030/posts/${this.state.clickedbuttonid}`)
        .then(data => {
          this.setState({
            show: !this.state.show
          })
          this.refreshuserlist();
        }
        ).catch(error => console.log(error));
    }
  }



  navigateData = (e, id) => {
    //alert(_id);
    this.props.callbackfunction(id);
  }




  render() {
    const { users, error } = this.state;
    return (

      <div className="user_list">
        <h3>USERS LIST</h3>
        {error ? <p>{error.message}</p> : null}
        {(users.map(user => {
          const { _id, title, body } = user;
          return (
            <div>
              <ul>
                <li onClick={(e) => this.navigateData(e, _id)}>FullName : {title} {body} {}
                  <Button variant="danger" id={_id} onClick={(e) => this.handleShow(e)} > Delete</Button> </li>
              </ul>
            </div>
          );
        })
        )}
        <Modal show={this.state.show} onHide={(e) => this.handleClose(1)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Are you sure,Do you want to delete profile ? ID : {this.state.clickedbuttonid} </Form.Label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => this.handleClose(1)}>
              Close
                        </Button>
            <Button variant="danger" onClick={(e) => this.handleClose(0)}>
              Delete Profile
                        </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}
export default User_list;