import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import myStorage from './helpers/is_logged_in';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false,
        };

        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.goHome = this.goHome.bind(this);

    };

    submitForm(e) {
        e.preventDefault();

        this.setState({ error: false });

        const { username, password } = this.state;

        axios.post('/login', { username, password })
        .then(response => {
            myStorage.setItem('loggedIn', 'true');
            myStorage.setItem('username', this.state.username);
            this.props.history.push('/');
        })
        .catch((error) => {
            myStorage.setItem('loggedIn', 'false');
            myStorage.setItem('username', null);
            this.setState({ error: true });
          });

        // if (!(this.state.username === 'admin' && this.state.password === 'yes')) {
        //     return this.setState({ error: true });
        // }


    };

    handleInput(e) {

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    goHome() {
        this.props.history.push('/');
    };

    render() {

        return (
            <div id="login_container">

                <form onSubmit={this.submitForm}>
                    <h2>Login</h2>
                    {this.state.error ? <span className="incorrect_log_pass">That username/password is incorrect. Try again!</span> : null}
                    <div>
                        <span> Username </span>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleInput} className="log_input"/>
                    </div>
                    <div>
                        <span> Password </span>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInput} className="log_input"/>
                    </div>
                    <div>
                        <button onClick={this.goHome}> Home </button>
                        <button type="submit"> Log In </button>
                    </div>
                </form>

            </div>
        );
    }
}

export default Login;
