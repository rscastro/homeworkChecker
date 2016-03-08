import React, { Component } from 'react';
import LoadingOrderAnimation from 'react-loading-order-with-animation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* utils */
import { setParallax } from '../../utils/parallax';

/* component styles */
import { styles } from './styles.scss';

import * as actionCreators from 'actions/items';

@connect(
  state => state.items,
  dispatch => bindActionCreators(actionCreators, dispatch)
)

export class TopImage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    setParallax(this.refs.parallax, 10);
  };

  render() {
    return (
      <section className={`${styles}`} ref="parallax">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <LoadingOrderAnimation animation="fade-in"
                move="from-bottom-to-top"
                distance={30}
                speed={700}
                wait={700}
              >
                <h1 className="title">
                  Good to see you again, {this.props.user.full_name}
                </h1>
              </LoadingOrderAnimation>
              <LoadingOrderAnimation animation="fade-in"
                move="from-bottom-to-top"
                distance={60}
                speed={700}
                wait={900}
              >
                <p>
                  Please visit the <a href='/#/list'>Assignments</a> page to see your homework questions
                </p>
              </LoadingOrderAnimation>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
