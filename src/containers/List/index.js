import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';

import { Items } from 'components/Items';
import { AddItem } from 'components/AddItem';

/* actions */
import * as actionCreators from 'actions/items';

const metaData = {
  title: 'Redux test',
  description: 'Start you project easy and fast with modern tools.',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

@connect(
  state => state.items,
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class List extends Component {
  constructor(props) {
    super(props);
  }

  answerChange = (event) => {
    this.setState({answer: event.target.value})
    event.preventDefault();
  };

  submitAnswer = (event) => {
    event.preventDefault();
    console.log(this.state.answer)
    const answertime = new Date()

    console.log('RICHARD TODAY', answertime)

    $.ajax({
            method:'POST',
            url: '/api/answers/',
            contentType: 'application/json',
            data: JSON.stringify({
              student_id: parseInt(this.props.user.id),
              assignment_id: parseInt(this.props.question.id),
              answer: this.state.answer,
              answer_time: answertime
            }),
        
          });
              this.goBackQuestion();

  };

  goBackQuestion = (event) => {
    if(event){
      event.preventDefault();
      
    }

    this.props.initializeQuestion('')
  };
  goBackUserAnswers = (event) => {
    if(event){
      event.preventDefault();
      
    }

    this.props.userAnswers([])
  };
  goBackAnswers = (event) => {
    if(event){
      event.preventDefault();
      
    }

    this.props.initializeAnswers('')
  };


  render() {
    console.log('NEWEST PROPS', this.props)
    if(this.props.user.user_name === 'nfury'  && this.props.answers.length === 0){
      return (
        <section>
          <DocumentMeta {...metaData} />
          <div className="container">

            

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                              col-md-offset-3 col-lg-offset-3">
                <h2>
                  Teacher Assignments:
                </h2>
                <Items {...this.props} />
              </div>

            
            </div>
          </div>
        </section>
      );
    }
    else if(this.props.user.user_name !== 'nfury' && this.props.question === "" && this.props.user){


    return (
      <section>
        <DocumentMeta {...metaData} />
        <div className="container">

        

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h2>
                Student Assignments:
              </h2>
              <Items {...this.props} />
            </div>

            
          </div>
        </div>
      </section>
    );
  }
  else if(this.props.user.user_name === 'nfury' && this.props.answers.length !== 0 && this.props.user_answers.length === 0){
    return (
        <section>
          <DocumentMeta {...metaData} />
          <div className="container">

        

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                              col-md-offset-3 col-lg-offset-3">
                <h2>
                  Latest Answers:
                </h2>
                <Items {...this.props} />
              </div>

              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                              col-md-offset-3 col-lg-offset-3">
                <button className='btn btn-info' onClick={this.goBackAnswers}>BACK</button>
              </div>

            </div>
          </div>
        </section>
      );
  }
  else if(this.props.user.user_name === 'nfury' && this.props.user_answers){
    console.log('WAI YOU NO GO IN HERASDASDASDASDASE')
    return (
        <section>
          <DocumentMeta {...metaData} />
          <div className="container">

    

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                              col-md-offset-3 col-lg-offset-3">
                <h2>
                  {this.props.user_answers[0].full_name}'s Latest Answers:
                </h2>
                <Items {...this.props} />
              </div>
             
              
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                              col-md-offset-3 col-lg-offset-3">
              <button className='btn btn-info' onClick={this.goBackUserAnswers}>BACK</button>
               
              </div>
              
            </div>
          </div>
        </section>
      );
  }
  else if(this.props.user.user_name !== 'nfury' && this.props.question){
    console.log('WAI YOU NO GO IN HERASDASDASDASDASE')
    return(
     <section>
        <DocumentMeta {...metaData} />
        <div className="container">
          

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">

              <h1>
                Question: 
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h2>
                {this.props.question.question}
              </h2>

            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <div className="form-group">
                <label>Please type your answer below:</label>
                <textarea onChange={this.answerChange} className="form-control" rows="5" id="comment"></textarea>
              </div>

            </div>

              <button onClick={this.submitAnswer} className='btn btn-primary'>Submit Answer</button>
          <button className='btn btn-info' onClick={this.goBackQuestion}>BACK</button>

          </div>
        </div>
      </section>
      );
  }
  else{
    return(
     <section>
        <DocumentMeta {...metaData} />
        <div className="container">
          

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">

              <h1>
                Please login to see your assignments!
              </h1>
            </div>
          </div>

         
        </div>
      </section>
      );
  }
  }
}
