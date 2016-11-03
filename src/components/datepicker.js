import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import momentPropTypes from  'react-moment-proptypes'
import moment from 'moment'
import _ from 'lodash'
import cx from 'classnames'


import Calendar from './calendar'
import { parentsHaveClassName, getUniqueIdentifier} from '../utilities'

const propTypes = {
    value : momentPropTypes.momentObj,
    minDate : momentPropTypes.momentObj,
    maxDate : momentPropTypes.momentObj,
    format  : React.PropTypes.string,
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    onChange : React.PropTypes.func 
};

const defaultProps = {
    format : 'DD.MM.YYYY',
    placeholder : 'dd.mm.yyyy',
    disabled : false
};

class Datepicker extends React.Component {
  
  constructor(props) {
    super(props);

    let temp = moment();
    let date = moment([temp.year(), temp.month(), temp.date()]);
    let month = date.month();
    let year = date.year();

    this.state = {
      month,
      year,
      date,
      value : null,
      dates: this._getDates(month, year),
      open: false,
      id : getUniqueIdentifier()
    };

  }

  componentWillReceiveProps(nextProps){
   this._initStateFromProps(nextProps); 
  }

  componentDidMount() {

     React.findDOMNode(this.dateInput).addEventListener("focus", this._handleInputFocus.bind(this));
     React.findDOMNode(this.dateInput).addEventListener("keydown", this._handleInputKeyDown.bind(this));
     document.addEventListener("click", this._hideOnDocumentClick.bind(this));

     this._initStateFromProps(this.props);

  }

  componentWillUnmount() {
     React.findDOMNode(this.dateInput).removeEventListener("focus", this._handleInputFocus.bind(this));
     React.findDOMNode(this.dateInput).removeEventListener("keydown", this._handleInputKeyDown.bind(this));
     document.removeEventListener("click", _this.hideOnDocumentClick.bind(this));
  }

  _initStateFromProps(props){
    if(props.minDate){

        var newMinDate = moment([props.minDate.year(), props.minDate.month(), props.minDate.date()]);
        this.setState({
          minDate: newMinDate
        });

       if(newMinDate.isAfter(this.state.value)){

          let date = newMinDate.clone();
          let month = date.month();
          let year = date.year();

          this.setState({
            month : month,
            year: year,
            date : date,
            value: date,
            dates: this._getDates(month, year)
          });
       }
     }

     if(props.maxDate){

          var newMaxDate = moment([props.maxDate.year(), props.maxDate.month(), props.maxDate.date()]);
          this.setState({
            maxDate: newMaxDate
          });
        
         if(newMaxDate.isBefore(this.state.value)){
            let date = newMaxDate.clone();
            let month = date.month();
            let year = date.year();

            this.setState({
              month : month,
              year: year,
              date : date,
              value: date,
              dates: this._getDates(month, year)
            });
         }
     }
     
     if(props.value){
        this.setState({
          value: moment([props.value.year(), props.value.month(), props.value.date()])
       });
     }
  }


  _hideOnDocumentClick(e) {
      if (e.target.className !== "rc-input-"+ this.state.id && !parentsHaveClassName(e.target, "rc-datepicker-" + this.state.id))
          this.setState({ open: false });
  }

  _handleInputKeyDown(e){

    if(e.keyCode == 9) { //TABKEY
        this.setState({ open: false });
    }

    return true;

  }

  _handleInputFocus() {
    this.setState({ open: true });
  }

  _getDates(month, year) {
    let dayOfWeek = moment([year, month]).weekday(1); //start monday

    let dates = _.range(42).map((val, index) => {
      return dayOfWeek.clone().add(index, 'day');
    });

    return dates;
  }

  _updateMonth(month) {
    let year = this.state.year;

    if (month >= 12) {
      year++;
      month %= 12;
    } else if (month < 0) {
      year--;
      month = 12 + month;
    }

    this.setState({
      month,
      year,
      dates: this._getDates(month, year)
    });
  }

  _updateDate(date) {
    if( this.state.minDate && this.state.maxDate ){

        if( date.isAfter(this.state.minDate) && date.isBefore(this.state.maxDate) ){
          this.setState({ value: date, open: false });
          this.props.onChange(date);
        }

    }else if (this.state.minDate ){

        if(!date.isBefore(this.state.minDate)){
           this.setState({ value: date, open: false });
           this.props.onChange(date);
        }
       
    }else if (this.state.maxDate){

        if (!date.isAfter(this.state.maxDate)) {
            this.setState({ value: date, open: false });
            this.props.onChange(date);
        }

    }else{
      this.setState({ value: date, open: false });
      this.props.onChange(date);
    }

  }

  _updateYear(year) {
    this.setState({ year });
  }

  render() {
    let calendar = this.state.open ? (
      <Calendar ref={(calendar) => this.calendar = calendar} 
        month={this.state.month}
        year={this.state.year}
        selectedDate={this.state.value}
        dates={this.state.dates}
        minDate={this.state.minDate}
        maxDate={this.state.maxDate}
        format= {this.props.format}
        updateMonth={this._updateMonth.bind(this)}
        updateDate={this._updateDate.bind(this)}
        key="1" />
      ) : null;

    return (
      <div className={"rc-datepicker-" + this.state.id}>
        <input ref={(input) => this.dateInput = input}
          className= {this.props.inputClass ? "rc-input-"+ this.state.id + " " + this.props.inputClass : "rc-input-" + this.state.id}
          type="text"
          disabled = {this.props.disabled}
          placeholder = {this.props.placeholder}
          value={this.state.value ? this.state.value.format(this.props.format) : null}/>
          
        <ReactCSSTransitionGroup transitionName="calendar">
          {calendar}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Datepicker.propTypes = propTypes;

Datepicker.defaultProps = defaultProps;


export default Datepicker;