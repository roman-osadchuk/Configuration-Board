import React, { Component } from 'react';

class MainGroupsBody extends Component {

    render() {
        return (
            <tr>
                <td onClick={this.props.handleGroup.bind(null, this)}> {this.props.note.id} </td>
                <td onClick={this.props.handleGroup.bind(null, this)}> {this.props.note.name} </td>
             </tr>
        );
    }
}

export default MainGroupsBody;
