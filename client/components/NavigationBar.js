import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import Themes from './groupsComponents/Themes';

class NavigationBar extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    home(e) {
        e.preventDefault();
        this.context.router.push('/');
    }


    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Welcome: {this.props.auth.user.username}</a></li>
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <div id="main_groups_container">
                <div id="table_groups_header">
                <div>
                    <Link to="/">Epam-dw-rd-lab</Link>
                    <div>
                        { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
                </div>
                <hr/>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

NavigationBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
