import React, { Component } from 'react';
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

class Battery extends Component {
    constructor(props){
        super(props);
        this.state = {
            percentage : 14,
            startDate: new Date(),
            endDate : new Date()
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChangeStart(date) {
        this.setState({
          startDate: date
        });
      }
      
    handleChangeEnd(date) {
        this.setState({
          startDate: date
        });
      }
    
    
    
    render() { 
        return ( 
            
                    <div className="main-panel" style={{ backgroundColor :'#222840'}}>
                        
                        <div style={{textAlign:'center'}}>
                        <div style={{ width: '100px', display: 'inline-block' }}>
                        <CircularProgressbar percentage={this.state.percentage} text={`${this.state.percentage}%`} 
                        styles={{}} />
                        </div>
                        </div>
                            <div>
                            <DatePicker
                                selected={this.state.startDate}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeStart}
                            />

                            <DatePicker
                                selected={this.state.endDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeEnd}
                            />
                            </div>
                    </div>
                    
         );
    }
}
 
export default Battery;