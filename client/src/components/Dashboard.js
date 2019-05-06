import React, { Component } from "react";
import factory from "../ethereum/factory";
import SideBar from "../components/SideBar";
import Setting from "../components/Settings";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { Card, Button, Message, Form } from "semantic-ui-react";
import web3 from "../ethereum/web3";

export default class Dashboard extends Component {
  state = {
    cata: [],
    loading: false,
    errorMessage: ""
  };

  async componentDidMount() {
    const calatysts = await factory.methods.getDeployedCatalyst().call();
    this.setState({ cata: calatysts });
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
  }

  renderCata() {
    const items = this.state.cata.map(address => {
      return {
        header: address,
        description: (
          <div>
            <Link to={"/contract/" + address}>View Catalyst</Link>
          </div>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  handleClick = async event => {
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await factory.methods.createCatalyst().send({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });

    // await factory.methods.createCatalyst().send({ from: accounts[0] });
  };

  render() {
    return (
      <div className="container-scroller">
        <NavBar />

        <div className="container-fluid page-body-wrapper">
          <Setting />
          <SideBar />
          <div className="main-panel">
            <div className="content-wrapper">


              <h1>Dashboard</h1>

              {this.renderCata()}

              <Button primary loading={this.state.loading} onClick={this.handleClick}>
                Create!
        </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
