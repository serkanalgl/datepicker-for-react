import React from 'react';
import Datepicker from './components/datepicker';

import moment from 'moment'

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      	departureDate : moment(),
      	returnDate : moment()
    };

  }

  selectDepartureDate(date){
	this.setState({ departureDate: date });
  }

  selectReturnDate(date){
	this.setState({ returnDate : date });
  }

  render() {   
    return (

		<div className="row">
			<div className="col-sm-6">
				<div className="form-group">
				    <label for="inputdefault">DEPARTURE ON</label>
				    <Datepicker inputClass="form-control" minDate={moment()} value ={this.state.departureDate} onChange={this.selectDepartureDate.bind(this)}/>
				  </div>
			</div>
			<div className="col-sm-6">
				<div className="form-group">
				    <label for="inputdefault">RETURN ON</label>
				    <Datepicker inputClass="form-control" minDate={this.state.departureDate} placeholder="dd.mm.yyyy" onChange={this.selectReturnDate.bind(this)}/>
				  </div>
			</div>
		</div>

		
    );
  }
}