import React, { Component } from "react";
import Catalyst from "../ethereum/Catalyst";
import ModalExampleMultiple from "./MultipleModals";
import { MDBDataTable } from 'mdbreact';
import '../css/MultipleModals.css';
import { Line } from 'react-chartjs-2';



export default class CatalystDetails extends Component {
  state = {
    count: 0,
    totalConsumption: 0,
    totalProduction: 0,
    keys: [],
    productionHistory: [],
    consumtionHistory: [],
    table: [],
    numTransaction: 0
  };
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: "Stock A",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(225,0,0,0.4)",
      borderColor: "red", // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "yellow",
      pointHoverBorderColor: "brown",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: [65, 59, 80, 81, 56, 55, 40, , 60, 55, 30, 78],
      spanGaps: true,
    }, {
      label: "Stock B",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(167,105,0,0.4)",
      borderColor: "rgb(167, 105, 0)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "white",
      pointBackgroundColor: "black",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "brown",
      pointHoverBorderColor: "yellow",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: false
      data: [10, 20, 60, 95, 64, 78, 90, , 70, 40, 70, 89],
      spanGaps: false,
    }

    ]
  };


  DatatablePage = () => {
    const data = {
      columns: [
        {
          label: 'DATE',
          field: 'date',
          sort: 'asc',
          width: 1000
        },
        {
          label: 'PRODUCTION',
          field: 'production',
          sort: 'asc',
          width: 270
        },
        {
          label: 'CONSOMMATION',
          field: 'consommation',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 200
        }


      ],
      rows: [



      ]


    };
    for (let i = 0; i < this.state.count; i++) {
      data.rows.push(
        {
          date: this.dateFormat(this.state.keys[i]),
          production: this.state.productionHistory[i],
          consommation: this.state.consumtionHistory[i],
          status: (+this.state.productionHistory[i] > +this.state.consumtionHistory[i]) ? <div className="badge badge-success badge-fw">good </div> : ((+this.state.productionHistory[i] < +this.state.consumtionHistory[i]) ? <div className="badge badge-danger badge-fw">Bad</div> : <div className="badge badge-info badge-fw">equal</div>),


        }

      )
    }

    return (
      <MDBDataTable


        bordered
        hover
        dark
        data={data}
      />
    );
  }

  async componentDidMount() {
    console.log("from componentDidMount")
    const catalyst = this.props.match.params.address;
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
    this.getNumberTransaction();
    this.createTable();
  }

  getNumberTransaction = () => {
    var date = new Date(+this.state.keys[this.state.keys.length - 1]);
    var compteur = 0;

    if (new Date().getMonth() === date.getMonth()) {
      compteur = new Date().getDate() - date.getDate();
    }
    this.setState({ numTransaction: compteur });
  }

  dateFormat = d => {
    var date = new Date(+d);
    return date.toLocaleString();
  };

  Modalhandler = async () => {

    setTimeout(async () => {

      console.log("RELOADING THE COMPONENT")
      const catalyst = this.props.match.params.address;
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
      this.getNumberTransaction();
      this.createTable();


    }, 1000)
  }

  createTable = () => {
    let table = [];

    for (let i = 0; i < this.state.count; i++) {
      table.push(
        <tr>
          <td>{this.dateFormat(this.state.keys[i])}</td>
          <td className="font-weight-bold">{this.state.productionHistory[i]}</td>
          <td className="font-weight-bold">{this.state.consumtionHistory[i]}</td>
          <td>
            <div className="badge badge-success badge-fw">Progress</div>
          </td>
        </tr>
      );
    }

    this.setState({ table })
  };

  render() {

    return (
      <div className="content-wrapper">

        {(this.state.numTransaction > 0) &&
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h4 className="mt-1 mb-1">Hi, Welcomeback! You have {this.state.numTransaction} Transactions waiting</h4>
                  <ModalExampleMultiple
                    address={this.props.match.params.address}
                    handler={this.Modalhandler}
                  />
                </div>
              </div>
            </div>
          </div>
        }




        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card border-0 border-radius-2 bg-success">
              <div className="card-body">
                <div className="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div className="icon-rounded-inverse-success icon-rounded-lg">
                    <i className="mdi mdi-arrow-top-right" />
                  </div>
                  <div className="text-white">
                    <p className="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">
                      Production Totale
                    </p>
                    <div className="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 className="mb-0 mb-md-1 mb-lg-0 mr-1">
                        {this.state.totalProduction}
                      </h3>
                      <small className="mb-0">This month</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 grid-margin stretch-card">
            <div className="card border-0 border-radius-2 bg-danger">
              <div className="card-body">
                <div className="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div className="icon-rounded-inverse-danger icon-rounded-lg">
                    <i className="mdi mdi-chart-donut-variant" />
                  </div>
                  <div className="text-white">
                    <p className="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">
                      Consommation Totale
                    </p>
                    <div className="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 className="mb-0 mb-md-1 mb-lg-0 mr-1">
                        {this.state.totalConsumption}
                      </h3>
                      <small className="mb-0">This month</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card">

            <div className="card-body">
              <h2 className="card-title">History of transactions</h2>
              <div className="row">
                <div className="my-modal2">
                  {this.DatatablePage()}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div>
          <h2>Line Example</h2>
          <Line data={this.data} />
        </div>



      </div>
    );
  }
}
