import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {getnavUncheked,getSuccsess} from '../actions/notifActions';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import Speech from 'speak-tts';
 class Settings extends Component {


    constructor(props) {
        super(props);
    this.state =  {user : null}
    
      } 
    componentDidMount(){
        this.props.getnavUncheked("5c94ffd05cdd3d504caf6e30");     
        this.props.getSuccsess();
        var refreshIntervalId =   setInterval(() => {   
            this.onvoice2();
            
            clearInterval(refreshIntervalId);
        })
    }
    
    onCheckClick = () => {
     axios.put('http://localhost:5000/notif/CheckAll');

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


    onSendEmailClick = (id) => {
        axios.get('http://localhost:5000/push/MailSell');
        axios.put('http://localhost:5000/notif/Checkone/'+id);
    this.onvoice();

         }

  render() { const { NotificationUNCHECKED } = this.props.notif;
  const { NotificationStatus } = this.props.notif;

 

    return (

            <div id="right-sidebar" className="settings-panel">    
                <i className="settings-close mdi mdi-close" />
                <ul className="nav nav-tabs" id="setting-panel" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">Sell Energy</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">Uncheked Notification</a>
                    </li>
                </ul>
                <div className="tab-content" id="setting-content">
                    <div className="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
                        <div className="add-items d-flex px-3 mb-0">
                           
                        </div>
                        <div className="list-wrapper px-3">
                            <ul className="d-flex flex-column-reverse todo-list">
                           
                            {NotificationStatus.map(({ _id,name, date }) => (       
    <div key={_id}>   <li>
                                   
    <i className="mdi mdi-bell" >   </i>                                         
    {name} {date}

    <i className="remove mdi mdi-close-circle-outline" />
            <button  onClick={()=>this.onSendEmailClick(_id)} className="remove badge badge-success badge-pill my-auto mx-2">V</button>                              
              </li>
  
       </div>
  ))}
                                
                            </ul>
                        </div>
                      
                       
                    </div>
                    {/* To do section tab ends */}
                    <div className="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                        <div className="d-flex align-items-center justify-content-between border-bottom">
                            <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Uncheked Notification</p>
                            <button  onClick={()=>this.onCheckClick()}  className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">Check All</button>
                            <button  onClick={()=>this.onvoice()}  className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">VoicePlayer</button>

                        </div>
                        <ul className="chat-list">
                        {NotificationUNCHECKED.map(({ _id,name, date }) => (       
    <div key={_id}>   <li className="list">
                            <i className="mdi mdi-bell" />
    <div className="info">
        <div className="wrapper d-flex">
            <p>{name}</p>
        </div>
        <p>{date}</p>
    </div>
    <div className="badge badge-danger badge-pill my-auto mx-2">1</div>
    <small className="text-muted my-auto">Uncheked Notif</small>
</li>
  
       </div>
  ))}
                           
                        </ul>
                    </div>
                    {/* chat tab ends */}
                </div>
            </div>


    )
  }
}
Settings.propTypes = {
    user: PropTypes.object.isRequired,
    getnavUncheked: PropTypes.func.isRequired,
    notif: PropTypes.object.isRequired,
    getSuccsess: PropTypes.func.isRequired

  }
const mapStateProps = state => ({
    auth: state.auth,
    notif: state.notif,
    user :state.auth.user


})
export default connect(mapStateProps, { getnavUncheked,getSuccsess })(Settings);