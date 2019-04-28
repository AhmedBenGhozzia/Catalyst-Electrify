import SuccsessModel from './SuccsessModel';
import React, { Component } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-redux-datatable/dist/styles.css';
import { connect } from 'react-redux';
import { getNotif, deleteNotif, getUncheked } from '../actions/notifActions';
import PropTypes, { array, string } from 'prop-types';
import CanvasJSReact from '../canvasjs.react';
import DangerModel from './DangerModel';
import WarningModel from './WarningModel';
import InfoModel from './InfoModel';
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import axios from 'axios';
import {subscribePush,unsubscribePush} from './main.js';
import Speech from 'speak-tts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var user;
var self = [];
var self2 = [];

var prediction =false ;
class Notification extends Component {

  constructor(props) {
    super(props);
this.state =  {user : null,Data:[]}
this.toggleDataSeries = this.toggleDataSeries.bind(this);
this.onvoice = this.onvoice.bind(this);


  } 
  toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
   componentDidMount() {
    

    axios.get('http://localhost:5000/DataNotification/test')
    .then(res =>     {var obj  =res.data  ; obj.forEach(function(data){ 
console.log(data);
self.push(data);

    }) })


    axios.get('http://localhost:5000/DataNotification/test2')
    .then(res =>     {var obj  =res.data  ; obj.forEach(function(data){ 
console.log(data);
self2.push(data);

    }) })
    var refreshIntervalId =   setInterval(() => {
      this.setState({user : this.props.user},console.log(this.state.user))
      if(this.state.user != null){

    
        user=this.state.user._id;
      this.props.getUncheked(this.state.user._id);
      axios.get('http://localhost:5000/AlertNotif/NotifAlert/'+this.state.user._id)
      axios.get('http://localhost:5000/AlertNotif/predict')
      .then(function (response) {
   var tab=Object.values(response.data);         console.log(user);
       tab.forEach( function(data){   
     
        if (data>0){
          prediction= true;
          axios({
            method: 'post',
            url: "http://localhost:5000/notif",
            headers: {}, 
            data: {
               Cheked: false,
              name: "SUCCESS : You can sell some energy ",
              type: "Success",
              idUser : user
            }
           
          });
        }

       })
     
        console.log("*************************************");

      })

      clearInterval(refreshIntervalId);
      this.notify();
      }
     }, (7000));

    
 }
  onDeleteClick = (id) => {
    this.props.deleteNotif(id);

  }
  onvoice = () => {
  
    const  speech = new Speech() // will throw an exception if not browser supported
    if(speech.hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
    }
   
 speech.init({
    "volume": 1,
     "lang": "en-GB",
     "rate": 1,
     "pitch": 1,
     "splitSentences": true,
     "listeners": {
         'onvoiceschanged': (voices) => {
             console.log("Event voiceschanged", voices);
         }
     }
}).then((data) => {       

    // The "data" object contains the list of available voices and the voice synthesis params
    console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.error("An error occured while initializing : ", e)
}).then(speech.setVoice("Google UK English Female"));
    




speech.speak({
    text: 'you have validate your sell Check your email',
}).then(() => {
    console.log("Success !")
}).catch(e => {
    console.error("An error occurred :", e)
})
        
   
     }
   


     onvoice2 = () => {

        const  speech = new Speech() // will throw an exception if not browser supported
        if(speech.hasBrowserSupport()) { // returns a boolean
            console.log("speech synthesis supported")
        }
       
     speech.init({
        "volume": 1,
         "lang": "en-GB",
         "rate": 1,
         "pitch": 1,
         "splitSentences": true,
         "listeners": {
             'onvoiceschanged': (voices) => {
                 console.log("Event voiceschanged", voices);
             }
         }
 }).then((data) => {       

        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data)
    }).catch(e => {
        console.error("An error occured while initializing : ", e)
    }).then(speech.setVoice("Google UK English Male"));
        

   


