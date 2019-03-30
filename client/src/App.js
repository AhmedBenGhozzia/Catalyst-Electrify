import React, { Component } from 'react';
import './App.css';
import store from './store';
import { loadUser } from './actions/authActions'
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
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import Notification from "./components/Notification"
class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container-scroller">
          <NavBar />
          <div className="container-fluid page-body-wrapper">
            <Setting />
            <SideBar />
            <div className="main-panel">
              <div className="content-wrapper">
              <Notification/>

                <Router>
                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/register" component={Register} />
                    <Route component={NotFound} />
                  </Switch>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
