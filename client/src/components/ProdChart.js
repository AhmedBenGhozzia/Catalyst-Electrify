import React, { Component } from "react";
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import ListSmart from './ListSmart';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
export default class ProdChart extends Component {
    constructor(props) {
        super(props);
        this.state= {
            chartData: {
                
                    labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
                    datasets:[{
                      label:'Energy production',
                      data:[
                        30,
                        20,
                        10,
                        40,
                        60,
                        50
                      ],
                      //backgroundColor:'green',
                      backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                      ],
                      borderWidth:1,
                      borderColor:'#777',
                      hoverBorderWidth:3,
                      hoverBorderColor:'#000'
                    }]
                  }
            
        }
    }

    render() {
      
        return (
            <div className="container-scroller">
                    <NavBar />
                    <div className="container-fluid page-body-wrapper">
                        <Setting />
                        <SideBar />
                        <div className="main-panel">
                            <div>
                                <div className="chart">
                                <Bar
                                     data={this.state.chartData}
                                     options={{title:{
                                        display:true,
                                        text:'Energy production per month',
                                        fontSize:25
                                      },
                                      legend:{
                                        display:true,
                                        position:'right',
                                        labels:{
                                          fontColor:'#000'
                                        }
                                      },
                                      layout:{
                                        padding:{
                                          left:50,
                                          right:0,
                                          bottom:0,
                                          top:0
                                        }
                                      },
                                      tooltips:{
                                        enabled:true
                                      },
                                      Yaxis: {
                                        title: "Production in Kwatts",
                                        prefix: "Kwatts",
                                        includeZero: true
                                    },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                },
                                                
                                            }]
                                        }
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          
        );
      }

}