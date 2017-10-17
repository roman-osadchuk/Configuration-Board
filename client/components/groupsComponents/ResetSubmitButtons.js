import React, {Component} from 'react'


export default class ResetSubmitButtons extends Component {
    
    constructor() {
        super();
        this.resetButton = this.resetButton.bind(this);
    }

    resetButton(e) {
        e.target.style.backgroundColor = '#ccc';
        e.target.style.cursor = 'default';
        this.props.onClick(); 
    }

    render() {
        return (
            <div className='div-for-edit-button'>
                <button onClick={this.resetButton}>Reset</button>
                <button>Submit</button>
            </div>
        );
    }
}
