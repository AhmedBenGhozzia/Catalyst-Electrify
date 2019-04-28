import React, { Component } from 'react'
import NavBar from './NavBar';
import Settings from './Settings';
import SideBar from './SideBar';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

export default class Predict extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {}
        }
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData() {
        axios.get("/api/predict").then(res => {
            const coin = res.data;
            let labels = [];
            let data = [];
            coin.forEach(element => {
                labels.push(element.Date);
                data.push(element.Energy);

            });

            console.log(coin)
            this.setState({
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Prediction",
                            data: data,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                        }
                    ]
                }
            });
        });
    }
    render() {
        return (
            <div className="container-scroller">
                <NavBar />
                <div className="container-fluid page-body-wrapper">
                    <Settings />
                    <SideBar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Line data={this.state.chartData} redraw={true} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
