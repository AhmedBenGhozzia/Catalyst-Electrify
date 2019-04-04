import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Login extends Component {

    state = {
        username: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };  

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated
        if (isAuthenticated) {
            //redirect to dashboard
            this.props.history.push('/')
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { username, password } = this.state;

        // Create user object
        const user = {
            username,
            password
        };

        // Attempt to login
        this.props.login(user);
    };


    render() {
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                        <div className="row flex-grow">
                            <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                <div className="auth-form-transparent text-left p-3">
                                    <div className="brand-logo">
                                        <img src="http://www.urbanui.com/fily/template/images/logo-black.svg" alt="logo" />
                                    </div>
                                    <h4>Welcome back!</h4>
                                    <h6 className="font-weight-light">Happy to see you again!</h6>
                                    {/*alert*/}
                                    {this.state.msg ? <div className="alert alert-danger" role="alert">{this.state.msg}</div> : null}
                                    <form className="pt-3" onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-account-outline text-primary" />
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control form-control-lg border-left-0" id="username" name="username" onChange={this.onChange} placeholder="Username" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-lock-outline text-primary" />
                                                    </span>
                                                </div>
                                                <input type="password" className="form-control form-control-lg border-left-0" id="password" name="password" onChange={this.onChange} placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" />
                                                    Keep me signed in
                    <i className="input-helper" /></label>
                                            </div>
                                            <a href="#" className="auth-link text-black">Forgot password?</a>
                                        </div>
                                        <div className="my-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">LOGIN</button>
                                        </div>

                                        <div className="text-center mt-4 font-weight-light">
                                            Don't have an account? <a href="register-2.html" className="text-primary">Create</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 login-half-bg d-flex flex-row">
                                <p className="text-white font-weight-medium text-center flex-grow align-self-end">Copyright © 2018  All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                    {/* content-wrapper ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>

        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(Login);
