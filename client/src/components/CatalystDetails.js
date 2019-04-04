import React, { Component } from "react";
import Catalyst from "../ethereum/Catalyst";
export default class CatalystDetails extends Component {
  state = {
    count: 0,
    totalConsumption: 0,
    totalProduction: 0,
    keys: [],
    productionHistory: [],
    consumtionHistory: []
  };
  async componentDidMount() {
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

    /* const h = [];
    const History = keyConsumProd.map(index => {
      console.log(index);
      Catalyst(catalyst)
        .methods.consumProdHistory(index)
        .call()
        .then(cp => {
          console.log(cp);
          h[index] = cp;
        });
    });*/

    this.setState({
      totalConsumption,
      totalProduction,
      count,
      keys,
      productionHistory,
      consumtionHistory
    });
  }

  createTable = () => {
    let table = [];

    for (let i = 0; i < this.state.count; i++) {
      table.push(
        <tr>
          <td>{this.state.keys[i]}</td>
          <td class="font-weight-bold">{this.state.productionHistory[i]}</td>
          <td class="font-weight-bold">{this.state.consumtionHistory[i]}</td>
          <td>
            <div class="badge badge-success badge-fw">Progress</div>
          </td>
        </tr>
      );
    }

    return table;
  };

  render() {
    return (
      <div className="content-wrapper">
        <div class="row">
          <div class="col-md-6 grid-margin stretch-card">
            <div class="card border-0 border-radius-2 bg-success">
              <div class="card-body">
                <div class="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div class="icon-rounded-inverse-success icon-rounded-lg">
                    <i class="mdi mdi-arrow-top-right" />
                  </div>
                  <div class="text-white">
                    <p class="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">
                      Production Totale
                    </p>
                    <div class="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 class="mb-0 mb-md-1 mb-lg-0 mr-1">
                        {this.state.totalProduction}
                      </h3>
                      <small class="mb-0">This month</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 grid-margin stretch-card">
            <div class="card border-0 border-radius-2 bg-danger">
              <div class="card-body">
                <div class="d-flex flex-md-column flex-xl-row flex-wrap  align-items-center justify-content-between">
                  <div class="icon-rounded-inverse-danger icon-rounded-lg">
                    <i class="mdi mdi-chart-donut-variant" />
                  </div>
                  <div class="text-white">
                    <p class="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">
                      Consommation Totale
                    </p>
                    <div class="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                      <h3 class="mb-0 mb-md-1 mb-lg-0 mr-1">
                        {this.state.totalConsumption}
                      </h3>
                      <small class="mb-0">This month</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <p class="card-title">Open Invoices</p>
                <div class="row">
                  <div class="col-md-12">
                    <p class="text-muted mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Temporibus, quibusdam eum, totam ut minus dolor eaque
                      alias ratione repellat voluptate, libero beatae nobis
                      facere quod Lorem ipsum dolor sit amet consectetur,
                      adipisicing elit. Sapiente corporis sequi error explicabo.
                      Maiores inventore pariatur ratione praesentium.
                    </p>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr class="border-top-0">
                        <th class="text-muted">Date</th>
                        <th class="text-muted">Production</th>
                        <th class="text-muted">Consommation</th>

                        <th class="text-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody>{this.createTable()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
