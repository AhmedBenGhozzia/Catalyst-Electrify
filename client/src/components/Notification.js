
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-redux-datatable/dist/styles.css';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getNotif, deleteNotif, getUncheked } from '../actions/notifActions';
import PropTypes, { array } from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import CanvasJSReact from '../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;




class Notification extends Component {
  componentDidMount() {
this.Success();
    this.props.getUncheked();
    
  }
  onDeleteClick = (id) => {
    this.props.deleteNotif(id);

  }


  Danger = () => toast.error("Error Notification !", {
    position: toast.POSITION.BOTTOM_RIGHT,
  }, { autoClose: 15000 });
  Success = () => toast.success("Success Notification !", {
    position: toast.POSITION.TOP_CENTER
  }, { autoClose: 15000 });

  Info = () => toast.info("Info Notification !", {
    position: toast.POSITION.BOTTOM_CENTER
  }, { autoClose: 15000 });
  Warning = () => toast.warn("Warning Notification !", {
    position: toast.POSITION.BOTTOM_LEFT
  }, { autoClose: 15000 });

  notificationsTypes = (type2) => {
    const type1 = { type: "Danger" };
    const type0 = { type: "Warning" };
    const type3 = { type: "Sucess" };
    const type4 = { type: "Info" };

    if (JSON.stringify(type2) == JSON.stringify(type1)
    ) {
      this.Danger();
    }
    else if (JSON.stringify(type2) == JSON.stringify(type0)) {
      this.Warning()
    } else if (JSON.stringify(type2) == JSON.stringify(type3)) { this.Success(); }
    else if (JSON.stringify(type2) == JSON.stringify(type4)) { this.Info() }
  }



