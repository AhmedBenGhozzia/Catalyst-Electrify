import RTChart from 'react-rt-chart';
import React, {Component } from 'react'
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import openSocket from 'socket.io-client';
import Loader from 'react-loader-spinner'
import Spinners from './Spinners'
import {RadialGauge, LinearGauge} from 'react-canvas-gauges'
import Gauge from 'react-svg-gauge';


const socket = openSocket('http://localhost:5000');



export default class RtChart extends Component {

    constructor(props) {
        super(props);
        this.state={
            data : [],
            x: [],
            Temperature : [],
            Humidity: []
        };
        socket.on('data', data => {
            console.log(data)
            this.setState({
                x : data.energy,
                Temperature: data.temperature,
                Humidity: data.humidity
            })
        })
       
        
    }


    componentDidMount(){
        setInterval(() => this.forceUpdate(), 1000);
        
    }

    generateRandomNumber() {
        var min = 0.200,
            max = 0.720,
            highlightedNumber = ((Math.random() * (max - min) + min)/3600)*5;
    
        return highlightedNumber;
    };
    

    render(){
        var data= {
            date: new Date(),
            Consumption: (this.state.x)/1000,
            Production: this.generateRandomNumber()
        }
        return(
            
            <div className="container-scroller">
            <NavBar />
            <div className="container-fluid page-body-wrapper">
                <Setting />
                <SideBar />
                    <div className="main-panel" style={{float:'left'}}>
                        <h1 style={{color:'blue', textAlign:"center"}}>Real time chart of energy (Kwh)</h1>
                        <div>
                        <RTChart
                        fields={['Consumption','Production']}
                        data={data} />
                        </div>
                        </div>
                        <div className="main-panel" style={{float:'left'}}>
                        <div>
                            <Gauge value={this.state.Humidity} width={400} height={320} label="Humidity gauge" />
                        </div>
                        <div className="tempDiv">
                         <LinearGauge
                                units='°C'
                                title='Temperature'
                                value={this.state.Temperature}
                                minValue={0}
                                maxValue={50}
                                majorTicks={['0', '5', '10','15', '20', '25', '30', '35', '40', '45', '50']}
                                minorTicks={1}
                                width="120"
                                height="400"
                                start-angle="90"
                                ticks-angle="180"   
                                value-box="false"
                                color-plate="#fff"
                                border-shadow-width="0"
                                borders="false"
                                needle-type="arrow"
                                needle-width="2"
                                needle-circle-size="7"
                                needle-circle-outer="true"
                                needle-circle-inner="false"
                                animation-duration="1500"
                                animation-rule="linear"
                                bar-width="10"
                                
                        ></LinearGauge>
                                        </div>
                        </div>
                        <div className="hello">
                            <h1 style={{textAlign:'center'}}>Sensors status</h1>
                            <Spinners/>
                            </div>
                        </div>  
                        
        </div>
        );
    }


}
