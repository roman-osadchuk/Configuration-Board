var React = require('react');

var MainTableBody = React.createClass({

    render: function() {
      return (
          <tr>
            <td onClick={this.props.SitePreferenceTitle.bind(null, this)}> {this.props.note.name} </td>
            <td onClick={this.props.SitePreferenceDevelopment.bind(null, this)}> info [ ] </td>
            <td onClick={this.props.SitePreferenceStaging.bind(null, this)}> info [ ] </td>
            <td onClick={this.props.SitePreferenceProduction.bind(null, this)}> info [ ] </td>
          </tr>
      );
    }
});

module.exports = MainTableBody;
