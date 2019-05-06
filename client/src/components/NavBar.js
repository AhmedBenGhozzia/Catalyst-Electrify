import React, { Component } from 'react'
import Logout from './auth/Logout';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class NavBar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    

    render() {

        const { isAuthenticated, user } = this.props.auth;

        return (

            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo" href=""><img src="https://media.licdn.com/dms/image/C4D0BAQGD5jtq1hJhFQ/company-logo_200_200/0?e=2159024400&v=beta&t=C8y8ngnlF3B2eLWnTnzDz8H1Dj1bLsgqTnUPl6n6X84" alt="logo" /></a>
                    <a className="navbar-brand brand-logo-mini" href=""><img src="http://www.urbanui.com/fily/template/images/logo-mini.svg" alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="mdi mdi-menu" />
                    </button>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item nav-search d-none d-md-flex" id="navbarSearch">
                            <a className="nav-link d-flex justify-content-center align-items-center" id="navbarSearchButton" href="">
                                <i className="mdi mdi-magnify mx-0" />
                            </a>
                            <input type="text" className="form-control" placeholder="Search..." id="navbarSearchInput" />
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown mr-1">
                            <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="" data-toggle="dropdown">
                                <i className="mdi mdi-email mx-0" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="../../images/faces/face4.jpg" alt="image" className="profile-pic" />
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-normal">David Grey
              </h6>
                                        <p className="font-weight-light small-text text-muted mb-0">
                                            The meeting is cancelled
              </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="../../images/faces/face2.jpg" alt="image" className="profile-pic" />
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-normal">Tim Cook
              </h6>
                                        <p className="font-weight-light small-text text-muted mb-0">
                                            New product launch
              </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="../../images/faces/face3.jpg" alt="image" className="profile-pic" />
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-normal"> Johnson
              </h6>
                                        <p className="font-weight-light small-text text-muted mb-0">
                                            Upcoming board meeting
              </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown mr-4">
                            <a className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="" data-toggle="dropdown">
                                <i className="mdi mdi-bell mx-0" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-success">
                                            <i className="mdi mdi-information mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Application Error</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Just now
              </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-warning">
                                            <i className="mdi mdi-settings mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Settings</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Private message
              </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-info">
                                            <i className="mdi mdi-account-box mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">New user registration</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            2 days ago
              </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item nav-profile dropdown mr-0 mr-sm-2">
                            <a className="nav-link dropdown-toggle" href="" data-toggle="dropdown" id="profileDropdown">
                                <img src="https://i.stack.imgur.com/34AD2.jpg" alt="profile" />
                                <span className="nav-profile-name">{user ? `${user.username}` : ''}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <a className="dropdown-item">
                                    <i className="mdi mdi-settings text-primary" />
                                    Settings
          </a>
                                <Logout />
                            </div>
                        </li>
                        <li className="nav-item nav-settings d-none d-lg-flex">
                            <a className="nav-link" href="#">
                                <i className="mdi mdi-dots-vertical" />
                            </a>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="mdi mdi-menu" />
                    </button>
                </div>
            </nav>


        )
    }
}

const mapStateProps = state => ({
    auth: state.auth
})

export default connect(mapStateProps, null)(NavBar);
