import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
 
class DateTime extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date }, console.log(date))
 
  render() {
    return (
      <div>
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
export default DateTime;