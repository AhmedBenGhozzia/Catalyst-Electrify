import React, { Component } from 'react';
import './App.css';
import store from './store';
import { loadUser } from './actions/authActions'
import NavBar from "./components/NavBar";
import Setting from "./components/Settings";
import SideBar from "./components/SideBar";
import Button from "./components/Button";
import "./css/vendor.bundle.addons.css";
import "./css/vendor.bundle.base.css";
import "./css/style.css";
import "./iconfonts/mdi/font/css/materialdesignicons.min.css";


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className="container-scroller">
        <NavBar></NavBar>
        <div className="container-fluid page-body-wrapper" >
          <Setting></Setting>
          <SideBar></SideBar>
          <div className="main-panel">
            <div className="content-wrapper">
              <Button value="test" type="inverse" color="dark"></Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
