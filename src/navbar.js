import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';

class navbar extends React.Component {

    constructor() {
        super()
        this.state = {
            show: false,
            nametitle: '',
            namebody: ''
        }
    }

    handleClose = (e, a) => {
        if (e) {
            return this.setState({ show: !this.state.show, clickedbuttonid: '' })
        }
        else {
                Axios.post(`http://192.168.2.65:3030/posts/`, {
                    title: this.state.nametitle,
                    body: this.state.namebody
                })
                    .then(data => {
                        this.setState({
                            show: !this.state.show,
                        })
                        this.props.handlercalling()
                    }
                    ).catch(error => console.log(error));
        }
    }


    handleShow = (e) => {
        this.setState({
            clickedbuttonid: e.target.id,
            show: !this.state.show
        })
    }

    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value
        })

    }


    render() {
        return (
            <div className="nav_comp">


                <p>API CALL DEMO</p>
                <Button variant="success" onClick={(e) => this.handleShow(e)}>Add Profile</Button>

                <Modal show={this.state.show} onHide={(e) => this.handleClose(1)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="text" name="nametitle" onChange={(e) => this.updateValue(e)} autoComplete="off" placeholder="Enter Title" /><br />
                        <Form.Control type="text" name="namebody" onChange={(e) => this.updateValue(e)} autoComplete="off" placeholder="Enter Body" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => this.handleClose(1)}>
                            Close
                        </Button>
                        <Button variant="success" onClick={(e) => this.handleClose(0)}>
                            Add Profile
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default navbar;