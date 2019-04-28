import React, { Component } from 'react'
import Logout from './auth/Logout';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getNotif, deleteNotif, getUncheked ,getnavUncheked} from '../actions/notifActions';

class NavBar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    
  constructor(props) {
    super(props);
this.state =  {user : null}


  } 
componentDidMount(){
    var refreshIntervalId =   setInterval(() => {
        this.setState({user : this.props.user},console.log(this.state.user))
        if(this.state.user != null){
  
      
        this.props.getnavUncheked(this.state.user._id);          }
        clearInterval(refreshIntervalId);

    },7000);

}

    render() {


        const { NotificationUNCHECKED } = this.props.notif;
        const { isAuthenticated, user } = this.props.auth;

        return (

            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo" href=""><img src="http://www.urbanui.com/fily/template/images/logo.svg" alt="logo" /></a>
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
                          
                         
                        </li>
                        <li className="nav-item dropdown mr-4">
                      
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
                                <i className="mdi mdi mdi-bell" />
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
NavBar.propTypes = {
    user: PropTypes.object.isRequired
  ,
    getNotif: PropTypes.func.isRequired,
    getnavUncheked: PropTypes.func.isRequired,
    notif: PropTypes.object.isRequired
  
  }
const mapStateProps = state => ({
    auth: state.auth,
    notif: state.notif,
    user :state.auth.user


})
export default connect(mapStateProps, { getNotif, deleteNotif, getUncheked,getnavUncheked })(NavBar);
