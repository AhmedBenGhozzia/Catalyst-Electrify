import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Catalyst from "../ethereum/Catalyst";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CatalystTransaction extends Component {
  state = {
    date: "",
    consumption: "",
    production: "",
    errorMessage: "",
    loading: false
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  onSubmit = async event => {
    event.preventDefault();

    // Update the UI to reflect that loading is occuring
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("from OnSubmit ");
      console.log(this.state.startDate);
      console.log(this.state.consumption);
      console.log(this.state.production);
      console.log(accounts[0]);
      const catalyst = this.props.match.params.address;

      await Catalyst(catalyst)
        .methods.addDay(
          Date.parse(this.state.startDate),
          this.state.consumption,
          this.state.production
        )
        .send({ from: accounts[0] });
      this.props.history.push("/contract/" + catalyst);
      // Change back to routes list page
      //Router.pushRoute("/");
    } catch (err) {
      // Some error occurred so report it
      this.setState({ errorMessage: err.message });
    }

    // Interacting with the network is complete
    this.setState({ loading: false });
  };

  handleChange(date) {
    this.setState({
      startDate: date
    });
    console.log(Date.parse(date));
  }

  render() {
    return (
      <div>
        <h3>Add Consumption and production</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <p>Date</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <p>consumption</p>
            <Input
              value={this.state.consumption}
              onChange={event =>
                this.setState({ consumption: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <p>production</p>
            <Input
              value={this.state.production}
              onChange={event =>
                this.setState({ production: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Ajouter
          </Button>
        </Form>
      </div>
    );
  }
}
