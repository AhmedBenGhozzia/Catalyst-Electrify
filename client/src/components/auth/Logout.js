import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    render() {
        return (
            <React.Fragment>
                <a className="dropdown-item" onClick={this.props.logout}>
                    <i className="mdi mdi-logout text-primary" />
                    Logout
                </a>
            </React.Fragment>
        )
    }
}

export default connect(
    null,
    { logout }
  )(Logout);
