import React, {Component} from 'react'


export default class ChangesTable extends Component {
    
     constructor(props) {

        super(props);
        this.getComponent = this.getComponent.bind(this);
        this.resetAllRows = this.resetAllRows.bind(this);
    }
    
    getComponent(e) {
        let td = e.target.closest('td');
        let tr = td.closest('tr');
        tr.style.backgroundColor = '#ccc';
        e.target.style.backgroundColor = '#ccc';
        e.target.style.cursor = 'default';
    }

    resetAllRows() {
        let tr = document.getElementsByClassName('tr');
        let button = document.getElementsByClassName('resetButton');
        let k = 0;
        for(; k < tr.length; k++) {
            tr[k].style.backgroundColor = '#ccc';
            button[k].style.backgroundColor = '#ccc';
            button[k].style.cursor = 'default';
        }
    }

    render() {
        return (
            <table className="modal-table">
                <thead>
                    <tr>
                        <td> Previous values </td>
                        <td> Changed values </td>
                        <td> Reset </td>
                    </tr>
                </thead>
                <tbody>
                    <tr className = 'tr'>
                        <td> Yes </td>
                        <td> No </td>
                        <td className='div-for-edit-button'> <button onClick={this.getComponent} className='resetButton'> Reset </button> </td>
                    </tr>
                    <tr className = 'tr'>
                        <td> No </td>
                        <td> No </td>
                        <td className='div-for-edit-button'> <button onClick={this.getComponent} className='resetButton'> Reset </button> </td>
                    </tr>
                    <tr className = 'tr'>
                        <td> Yes </td>
                        <td> Yes </td>
                        <td className='div-for-edit-button'> <button onClick={this.getComponent} className='resetButton'> Reset </button> </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}