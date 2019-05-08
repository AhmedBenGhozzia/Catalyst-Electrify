import SuccsessModel from './SuccsessModel';
import React, { Component } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
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
import { subscribePush, unsubscribePush } from './main.js';
import Speech from 'speak-tts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var user;
var self = [];
var self2 = [];

var prediction = false;
class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, Data: [] , test : false}
    this.toggleDataSeries = this.toggleDataSeries.bind(this);

  }

  onSendEmail = () => {
    axios.get('http://localhost:5000/push/Emailpredctionsell');


  }
  
  toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  

  componentDidMount() { 
    this.props.getUncheked("5c94ffd05cdd3d504caf6e30");
     this.notify(); 
    axios.get('http://localhost:5000/DataNotification/test')
      .then(res => {
        var obj = res.data; obj.forEach(function (data) {
          console.log(data);
          self.push(data);

        })
      })
     

    axios.get('http://localhost:5000/DataNotification/test2')
      .then(res => {
        var obj = res.data; obj.forEach(function (data) {
          console.log(data);
          self2.push(data);

        })
      })
  
      var refreshIntervalId = setInterval(() => {

        this.setState({ user: this.props.user }, console.log(this.state.user))
        if (this.state.user != null) {
       
    
          user = this.state.user._id;
          //axios.get('http://localhost:5000/AlertNotif/NotifAlert/'+this.state.user._id)
          axios.get('http://localhost:5000/AlertNotif/predict')
            .then(function (response) {
              var tab = Object.values(response.data); console.log(user);
              tab.forEach(function (data) {
    
                if (data > 0) {
                  prediction = true;
                  axios({
                    method: 'post',
                    url: "http://localhost:5000/notif",
                    headers: {},
                    data: {
                      Cheked: false,
                      name: "SUCCESS : You can sell some energy ",
                      type: "Success",
                      idUser: user
                    }
    
                  });
                }
    
              })
    
              console.log("*************************************");
    
            })
            
    
          clearInterval(refreshIntervalId);
    
             
    
        }
      }, (90000));

  }
  onDeleteClick = (id) => {
    this.props.deleteNotif(id);

  }
  onvoice = () => {

    const speech = new Speech() // will throw an exception if not browser supported
    if (speech.hasBrowserSupport()) { // returns a boolean
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
      text: 'you have new sell notification validate your sell',
    }).then(() => {
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })


  }



  onvoice2 = () => {

    const speech = new Speech() // will throw an exception if not browser supported
    if (speech.hasBrowserSupport()) { // returns a boolean
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


  notify = () => toast(<i className="mdi  mdi-alert-circle" >  Welcom to Dashbord Notificatons</i>, {
    position: toast.POSITION.TOP_LEFT,
    toastId:1
  }, { autoClose: 15000 });
  Danger = (name,id) => toast.error(<i className="mdi  mdi-alert-circle" >  {name.name}</i>, {
    position: toast.POSITION.BOTTOM_RIGHT,  toastId:id._id
  }, { autoClose: 15000 });
  Success = (name,id) => toast.success(<i className="mdi mdi-alarm-light" >  {name.name}</i>, {
    position: toast.POSITION.TOP_RIGHT,  toastId:id._id
  }, { autoClose: 15000 });

  Info = (name,id) => toast.info(<i className="mdi mdi-information" >  {name.name}</i>, {
    position: toast.POSITION.BOTTOM_CENTER,  toastId:id._id
  }, { autoClose: 15000 });
  Warning = (name,id) => toast.warn(<i className="mdi mdi-alert" >  {name.name}</i>, {
    position: toast.POSITION.BOTTOM_LEFT,  toastId:id._id
  }, { autoClose: 15000 });

  notificationsTypes = (id,type2, name) => {
    const type1 = { type: "Danger" };
    const type0 = { type: "Warning" };
    const type3 = { type: "Success" };
    const type4 = { type: "Info" };
    if (JSON.stringify(type2) == JSON.stringify(type1)
    ) {
      this.Danger(name,id);
    }
    else if (JSON.stringify(type2) == JSON.stringify(type0)) {
      this.Warning(name,id);
    } else if (JSON.stringify(type2) == JSON.stringify(type3)) { this.Success(name,id); }
    else if (JSON.stringify(type2) == JSON.stringify(type4)) { this.Info(name,id); }
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

    if (prediction == true) {
      this.onvoice();
      this.onSendEmail();
    }



    const { Notifications } = this.props.notif;
    console.log(Notifications);
    let test1 = this.List(Notifications);

    const options2 = {
      theme: "dark2",
      animationEnabled: true,
      exportEnabled: true,
      backgroundColor: "#222840",

      title: {
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
      backgroundColor: "#222840"
,
      title: {
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
          { y: 32, label: "Info ", color: "#2e7db9" },
          { y: 22, label: "Sucess", color: "#009668" },
          { y: 15, label: "Danger", color: "#b73f54" },
          { y: 19, label: "Warning", color: "#c07a05" }

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
              <ToastContainer      
/>

                {Notifications.map(({ _id, name, type }) => (
                  <p key={_id}>{this.notificationsTypes({_id},{ type }, { name })}

                  </p>
                ))}
                <div className="main-panel">
                  <CanvasJSChart options={options2}
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
                                    <small className="mb-0"> <SuccsessModel /></small>
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
                                    <small className="mb-0"><InfoModel /></small>
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
                                    <small className="mb-0"><DangerModel /></small>
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
                                    <small className="mb-0"><WarningModel /></small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CanvasJSChart options={options} />
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
 

              </div>
              {/* page-body-wrapper ends */}
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
  user: state.auth.user,
  notif: state.notif



});


export default connect(mapStateToProps, { getNotif, deleteNotif, getUncheked, subscribePush, unsubscribePush })(Notification);