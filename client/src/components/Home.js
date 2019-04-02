import React, { Component } from 'react'

import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div className="container-scroller">
                <NavBar />
                <div className="container-fluid page-body-wrapper">
                    <Setting />
                    <SideBar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Router>
                                <Switch>
                                    <Route exact path="/" component={Dashboard} />
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
