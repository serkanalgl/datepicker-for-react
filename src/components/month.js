import React from 'react';

import CalendarDate from './date';

export default class Month extends React.Component {
  render() {
    return (
      <section className="rc-month">
        <ul className="rc-days">
          <li className="rc-day">Mon</li>
          <li className="rc-day">Tue</li>
          <li className="rc-day">Wed</li>
          <li className="rc-day">Thu</li>
          <li className="rc-day">Fri</li>
          <li className="rc-day">Sat</li>
          <li className="rc-day">Sun</li>
        </ul>

        {this.props.dates.map((date) => (<CalendarDate date={date} {...this.props} />))}
      </section>
    )
  }
}