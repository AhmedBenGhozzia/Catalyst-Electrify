import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DataTable from './DataTableSmart';
export default class SideBar extends Component {

  render() {
    return (

      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
              <i className="mdi mdi-chart-pie menu-icon" />
              <span className="menu-title">SmartHub</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="charts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="DataTable">Data Table</a></li>
                <li className="nav-item"> <a className="nav-link" href="ProdChart">Production chart (Weekly)</a></li>
                <li className="nav-item"> <a className="nav-link" href="TimeProd">Production chart (Daily)</a></li>
                <li className="nav-item"> <a className="nav-link" href="Maps">Map</a></li>
                <li className="nav-item"> <a className="nav-link" href="RtChart">Real time chart</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Predict">
              <i className="mdi mdi-access-point-network menu-icon" />
              <span className="menu-title">Prediction</span>
            </a>
          </li>
          <li className="nav-item">

            <a className="nav-link" href="notifications">
              <i className="mdi mdi-bell" />
              <span className="menu-title">Notifications Dashboard</span>
            </a>
          </li>
  

        </ul>
      </nav>


    )
  }
}
