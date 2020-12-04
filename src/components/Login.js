import React, { Component } from 'react';

import { AUTH_TOKEN } from '../constants';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../gql/applicationMutations';

import { Row, Col } from 'react-bootstrap';
import { Mutation } from 'react-apollo';

class Login extends Component {
    state ={
        login: true, // If TRUE, then login, else sign-up
        email: '',
        password: '',
        name: '',
        error: '',
    }

    render() {
        const { login, email, password, name, error } = this.state;

        return (
            <React.Fragment>
                <Row className="text-center">
                    <Col md={{span: 6, offset: 3}}>
                        <h4 style={{color: "#94A6B1", paddingTop: "15px"}}>{login ? 'Login' : 'Sign Up'}</h4>
                        <div className="flex flex-column">
                            {!login && (
                                <input
                                value={name}
                                onChange={e => this.setState({ name: e.target.value, error: false })}
                                type="text"
                                placeholder="Name"
                                className="input-bar"
                                />
                            )}
                            <input
                            value={email}
                            onChange={e => this.setState({ email: e.target.value, error: false })}
                            type="text"
                            placeholder="Email address"
                            className="input-bar"
                            />
                            <input
                            value={password}
                            onChange={e => this.setState({ password: e.target.value, error: false })}
                            type="password"
                            placeholder="Password"
                            className="input-bar"
                            />
                        </div>
                    </Col>

                    <Col md={{span: 6, offset: 3}}>
                        <Mutation mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION} variables={{email, password, name}} onCompleted={data => this._confirm(data)} onError={() => (login) ? this.setState({ error: 'Email/Password was incorrect!'}) : this.setState({ error: 'Email address already assigned to an account!'})}>
                            {mutation => (
                                <div className="submit-btn" onClick={((!login && email && password && name) || (login && email && password)) ? mutation : () => this.setState({error: 'Please fill in all required fields!'})}>
                                    {login ? 'Login' : 'Create Account'}
                                </div>
                            )}
                        </Mutation>
                    </Col>

                    <Col md={{span: 6, offset: 3}}>
                        <p className="nav-link-colour" style={{paddingTop: 15, cursor: "pointer"}} onClick={() => this.setState({ login: !login })}>{login ? 'Create an account!' : 'Already have an account? Log in!'}</p>
                        {/* <div className="pointer button" onClick={() => this.setState({ login: !login })}>
                            {login ? 'Create an account!' : 'Already have an account? Log in!'}
                        </div> */}
                    </Col>

                    {
                        error !== '' ? 
                            <Col md={{span: 6, offset: 3}}>
                                <p style={{color: "red"}}>{error}</p>
                            </Col>
                        :
                            null
                    }
                </Row>
            </React.Fragment>
        );
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup;
        this._saveUserData(token);
        console.log("?")
        window.location.reload();
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

export default Login;