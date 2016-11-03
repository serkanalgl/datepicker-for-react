import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

export default class Header extends React.Component {


  backMonthClick(){
  	
  	if(this.isBeforeMonthEnable()){
  		this.props.updateMonth(this.props.month - 1);
  	}


  }

  nextMonthClick(){

  	if(this.isNextMonthEnable()){
  		this.props.updateMonth(this.props.month + 1);
  	}

  }

  isBeforeMonthEnable(){
  	let { minDate, month, year } = this.props;

  	if(minDate){

  		if(minDate.year() == year && minDate.month() < month){
			return true;
  		}else if(minDate.year() < year){
  			return true;
  		}

  		return false;

  	}else{
  		return true;
  	}

  }

  isNextMonthEnable(){
  	let { maxDate, month, year } = this.props;

  	if(maxDate){

  		if(maxDate.year() == year && maxDate.month() > month){
			return true;
  		}else if(maxDate.year() > year){
  			return true;
  		}

  		return false;

  	}else{
  		return true;
  	}

  }

  render() {

  	let backMonthClasses = classnames('rc-button', {
		disabled: !this.isBeforeMonthEnable()
  	});

  	let nextMonthClasses = classnames('rc-button', {
		disabled: !this.isNextMonthEnable()
  	});


    return (
      <header className="rc-header">
        <button className={backMonthClasses} onClick={this.backMonthClick.bind(this)} >&laquo;</button>
         <h3 className="rc-heading">{moment().month(this.props.month).format('MMMM')} {this.props.year}</h3>
        <button className={nextMonthClasses} onClick={this.nextMonthClick.bind(this)}>&raquo;</button>
      </header>
    );
  }
}