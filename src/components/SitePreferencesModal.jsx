var React = require('react');

require('./SitePreferencesModal.css');

var SitePreferencesModal = React.createClass({

  render: function() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}

          <div>
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );

  }
});


module.exports = SitePreferencesModal;
