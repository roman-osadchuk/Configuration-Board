import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Modal } from 'react-bootstrap'

export default class ModalWindow extends Component {
    render() {
        return (
            <div>
                <Modal
                    show = {this.props.isActive}
                    onHide = {this.props.onClose}
                    animation = {false}
                    className ={this.props.className}
                >
                    <Modal.Header closeButton>
                        {this.props.title}
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.body}
                    </Modal.Body>

                    <Modal.Footer >
                        {this.props.footer}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
