import React from 'react';
import classnames from 'classnames';
import moment from 'moment'

export default class CalendarDate extends React.Component {
  
  render() {
    let { date, minDate, maxDate, format, month, selectedDate, updateDate } = this.props;
    
    let classes = classnames('rc-date', {
      'selected': selectedDate ? selectedDate.isSame(date) : false,
      'current':  date.month() === month,
      'future':   date.month() > month,
      'past':     date.month() < month,
      'disabled' : (minDate ? date.isBefore(minDate) : false) || (maxDate ? date.isAfter(maxDate) : false)
    });

    return (
      <div
        className={classes}
        key={date}
        onClick={updateDate.bind(this, date)}>
        {date.date()}
      </div>
    );
  }
}