import React, { Component } from "react";
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import ListSmart from './ListSmart';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Bar, Line , Pie } from 'react-chartjs-2';
export default class Smart extends Component {

    
  render() {
      
    return (
        <div className="container-scroller">
                <NavBar />
                <div className="container-fluid page-body-wrapper">
                    <Setting />
                    <SideBar />
                    <div className="main-panel">
                        <div>
                            <h1>SmartHub</h1>{" "}
                            <ListSmart/>
                        </div>
                    </div>
                </div>
            </div>
      
    );
  }
}