    speech.speak({
        text: '',
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
            
       
         }

   
  notify = () => toast( <i className="mdi  mdi-alert-circle" >  Welcom to Dashbord Notificatons</i>, {
    position: toast.POSITION.TOP_LEFT,
  }, { autoClose: 15000 });
  Danger = (name) => toast.error( <i className="mdi  mdi-alert-circle" >  {name.name}</i>, {
    position: toast.POSITION.BOTTOM_RIGHT,
  }, { autoClose: 15000 });
  Success = (name) => toast.success( <i className="mdi mdi-alarm-light" >  {name.name}</i>, {
    position: toast.POSITION.TOP_RIGHT
  }, { autoClose: 15000 });

  Info = (name) => toast.info( <i className="mdi mdi-information" >  {name.name}</i>, {
    position: toast.POSITION.BOTTOM_CENTER
  }, { autoClose: 15000 });
  Warning = (name) => toast.warn( <i className="mdi mdi-alert" >  {name.name}</i>, {
    position: toast.POSITION.BOTTOM_LEFT
  }, { autoClose: 15000 });

  notificationsTypes = (type2 ,name) => {
    const type1 = { type: "Danger" };
    const type0 = { type: "Warning" };
    const type3 = { type: "Success" };
    const type4 = { type: "Info" };
    if (JSON.stringify(type2) == JSON.stringify(type1)
    ) {
      this.Danger(name);
    }
    else if (JSON.stringify(type2) == JSON.stringify(type0)) {
      this.Warning(name);
    } else if (JSON.stringify(type2) == JSON.stringify(type3)) { this.Success(name); }
    else if (JSON.stringify(type2) == JSON.stringify(type4)) { this.Info(name) ;}
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

    console.log(this.props.user); 

if(prediction== true){
  this.onvoice();
}



    const { Notifications } = this.props.notif;
    console.log(Notifications);
    let test1 = this.List(Notifications);
    
    const options2 = {
			theme: "light2",
      animationEnabled: true,
      exportEnabled: true,

      title:{
        text: "Energy Sell States "
      },
      subtitles: [{
        text: "Click Legend to Hide or Unhide Data Series"
      }], 
      axisX: {
        title: "States"
      },
      axisY: {
        title: "Selled Enery",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Unselled Energy",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [{
        type: "column",
        name: "Selled Energy",
        showInLegend: true,      
        yValueFormatString: "#,##0.# Selled",
        dataPoints: self
      },
      {
        type: "column",
        name: "Unselled",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0.# Unselled",
        dataPoints: self2
      }]
		}
 
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
          { y: 32, label: "Info " ,color:"#2e7db9"},
          { y: 22, label: "Sucess",color :"#009668" },
          { y: 15, label: "Danger" ,color : "#b73f54"},
          { y: 19, label: "Warning" ,color: "#c07a05" }
                 
        ]
      }]
    }
  
    return (

      <div className="container-scroller">
      <NavBar />
      <div className="container-fluid page-body-wrapper">
        <Setting />
        <SideBar />
        <div className="main-panel">
          <div className="content-wrapper">
          <div>



{Notifications.map(({ _id,name, type }) => (       
  <p key={_id}>{this.notificationsTypes({ type },{name})}

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
            <CanvasJSChart options = {options2} 
				 onRef={ref => this.chart = ref}
			/>              <div className="content-wrapper">
                <div className="row">
               

       
                
                



        <div className="row">
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card border-0 border-radius-2 bg-success">
              <div className="card-body">

                <div className="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div className="icon-rounded-inverse-success icon-rounded-lg">
                    <i className="mdi mdi-alarm-light" />
                  </div>
                  
                  <div className="text-white">
                    <p className="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">Consult Notifications</p>
                    <div className="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 className="mb-0 mb-md-1 mb-lg-0 mr-1">Success </h3>
                      <small className="mb-0"> <SuccsessModel/></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card border-0 border-radius-2 bg-info">
              <div className="card-body">
                <div className="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div className="icon-rounded-inverse-info icon-rounded-lg">
                    <i className="mdi mdi-information" />
                  </div>
                  <div className="text-white">
                    <p className="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">Consult Notifications</p>
                    <div className="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 className="mb-0 mb-md-1 mb-lg-0 mr-1">Info</h3>
                      <small className="mb-0"><InfoModel/></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card border-0 border-radius-2 bg-danger">
              <div className="card-body">
                <div className="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div className="icon-rounded-inverse-danger icon-rounded-lg">
                    <i className="mdi mdi-alert-circle" />
                  </div>
                  <div className="text-white">
                    <p className="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">Consult Notifications</p>
                    <div className="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 className="mb-0 mb-md-1 mb-lg-0 mr-1">Danger</h3>
                      <small className="mb-0"><DangerModel/></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card border-0 border-radius-2 bg-warning">
              <div className="card-body">
                <div className="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div className="icon-rounded-inverse-warning icon-rounded-lg">
                    <i className="mdi mdi-alert" />
                  </div>
                  <div className="text-white">
                    <p className="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">Consult Notifications</p>
                    <div className="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 className="mb-0 mb-md-1 mb-lg-0 mr-1">Warning</h3>
                      <small className="mb-0"><WarningModel/></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CanvasJSChart options = {options}/>
                  <div>
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
          </div>

        </div>
      </div>
    </div>

    );
  }



}

Notification.propTypes = {
  user: PropTypes.object.isRequired
,
  getNotif: PropTypes.func.isRequired,
  getUncheked: PropTypes.func.isRequired,
  notif: PropTypes.object.isRequired

}
const mapStateToProps = (state) => ({
  user :state.auth.user,
  notif: state.notif



});


export default connect(mapStateToProps, { getNotif, deleteNotif, getUncheked ,subscribePush,unsubscribePush})(Notification);