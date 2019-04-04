import React, { Component } from 'react';
import './App.css';
import store from './store';
import { loadUser } from './actions/authActions'
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Smart from './components/Smart';
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
import ChartTemp from './components/ChartTemp';
import ProdChart from './components/ProdChart';
import TimeProd from './components/TimeProd';
import DataTable from './components/DataTableSmart';

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
            <Route path="/Smart" component={Smart} />
                                        <Route path="/ProdChart" component={ProdChart} />
                                        <Route path="/TimeProd" component={TimeProd} />
                                        <Route path="/DataTable" component={DataTable} />
                                        <Route path="/Test" component={ChartTemp} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
