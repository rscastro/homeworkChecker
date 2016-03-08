import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { styles } from './styles.scss';
import LoadingOrderAnimation from 'react-loading-order-with-animation';
import { setParallax } from '../../utils/parallax';




/* components */
import { TopImage } from 'components/TopImage';
import { Tools } from 'components/Tools';
import { Projects } from 'components/Projects';



const metaData = {
  title: 'Redux Easy Boilerplate',
  description: 'Start you project easy and fast with modern tools',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

import * as actionCreators from 'actions/items';

@connect(
  state => state.items,
  dispatch => bindActionCreators(actionCreators, dispatch)
)



export class Home extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    if(!this.props.user){
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
                  Welcome to Homework Checker!
                </h1>
              </LoadingOrderAnimation>
              <LoadingOrderAnimation animation="fade-in"
                move="from-bottom-to-top"
                distance={60}
                speed={700}
                wait={900}
              >
                <p>
                  One stop shop for homework submissions and grading
                </p>
              </LoadingOrderAnimation>
            </div>
          </div>
        </div>
      </section>
        );
      
    }
    else{
      console.log('main')
      return (
        <section>
          <DocumentMeta {...metaData} />
          <TopImage />
        </section>
      );
    }
  }
}
