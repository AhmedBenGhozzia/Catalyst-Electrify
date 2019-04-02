import React, { Component } from "react";
import factory from "../ethereum/factory";
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
        description: <Link to={"/contract/" + address}>View Catalyst</Link>,
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
      <div>
        <h1>Dashboard</h1>
        {this.renderCata()}

        <Message error header="Oops!" content={this.state.errorMessage} />

        <Button primary loading={this.state.loading} onClick={this.handleClick}>
          Create!
        </Button>
      </div>
    );
  }
}
