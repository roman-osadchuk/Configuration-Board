import React, { Component } from 'react';

class MainTableBody extends Component {

    render() {
        return (
            <tr>
                <td className="description_hinter" onClick={this.props.SitePreferenceTitle.bind(null, this)}>{this.props.note.name}
                    <span className="description_hinter_text"> {this.props.note.description} </span>
                </td>
                <td onClick={this.props.SitePreferenceDevelopment.bind(null, this)}> info [ ] </td>
                <td onClick={this.props.SitePreferenceStaging.bind(null, this)}> info [ ] </td>
                <td onClick={this.props.SitePreferenceProduction.bind(null, this)}> info [ ] </td>
             </tr>
        );
    }
}

export default MainTableBody;
