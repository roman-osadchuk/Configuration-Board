import React, { Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Greetings extends Component {

  render() {

      const { isAuthenticated } = this.props.auth;

      const user_info = (
          <h3><Link to="/groups">Go to groups</Link></h3>
      )

      const guest_info = (
          <h3>Please login to access the data</h3>
      )


    return (
        <div id="greeting_container">
            <h1>Welcome to our app!</h1>
            { isAuthenticated ? user_info : guest_info }
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Greetings);
