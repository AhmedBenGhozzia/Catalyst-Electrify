import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.message });
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

        const { username, email, password } = this.state;

        // Create user object
        const newUser = {
            username,
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser);
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
                                    <h4>New here?</h4>
                                    <h6 className="font-weight-light">Join us today! It takes only few steps</h6>
                                    {/*alert*/}
                                    {this.state.msg ? <div className="alert alert-danger" role="alert">{this.state.msg}</div> : null}
                                    <form className="pt-3" onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label>Username</label>
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
                                            <label>Email</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-email-outline text-primary" />
                                                    </span>
                                                </div>
                                                <input type="email" className="form-control form-control-lg border-left-0" id="email" name="email" onChange={this.onChange} placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-lock-outline text-primary" />
                                                    </span>
                                                </div>
                                                <input type="password" className="form-control form-control-lg border-left-0" id="password" name="password" onChange={this.onChange} placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" />
                                                    I agree to all Terms &amp; Conditions
                    <i className="input-helper" /></label>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >SIGN UP</button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                            Already have an account? <a href="login.html" className="text-primary">Login</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 register-half-bg d-flex flex-row">
                                <p className="text-white font-weight-medium text-center flex-grow align-self-end">Copyright © 2019  All rights reserved.</p>
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
    { register, clearErrors }
)(Register);
