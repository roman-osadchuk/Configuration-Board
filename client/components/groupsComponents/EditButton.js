import React, { Component } from 'react';


export default class EditButton extends Component {

    render() {
        return (
            <div className='div-for-edit-button' onClick={this.props.onClick}>
                <button id="edit_button">Edit</button>
            </div>
        );
    }
}
