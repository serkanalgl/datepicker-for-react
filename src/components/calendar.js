import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from 'moment'

import Header from './header'
import Month from './month'


export default class Calendar extends React.Component {
  render() {
    return (
      <section className="rc-calendar">
        <Header {...this.props} />
        <ReactCSSTransitionGroup transitionName="month" component="div">
          <Month {...this.props} key={this.props.month}/>
        </ReactCSSTransitionGroup>
      </section>
    )
  }
}