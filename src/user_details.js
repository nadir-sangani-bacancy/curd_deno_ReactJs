import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';

class User_details extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            id: null,
            error: null,
            nametitle: '',
            namebody: '',
            clickedbuttonid: '',
            user: {
                userId: '',
                title: '',
                body: '',
                _id: ''
            }

        }
    }

    componentDidUpdate() {
        if (this.props.id !== this.state.id) {
            Axios.get(`http://192.168.2.65:3030/posts/${this.props.id}`)
                .then(data => {
                    this.setState({
                        id: this.props.id,
                        user: data.data
                    })
                    console.log(this.state.user)
                }
                ).catch(error => this.setState({ error: error }));
        }
    }

    handleShow = (e) => {
        this.setState({
            clickedbuttonid: e.target.id,
            show: !this.state.show
        })
    }

    handleClose = (e) => {
        if (e) {
            return this.setState({ show: !this.state.show, clickedbuttonid: '' })
        } else {
            Axios.put(`http://192.168.2.65:3030/posts/${this.state.clickedbuttonid}`, {
                title: this.state.nametitle,
                body: this.state.namebody
            })
                .then(data => {
                    this.setState({
                        show: !this.state.show,
                        user:{
                            _id : this.state.id,
                            title: this.state.nametitle,
                            body: this.state.namebody, 
                        }
                    })
                    this.props.handlercalling()
                }
                ).catch(error => console.log(error));
        }
    }


updateValue = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
        [e.target.name]: e.target.value
    })

}
render() {
    let { _id, title, body } = this.state.user;
    return (

        <div className="user_details">
            <h3>USER DETAILS</h3>

            <img src="https://www.w3schools.com/howto/img_avatar.png" />
            <p>ID: {_id}</p>
            <p>TITLE: {title}</p>
            <p>BODY: {body}</p>
            <Button variant="warning" id={_id} onClick={(e) => this.handleShow(e)}>Edit Profile</Button>

            <Modal show={this.state.show} onHide={(e) => this.handleClose(1)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" disabled="disabled" value={_id} placeholder="Default Id" /><br />
                    <Form.Control type="text" name="nametitle" autoComplete="off" onChange={(e) => this.updateValue(e)} placeholder="Enter Title" required="required" /><br />
                    <Form.Control type="text" name="namebody" autoComplete="off" onChange={(e) => this.updateValue(e)} placeholder="Enter Body" required="required" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => this.handleClose(1)}>
                        Close
                        </Button>
                    <Button variant="warning" onClick={(e) => this.handleClose(0)}>
                        Edit Profile
                        </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}
}
export default User_details;