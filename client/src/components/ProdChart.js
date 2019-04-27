import React, { Component } from "react";
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import ListSmart from './ListSmart';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
export default class ProdChart extends Component {
  generateRandomNumber() {
    var min = 0.200,
        max = 0.720,
        highlightedNumber = ((Math.random() * (max - min) + min))*24;

    return highlightedNumber;
  };
  
    constructor(props) {
        super(props);
        this.state= {
            production: 0,
            chartData: {
                
                    labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
                    datasets:[{
                      label:'Energy production',
                      data:[
                        this.generateRandomNumber(),
                        this.generateRandomNumber(),
                        this.generateRandomNumber(),
                        this.generateRandomNumber(),
                        this.generateRandomNumber(),
                        this.generateRandomNumber(),
                        this.generateRandomNumber()
                      ],
                      //backgroundColor:'green',
                      backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(242, 38, 19, 1)',
                        'rgba(150, 40, 27, 1)'
                      ],
                      borderWidth:1,
                      borderColor:'#777',
                      hoverBorderWidth:3,
                      hoverBorderColor:'#000'
                    }]
                  }
            
        }
        this.generateRandomNumber=this.generateRandomNumber.bind(this);
    }

    componentDidMount(){
      console.log(this.generateRandomNumber())
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
                                        text:'Energy production per day (Kwh)',
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