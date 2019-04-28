import React, {Component } from 'react'
import Loader from 'react-loader-spinner'
import openSocket from 'socket.io-client';
import DateTime from './DateTime'
import axios from 'axios';
import {  toast } from 'react-toastify';

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
            energySensor: false,
            tempSensorCheck:true,
            HumidityCheck:true,
            Consumptioncheck:true,

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
    Danger = () => toast.error( <i className="mdi  mdi-alert-circle" > Danger : Temperature Sensor Error! </i>, {
        position: toast.POSITION.BOTTOM_RIGHT,
      }, { autoClose: 15000 });

      Danger2 = () => toast.error( <i className="mdi  mdi-alert-circle" > Danger : humidity Sensor Error! </i>, {
        position: toast.POSITION.BOTTOM_RIGHT,
      }, { autoClose: 15000 });
      Danger3 = () => toast.error( <i className="mdi  mdi-alert-circle" > Danger : Consumption Sensor Error! </i>, {
        position: toast.POSITION.BOTTOM_RIGHT,
      }, { autoClose: 15000 });
    handleChangeTemperature() {
        if (!this.state.tempSensor) {
            this.setState({
                TemperatureColor: "#FF0000"
            })
            if(this.state.tempSensorCheck==true){
            axios({
                method: 'post',
                url: "http://localhost:5000/notif",
                headers: {}, 
                data: {
                   Cheked: false,
                  name: "Danger : Temperature Sensor Error!",
                  type: "Danger",
                  idUser : "5c94ffd05cdd3d504caf6e30"
                }
               
              });
                this.Danger();

                this.setState({
                    tempSensorCheck: false
                })
              }
        }
        else {
        this.setState({
            TemperatureColor: "#00FF00"
        })
    }
        
    }

    handleChangeHumidity() {
        if (!this.state.humSensor) {
            this.setState({
                HumidityColor: "#FF0000"
            })
            if(this.state.HumidityCheck==true){
                axios({
                    method: 'post',
                    url: "http://localhost:5000/notif",
                    headers: {}, 
                    data: {
                       Cheked: false,
                      name: "Danger : humidity Sensor Error!",
                      type: "Danger",
                      idUser : "5c94ffd05cdd3d504caf6e30"
                    }
                   
                  });
                    this.Danger2();
    
                    this.setState({
                        HumidityCheck: false
                    })
                  }
            
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
            if(this.state.Consumptioncheck==true){
                axios({
                    method: 'post',
                    url: "http://localhost:5000/notif",
                    headers: {}, 
                    data: {
                       Cheked: false,
                      name: "Danger : Consumption Sensor Error!",
                      type: "Danger",
                      idUser : "5c94ffd05cdd3d504caf6e30"
                    }
                   
                  });
                    this.Danger3();
    
                    this.setState({
                        Consumptioncheck: false
                    })
                  }
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