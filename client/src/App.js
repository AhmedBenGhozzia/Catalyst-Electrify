import React, { Component } from 'react';
import './App.css';
import store from './store';
import { loadUser } from './actions/authActions'
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import "./css/vendor.bundle.addons.css";
import "./css/vendor.bundle.base.css";
import "./css/style.css";
import "./iconfonts/mdi/font/css/materialdesignicons.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Register from './components/auth/Register';
import { Provider } from 'react-redux';

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
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
