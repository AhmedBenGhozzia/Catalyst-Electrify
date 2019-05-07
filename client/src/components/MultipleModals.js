import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import Catalyst from "../ethereum/Catalyst";
import web3 from "../ethereum/web3";
import '../css/MultipleModals.css';



export default class Example extends React.Component {
  state = {
    count: 0,
    totalConsumption: 0,
    totalProduction: 0,
    keys: [],
    productionHistory: [],
    consumtionHistory: [],
    table: [],
    msg: "",
    prods: [],
    conss: [],
    dates: [],
    numberOfDay: 0,
    test: 0


  };
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      catalyst: this.props.address
    };
    this.handleClick = this.handleClick.bind(this);
    console.log(this.state.catalyst);
  }

  async componentDidMount() {
    const catalyst = this.props.address;
    const totalConsumption = await Catalyst(catalyst)
      .methods.totalConsumption()
      .call();
    const totalProduction = await Catalyst(catalyst)
      .methods.totalProduction()
      .call();
    const count = await Catalyst(catalyst)
      .methods.count()
      .call();
    const keys = await Catalyst(catalyst)
      .methods.getkeyConsumProd()
      .call();
    const productionHistory = await Catalyst(catalyst)
      .methods.getProductionHistory()
      .call();
    const consumtionHistory = await Catalyst(catalyst)
      .methods.geConsumtionHistory()
      .call();
    console.log(totalProduction);

    this.setState({
      totalConsumption,
      totalProduction,
      count,
      keys,
      productionHistory,
      consumtionHistory
    });
    this.verifyTransaction(this.state.catalyst);
  }

  reloadData = async () => {
    console.log("reload data");
    const catalyst = this.props.address;
    const totalConsumption = await Catalyst(catalyst)
      .methods.totalConsumption()
      .call();
    const totalProduction = await Catalyst(catalyst)
      .methods.totalProduction()
      .call();
    const count = await Catalyst(catalyst)
      .methods.count()
      .call();
    const keys = await Catalyst(catalyst)
      .methods.getkeyConsumProd()
      .call();
    const productionHistory = await Catalyst(catalyst)
      .methods.getProductionHistory()
      .call();
    const consumtionHistory = await Catalyst(catalyst)
      .methods.geConsumtionHistory()
      .call();
    this.setState({
      totalConsumption,
      totalProduction,
      count,
      keys,
      productionHistory,
      consumtionHistory
    });

    console.log("End reload");
    this.setState({ test: 1 })

  }



  async verifyTransaction(address) {
    var date = new Date(+this.state.keys[this.state.keys.length - 1]);
    var numberOfDay;

    if (new Date().getMonth() === date.getMonth()) {
      numberOfDay = new Date().getDate() - date.getDate();
      console.log(numberOfDay);
      var compteur = numberOfDay - 1;
      var prods = [];
      var conss = [];
      var dates = [];

      for (let index = 0; index < numberOfDay; index++) {
        //Date.parse(new Date()) - compteur * 86400000 //randomIntFromInterval(5, 10000)
        const prod = this.randomIntFromInterval(5, 1000);
        const cons = this.randomIntFromInterval(5, 1000);
        const dateUnix = Date.parse(new Date()) - compteur * 86400000;
        prods.push(prod);
        conss.push(cons);
        dates.push(dateUnix);
        compteur--;

      }

      this.setState({ prods, conss, dates, numberOfDay });

      this.createTable();

    }

  }

  createTable = () => {
    console.log("Create Table");
    let table = [];

    for (let index = 0; index < this.state.numberOfDay; index++) {
      table.push(
        <tr>
          <td> {new Date(+this.state.dates[index]).toDateString()}</td>
          <td className="font-weight-bold">{this.state.prods[index]}</td>
          <td className="font-weight-bold">{this.state.conss[index]}</td>
          <td>
            <Button
              primary
              onClick={() => this.handleClick(this.state.dates[index], this.state.conss[index], this.state.prods[index])}
            >
              Send
          </Button>

          </td>
        </tr>
      );
    }

    this.setState({ table: table });

    console.log("End CreateTable");

  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  handleClose() {
    this.props.handler();

    this.setState({ show: false });

  }

  handleShow() {
    this.setState({ show: true });
  }

  async handleClick(dateUnix, prod, cons, event) {

    console.log("Start HandleClick Transaction");
    var dateUnix, cons, prod;

    const accounts = await web3.eth.getAccounts();
    const aa = this.props.address;
    setTimeout(async () => {
      console.log("wait 0");
      this.componentDidMount();

    }, 5000);
    setTimeout(() => {
      console.log("wait 1");
      this.componentDidMount();


    }, 10000);
    setTimeout(() => {
      console.log("wait 2");
      this.componentDidMount();

    }, 15000);
    setTimeout(() => {
      console.log("wait 3");
      this.componentDidMount();


    }, 20000);
    setTimeout(() => {
      console.log("wait 4");
      this.componentDidMount();

    }, 25000);

    setTimeout(() => {
      console.log("wait 5");
      this.componentDidMount();


    }, 30000);

    Catalyst(aa).methods.addDay(dateUnix, cons, prod).send({ from: accounts[0] }).then(
      () => console.log("Success")

    ).catch(err => console.log("Error" + err)).finally(() => { console.log("Finally") });

  }






  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Send transaction(s)
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              List of waiting transactions &nbsp;&nbsp;
              <span className="badge badge-info">{this.state.numberOfDay}</span>



            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <table className="table table-striped">
                <thead>
                  <tr className="border-top-0">
                    <th className="text-muted">Date</th>
                    <th className="text-muted">Production</th>
                    <th className="text-muted">Consommation</th>

                    <th className="text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>{this.state.table}</tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
