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
import ChartTemp from './components/ChartTemp';
import ProdChart from './components/ProdChart';
import TimeProd from './components/TimeProd';
import DataTable from './components/DataTableSmart';
import Maps from './components/Map';
import RtChart from './components/RtChart';
import Battery from './components/Battery';
import Spinners from './components/Spinners'
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
            <Route path="/login" component={Login}/>
            <Route path="/DataTable" component={DataTable}/>
            <Route path="/ProdChart" component={ProdChart}/>
            <Route path="/TimeProd" component={TimeProd}/>
            <Route path="/ChartTemp" component={ChartTemp}/>
            <Route path="/Maps" component={Maps}/>
            <Route path="/RtChart" component={RtChart}/>
            <Route path="/Battery" component={Battery}/>
            <Route path="/Spinners" component={Spinners}/>

            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
