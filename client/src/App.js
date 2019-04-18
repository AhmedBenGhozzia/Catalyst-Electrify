import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

import store from './store';
import { loadUser } from './actions/authActions'
import Home from "./components/Home";
import CatalystDetails from "./components/CatalystDetails";
import "./css/vendor.bundle.addons.css";
import "./css/vendor.bundle.base.css";
import "./css/style.css";
import "./iconfonts/mdi/font/css/materialdesignicons.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Register from './components/auth/Register';
import ListSmart from './components/ListSmart';
import ItemModal from './components/ItemModal';
import { Provider } from 'react-redux';
import Notification from "./components/Notification"
import Login from './components/auth/Login';
class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  
  render() {
    return (

      <Provider store={store}>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path ="/notifications" component={Notification}/>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
