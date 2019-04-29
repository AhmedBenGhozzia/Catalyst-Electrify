import React, { Component } from "react";
import Catalyst from "../ethereum/Catalyst";
import ModalExampleMultiple from "./MultipleModals";
import { MDBDataTable } from 'mdbreact';
import '../css/MultipleModals.css';
import { Line, Bar } from 'react-chartjs-2';



export default class CatalystDetails extends Component {
  state = {
    count: 0,
    totalConsumption: 0,
    totalProduction: 0,
    keys: [],
    productionHistory: [],
    consumtionHistory: [],
    numTransaction: 0,
    consByMonth: [],
    prodByMonth: [],
    dateByHistory: [],
    data: ""

  };


  getConsByMonth = () => {
    var cons = [];
    var date = [];
    var prod = [];
    var CurrentMonth = new Date(+this.state.keys[0]).getMonth();
    var sommeCons = 0;
    var sommeProd = 0;
    console.log(this.state.count);
    for (let index = 0; index <= +this.state.count; index++) {
      const element = this.state.keys[index];



      console.log(new Date(+element).getMonth());
      var month = new Date(+element).getMonth()
      if (CurrentMonth == month && +this.state.count >= index) {
        sommeCons = +this.state.consumtionHistory[index] + sommeCons;
        sommeProd = +this.state.productionHistory[index] + sommeProd;
        console.log(" SommeCons : " + sommeCons)



      } else {
        console.log("SommeCons " + sommeCons);
        date.push(+CurrentMonth + 1);
        cons.push(sommeCons);
        prod.push(sommeProd);
        CurrentMonth = month;
        sommeCons = 0;
        sommeProd = 0;
        if (+this.state.count === index) {
          console.log("else !")
          sommeCons = +this.state.consumtionHistory[index] + sommeCons;
          sommeProd = +this.state.productionHistory[index] + sommeProd;


        } else {
          console.log("from else 2 ")
          sommeCons = +this.state.consumtionHistory[index] + sommeCons;
          sommeProd = +this.state.productionHistory[index] + sommeProd;



        }
      }
      console.log("index" + index)
    }



    console.log("cons");
    console.log(cons);
    console.log("prod");
    console.log(prod);
    console.log("date");
    console.log(date);
    // var resultMonth = [prod, cons, date];

    // console.log(resultMonth[0]);
    //return resultMonth;
    this.setState({
      prodByMonth: prod,
      consByMonth: cons,
      dateByHistory: date
    });
  }


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
          date: new Date(+this.state.keys[i]).toDateString(),
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
    this.getConsByMonth();
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
    const data = {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      labels: this.state.keys.map(x => {
        const d = new Date(+x);
        return d.toDateString();
      }),
      datasets: [{
        label: "Production",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(92,184,92,0.4)",
        borderColor: "rgb(92,184,92)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "black",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data: this.state.productionHistory,
        spanGaps: false,
      },
      {
        label: "Consumption",
        fill: true,
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
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "black",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: this.state.consumtionHistory,
        spanGaps: true,
      }

      ]
    };

    const data2 = {
      labels: this.state.dateByHistory,
      datasets: [
        {
          label: 'Production',
          backgroundColor: "rgba(92,184,92,0.4)",
          borderColor: "rgb(92,184,92)",
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(92,184,92,0.8)',
          data: this.state.prodByMonth
        },
        {
          label: 'Consumption',
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'rgba(225,0,0)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(225,0,0,0.8)',
          data: this.state.consByMonth
        }
      ]
    };

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
                      Consumption Totale
                    </p>
                    <div className="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 className="mb-0 mb-md-1 mb-lg-0 mr-1">
                        {this.state.totalConsumption}
                      </h3>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>Line chart of consumption and production </h2>
          <Line data={data}

            width={100}
            height={80}

            options={{
              maintainAspectRatio: false,
              scales: {

                xAxes: [{
                  type: 'time',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20
                  }
                }]
              }
            }} />


        </div>

        <div>
          <h2>Bar chart of consumption and production (by month)</h2>
          <Bar
            data={data2}
            width={100}
            height={150}
            options={{
              maintainAspectRatio: false
            }}


          />
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







      </div>
    );
  }
}
