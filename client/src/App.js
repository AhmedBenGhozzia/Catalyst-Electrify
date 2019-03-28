import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Setting from "./components/Settings";
import SideBar from "./components/SideBar";
import Button from "./components/Button";
import Dashboard from "./components/Dashboard";
import "./css/vendor.bundle.addons.css";
import "./css/vendor.bundle.base.css";
import "./css/style.css";
import "./iconfonts/mdi/font/css/materialdesignicons.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";

class App extends Component {
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
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
