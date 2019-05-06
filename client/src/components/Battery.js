import React, { Component } from 'react';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5000');


class Battery extends Component {
    constructor(props){
        super(props);
        this.state = {
          value: 50,
          startColor : '#ff0000', // cornflowerblue
          endColor :  '#00ff00', // crimson
          consumption: [],
          production: this.generateRandomNumber()
        }

        socket.on('data', data => {
          //console.log(data.energy/1000)
          console.log(this.state.value)
          console.log(this.state.production)
          var nextValue = (this.state.value + ((((this.state.production)-(data.energy))/1000)*100));
          if(!((nextValue<=0)||(nextValue>=100)))
          this.setState((prevState, props)=>({
            value: prevState.value + ((((prevState.production)-(data.energy))/1000)*100)
          }))
      })
        this.generateRandomNumber=this.generateRandomNumber.bind(this);
    }

    generateRandomNumber() {
      var min = 3,
          max = 4,
          highlightedNumber = ((Math.random() * (max - min) + min));
  
      return highlightedNumber;
  };
    
    
    render() { 
      const radius = 200;
        const interpolate = interpolateRgb(this.state.startColor, this.state.endColor);
        const fillColor = interpolate(this.state.value / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];
        return ( 
            
                    <div className="main-panel">
                            <div>
                      <LiquidFillGauge
                          style={{ margin: '0 auto' }}
                          width={radius * 2}
                          height={radius * 2}
                          value={(this.state.value)}
                          percent="%"
                          textSize={1}
                          textOffsetX={0}
                          textOffsetY={0}
                          textRenderer={(props) => {
                              const value = Math.round(props.value);
                              const radius = Math.min(props.height / 2, props.width / 2);
                              const textPixels = (props.textSize * radius / 2);
                              const valueStyle = {
                                  fontSize: textPixels
                              };
                              const percentStyle = {
                                  fontSize: textPixels * 0.6
                              };
      
                              return (
                                  <tspan>
                                      <tspan className="value" style={valueStyle}>{value}</tspan>
                                      <tspan style={percentStyle}>{props.percent}</tspan>
                                  </tspan>
                              );
                          }}
                          riseAnimation
                          waveAnimation
                          waveFrequency={2}
                          waveAmplitude={1}
                          gradient
                          gradientStops={gradientStops}
                          circleStyle={{
                              fill: fillColor
                          }}
                          waveStyle={{
                              fill: fillColor
                          }}
                          textStyle={{
                              fill: color('#444').toString(),
                              fontFamily: 'Arial'
                          }}
                          waveTextStyle={{
                              fill: color('#fff').toString(),
                              fontFamily: 'Arial'
                          }}
                          
                      />
                      <div
                          style={{
                              margin: '20px auto',
                              width: 350
                          }}
                      >
                      <h1>Battery storage </h1>
                        </div>
                      </div>
                    </div>
                        
                       
                    
         );
    }
}
 
export default Battery;