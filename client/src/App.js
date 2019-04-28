import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Setting from "./components/Settings";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import CatalystTransaction from "./components/CatalystTransaction";
import CatalystDetails from "./components/CatalystDetails";

import store from "./store";
import { loadUser } from "./actions/authActions";
import Home from "./components/Home";
import "./css/vendor.bundle.addons.css";
import "./css/vendor.bundle.base.css";
import "./css/style.css";
import "./iconfonts/mdi/font/css/materialdesignicons.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <NavBar />
        <div className="container-fluid page-body-wrapper">
          <Setting />
          <SideBar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Router>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route exact path="/" component={Dashboard} />

                  <Route
                    exact
                    path="/contract/:address"
                    component={CatalystDetails}
                  />
                  <Route
                    exact
                    path="/transaction/:address"
                    component={CatalystTransaction}
                  />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
