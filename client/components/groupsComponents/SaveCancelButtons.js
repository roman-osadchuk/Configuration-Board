import React, {Component} from 'react'

export default class SaveCancelButtons extends Component {

    render() {
        return (
            <div className='div-for-edit-button'>
                <button onClick={this.props.onClick}>Save</button>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        );
    }
}
