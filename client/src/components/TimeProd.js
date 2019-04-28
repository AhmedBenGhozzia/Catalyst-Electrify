import React, { Component } from "react";
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import ListSmart from './ListSmart';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Bar, Line , Pie , Doughnut } from 'react-chartjs-2';

export default class TimeProd extends Component {
    render() {
      
        return (
            <div className="container-scroller">
                    <NavBar />
                    <div className="container-fluid page-body-wrapper">
                        <Setting />
                        <SideBar />
                        <div className="main-panel">
                            <div>
                                <div>
                                    <Doughnut data={{
                                    
                                    labels:['00:00 A.M to 06:00 A.M','00:60 A.M to 12:00 A.M','12:00 A.M to 06:00 P.M','06:00 P.M to 12:00 P.M'],
                                    datasets: [{
                                        label:'Production',
                                        backgroundColor:['#f1c40f','#e67e22','#16a085','#2980b9'],
                                        data: [40,80,60,15]
                                    }]
                                }
                                } /></div>
                            </div>
                        </div>
                    </div>
                </div>
          
        );
      }

}