  List = (t) => {
    let tab = [];

    for (var i = 0; i < t.length; i++) {
      let test = { name: "", type: "" };

      test.name = t[i].name;
      test.type = t[i].type;


      tab.push(test);
    }
    return tab;
  }
  render() {








    const { Notifications } = this.props.notif;
    console.log(Notifications);
    let test1 = this.List(Notifications);
    const data = {
      columns: [

        {
          label: 'Content',
          field: 'Content',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Type',
          field: 'Type',
          sort: 'asc',
          width: 100
        }



      ],

      rows: test1
    };


    const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "",
			exportEnabled: true,
			title:{
				text: "Notification Stats"
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: [
					{ y: 32, label: "Info " },
					{ y: 22, label: "Sucess" },
					{ y: 15, label: "Danger" },
					{ y: 19, label: "Warning" }
	
				]
			}]
		}
    return (
  

      <div>


            <div> <CanvasJSChart options = {options}/></div>





            {test1.map(({ name, type }) => (       
              <p key={name}>{this.notificationsTypes({ type })}

                 </p>
            ))}


        








        {/* Mirrored from www.urbanui.com/fily/template/demo/vertical-default-dark/pages/ui-features/notifications.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 19 Mar 2019 16:25:02 GMT */}
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Fily Admin</title>
        {/* plugins:css */}
        <link rel="stylesheet" href="../css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="..css/vendor.bundle.base.css" />
        <link rel="stylesheet" href="../css/vendor.bundle.addons.css" />
        {/* endinject */}
        {/* plugin css for this page */}
        {/* End plugin css for this page */}
        {/* inject:css */}
        <link rel="stylesheet" href="../../../../css/vertical-layout-dark/style.css" />
        {/* endinject */}
        <link rel="shortcut icon" href="../../../../images/favicon.png" />
        <div className="container-scroller">
          {/* partial:../../partials/_navbar.html */}
          <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo" href="../../index-2.html"><img src="http://www.urbanui.com/fily/template/images/logo.svg" alt="logo" /></a>
              <a className="navbar-brand brand-logo-mini" href="../../index-2.html"><img src="http://www.urbanui.com/fily/template/images/logo-mini.svg" alt="logo" /></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="mdi mdi-menu" />
              </button>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item nav-search d-none d-md-flex" id="navbarSearch">
                  <a className="nav-link d-flex justify-content-center align-items-center" id="navbarSearchButton" href="#">
                    <i className="mdi mdi-magnify mx-0" />
                  </a>
                  <input type="text" className="form-control" placeholder="Search..." id="navbarSearchInput" />
                </li>
              </ul>
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item dropdown mr-1">
                  <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
                    <i className="mdi mdi-email mx-0" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <img src="../../../../images/faces/face4.jpg" alt="image" className="profile-pic" />
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
                        <img src="../../../../images/faces/face2.jpg" alt="image" className="profile-pic" />
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
                        <img src="../../../../images/faces/face3.jpg" alt="image" className="profile-pic" />
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
                  <a className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-toggle="dropdown">
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
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                    <img src="../../../../images/faces/face28.jpg" alt="profile" />
                    <span className="nav-profile-name">Don Richards</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                    <a className="dropdown-item">
                      <i className="mdi mdi-settings text-primary" />
                      Settings
                      </a>
                    <a className="dropdown-item">
                      <i className="mdi mdi-logout text-primary" />
                      Logout
                      </a>
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
          {/* partial */}
          <div className="container-fluid page-body-wrapper">
            {/* partial:../../partials/_settings-panel.html */}
            <div id="right-sidebar" className="settings-panel">
              <i className="settings-close mdi mdi-close" />
              <ul className="nav nav-tabs" id="setting-panel" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
                </li>
              </ul>
              <div className="tab-content" id="setting-content">
                <div className="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
                  <div className="add-items d-flex px-3 mb-0">
                    <form className="form w-100">
                      <div className="form-group d-flex">
                        <input type="text" className="form-control todo-list-input" placeholder="Add To-do" />
                        <button type="submit" className="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
                      </div>
                    </form>
                  </div>
                  <div className="list-wrapper px-3">
                    <ul className="d-flex flex-column-reverse todo-list">
                      <li>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="checkbox" type="checkbox" />
                            Team review meeting at 3.00 PM
                            </label>
                        </div>
                        <i className="remove mdi mdi-close-circle-outline" />
                      </li>
                      <li>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="checkbox" type="checkbox" />
                            Prepare for presentation
                            </label>
                        </div>
                        <i className="remove mdi mdi-close-circle-outline" />
                      </li>
                      <li>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="checkbox" type="checkbox" />
                            Resolve all the low priority tickets due today
                            </label>
                        </div>
                        <i className="remove mdi mdi-close-circle-outline" />
                      </li>
                      <li className="completed">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="checkbox" type="checkbox" defaultChecked />
                            Schedule meeting for next week
                            </label>
                        </div>
                        <i className="remove mdi mdi-close-circle-outline" />
                      </li>
                      <li className="completed">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="checkbox" type="checkbox" defaultChecked />
                            Project review
                            </label>
                        </div>
                        <i className="remove mdi mdi-close-circle-outline" />
                      </li>
                    </ul>
                  </div>
                  <div className="events py-4 border-bottom px-3">
                    <div className="wrapper d-flex mb-2">
                      <i className="mdi mdi-circle-outline text-primary mr-2" />
                      <span>Feb 11 2018</span>
                    </div>
                    <p className="mb-0 font-weight-thin text-gray">Creating component page</p>
                    <p className="text-gray mb-0">build a js based app</p>
                  </div>
                  <div className="events pt-4 px-3">
                    <div className="wrapper d-flex mb-2">
                      <i className="mdi mdi-circle-outline text-primary mr-2" />
                      <span>Feb 7 2018</span>
                    </div>
                    <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
                    <p className="text-gray mb-0 ">Call Sarah Graves</p>
                  </div>
                </div>
                {/* To do section tab ends */}
                <div className="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                  <div className="d-flex align-items-center justify-content-between border-bottom">
                    <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Friends</p>
                    <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">See All</small>
                  </div>
                  <ul className="chat-list">
                    <li className="list active">
                      <div className="profile"><img src="../../../../images/faces/face1.jpg" alt="image" /><span className="online" /></div>
                      <div className="info">
                        <p>Thomas Douglas</p>
                        <p>Available</p>
                      </div>
                      <small className="text-muted my-auto">19 min</small>
                    </li>
                    <li className="list">
                      <div className="profile"><img src="../../../../images/faces/face2.jpg" alt="image" /><span className="offline" /></div>
                      <div className="info">
                        <div className="wrapper d-flex">
                          <p>Catherine</p>
                        </div>
                        <p>Away</p>
                      </div>
                      <div className="badge badge-success badge-pill my-auto mx-2">4</div>
                      <small className="text-muted my-auto">23 min</small>
                    </li>
                    <li className="list">
                      <div className="profile"><img src="../../../../images/faces/face3.jpg" alt="image" /><span className="online" /></div>
                      <div className="info">
                        <p>Daniel Russell</p>
                        <p>Available</p>
                      </div>
                      <small className="text-muted my-auto">14 min</small>
                    </li>
                    <li className="list">
                      <div className="profile"><img src="../../../../images/faces/face4.jpg" alt="image" /><span className="offline" /></div>
                      <div className="info">
                        <p>James Richardson</p>
                        <p>Away</p>
                      </div>
                      <small className="text-muted my-auto">2 min</small>
                    </li>
                    <li className="list">
                      <div className="profile"><img src="../../../../images/faces/face5.jpg" alt="image" /><span className="online" /></div>
                      <div className="info">
                        <p>Madeline Kennedy</p>
                        <p>Available</p>
                      </div>
                      <small className="text-muted my-auto">5 min</small>
                    </li>
                    <li className="list">
                      <div className="profile"><img src="../../../../images/faces/face6.jpg" alt="image" /><span className="online" /></div>
                      <div className="info">
                        <p>Sarah Graves</p>
                        <p>Available</p>
                      </div>
                      <small className="text-muted my-auto">47 min</small>
                    </li>
                  </ul>
                </div>
                {/* chat tab ends */}
              </div>
            </div>
            {/* partial */}
            {/* partial:../../partials/_sidebar.html */}

            {/* partial */}

            <div className="main-panel">
              <div className="content-wrapper">
                <div className="row">
               


                
                  <div className="col-12 grid-margin">
                    <div className="card">
                      <div className="card-body">

                        <p className="card-description">
                        </p>
                        
                        <div className="alert alert-success" role="alert">
                          <i className="mdi mdi-alert-circle" />
                          Well done! You successfully read this important alert message.
                          </div>
                        <div className="alert alert-info" role="alert">
                          <i className="mdi mdi-alert-circle" />
                          Heads up! This alert needs your attention, but it's not super important.
                          </div>
                        <div className="alert alert-warning" role="alert">
                          <i className="mdi mdi-alert-circle" />
                          Warning! Better check yourself, you're not looking too good.
                          </div>
                        <div className="alert alert-danger" role="alert">
                          <i className="mdi mdi-alert-circle" />
                          Oh snap! Change a few things up and try submitting again.
                          </div>
                      </div>
                    </div>
                  </div>
              
                </div>
              </div>
              {/* content-wrapper ends */}
              {/* partial:../../partials/_footer.html */}
              <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                  <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2018 <a href="https://www.urbanui.com/" target="_blank">Urbanui</a>. All rights reserved.</span>
                  <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <i className="mdi mdi-heart text-danger" /></span>
                </div>
              </footer>
              {/* partial */}
            </div>
            {/* main-panel ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>



      </div>
    );
  }



}

Notification.propTypes = {
  getNotif: PropTypes.func.isRequired,
  getUncheked: PropTypes.func.isRequired,
  notif: PropTypes.object.isRequired

}
const mapStateToProps = (state) => ({

  notif: state.notif


});


export default connect(mapStateToProps, { getNotif, deleteNotif, getUncheked })(Notification);