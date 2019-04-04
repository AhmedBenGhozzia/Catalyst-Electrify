import React, { Component } from 'react'

import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import Smart from './Smart';
import ChartTemp from './ChartTemp';
import ProdChart from './ProdChart';
import TimeProd from './TimeProd';
import DataTable from './DataTableSmart';

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
