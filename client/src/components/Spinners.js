import React, {Component } from 'react'
import Loader from 'react-loader-spinner'
import openSocket from 'socket.io-client';
import DateTime from './DateTime'
const socket = openSocket('http://localhost:5000');

class Spinners extends Component {
    constructor(props) {
        super(props);
        this.state={
            x: [],
            TemperatureColor : "#00FF00",
            HumidityColor: "#00FF00",
            ConsumptionColor : "#00FF00",
            Temperature: [],
            Humidity: [],
            tempSensor: false,
            humSensor: false,
            energySensor: false
        };
        socket.on('data', data => {
            console.log(data)
            this.setState({
                x : data.energy,
                Temperature: data.temperature,
                Humidity: data.humidity
            })
        })
    
        socket.on('state', data => {
            console.log(data)
            this.setState({
                tempSensor: data.tempSensor,
                humSensor: data.humSensor,
                energySensor: data.energySensor

            })
        })
        this.handleChangeTemperature= this.handleChangeTemperature.bind(this);
        this.handleChangeHumidity= this.handleChangeHumidity.bind(this);
        this.handleChangeConsumption=this.handleChangeConsumption.bind(this);
    }

    handleChangeTemperature() {
        if (!this.state.tempSensor) {
            this.setState({
                TemperatureColor: "#FF0000"
            })
        }
        else 
        this.setState({
            TemperatureColor: "#00FF00"
        })
        
    }

    handleChangeHumidity() {
        if (!this.state.humSensor) {
            this.setState({
                HumidityColor: "#FF0000"
            })
        }
        else 
        this.setState({
            HumidityColor: "#00FF00"
        })
        
    }

    handleChangeConsumption() {
        if (!this.state.energySensor) {
            this.setState({
                ConsumptionColor: "#FF0000"
            })
        }
        else 
        this.setState({
            ConsumptionColor: "#00FF00"
        })
        
    }

    componentDidMount() {
        setInterval(this.handleChangeTemperature,1000);
        setInterval(this.handleChangeHumidity,1000);
        setInterval(this.handleChangeConsumption,1000);
    }
    render() { 
        return ( 
            <div>
                <div style={{float:"left"}}>
                <p style={{textAlign:'center'}}>Humidity</p>
            <Loader 
            type="Puff"
            color={this.state.HumidityColor}
            height="100"	
            width="100"
         />   
         </div>
         <div style={{float:"left"}}>
         <p style={{textAlign:'center'}}>Temperature </p>
          <Loader 
            type="Puff"
            color={this.state.TemperatureColor}
            height="100"	
            width="100"
         />   
         </div>
         <div style={{float:"left"}}>
         <p style={{textAlign:'center'}}>Consumption </p>
          <Loader 
            type="Puff"
            color={this.state.ConsumptionColor}
            height="100"	
            width="100"
         />   
         </div>
         
         </div>
         );
    }
}
 
export default Spinners;