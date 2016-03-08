import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export class Items extends Component {

  static propTypes = {
    items: React.PropTypes.array,
    delItem: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  onDelete = (event) => {
    event.preventDefault();
    const index = event.currentTarget.dataset.index;
    this.props.delItem(index);
  };

  showQuestion = (event) => {
    event.preventDefault();
    this.props.initializeQuestion({question: event.currentTarget.dataset.index, id: event.currentTarget.dataset.id})
   // console.log('CLIENT QUESTION SET', event.currentTarget.dataset)
  };

  populateAnswers = (event) => {
    console.log('HITTTING POPULATE')
    event.preventDefault();
    this.props.initializeAnswers(event.currentTarget.dataset.id)
    console.log('ANSWERS QUESTION SET', this.props.answers)
  };

  latestAnswers = (event) => {
    console.log('HITTTING LATEST')
    event.preventDefault();
    var fullSet = this.props.answers;
    console.log(fullSet)
    fullSet = fullSet.filter(function(elem){
      return (elem.student === Number(event.currentTarget.dataset.id) && elem.assignment_id === Number(event.currentTarget.dataset.index));
    })

    this.props.userAnswers(fullSet);
  };

  render() {
    const { items } = this.props;
    if(this.props.user.user_name === 'nfury' && this.props.answers.length === 0){
      return (
        <div className={styles}>
          {!items.length && <span>Array is empty</span>}
          <table className='table'>
          <thead className='thead-default'>
            <tr>
                  <th>#</th>
                  <th>Question</th>
                </tr>
            </thead>
            <tbody>
          {
            items.map((item, index) =>
              <tr>
              <th onClick={this.populateAnswers} data-id={item.id} data-index={item.question} scope='row'>{index + 1}</th>
              <td onClick={this.populateAnswers} data-id={item.id} data-index={item.question}>  {`${item.question}`}</td>
              </tr>
              
            )
          }
          </tbody>
          </table>
          </div>
      );
    }
    else if(this.props.user.user_name === 'nfury' &&  this.props.answers.length !==0 && this.props.user_answers.length ===0){
      let { answers } = this.props;
      answers = answers.sort(function(a, b) {
    a = new Date(a.answer_date);
    b = new Date(b.answer_date);
    return a>b ? -1 : a<b ? 1 : 0;
});
      let list = []
      let checkObj = {};
      answers.forEach(function(elem){
        if(!checkObj[elem.user_name]){
          list.push(elem);
          checkObj[elem.user_name] = true;
        }
      })

    
      
      return (
        <div className={styles}>
          {!list.length && <span>Array is empty</span>}
         

          <table className='table'>
          <thead className='thead-default'>
            <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Latest Answer</th>
                </tr>
            </thead>
            <tbody>
          {
            list.map((item, index) =>
              <tr>
              <th onClick={this.latestAnswers} data-id={item.student} data-index={item.assignment_id} scope='row'>{index + 1}</th>
              <td onClick={this.latestAnswers} data-id={item.student} data-index={item.assignment_id} scope='row'>  {`${item.full_name}`}</td>
              <td onClick={this.latestAnswers} data-id={item.student} data-index={item.assignment_id} scope='row'>  {`${item.answer}`}</td>
              </tr>
              
            )
          }
          </tbody>
          </table>
          </div>
      );
    }
    else if(this.props.user.user_name === 'nfury' &&  this.props.answers.length !==0 && this.props.user_answers.length !==0){
      const { user_answers } = this.props;
      return (
        <div className={styles}>
          <table className='table'>
          <thead className='thead-default'>
            <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Latest Answer</th>
                  <th>Date</th>
                </tr>
            </thead>
            <tbody>
          {
            user_answers.map((item, index) =>
              <tr>
              <th onClick={this.latestAnswers} data-id={item.student} data-index={item.assignment_id} scope='row'>{index + 1}</th>
              <td onClick={this.latestAnswers} data-id={item.student} data-index={item.assignment_id} scope='row'>  {`${item.full_name}`}</td>
              <td onClick={this.latestAnswers} data-id={item.student} data-index={item.assignment_id} scope='row'>  {`${item.answer}`}</td>
              <td onClick={this.latestAnswers} data-id={item.student} data-index={item.assignment_id} scope='row'>  {`${new Date(item.answer_date)}`}</td>
              </tr>
              
            )
          }
          </tbody>
          </table>
          </div>
      );
    }
    else{
      return (
      <div className={styles}>
        {!items.length && <span>You have no assignments!</span>}
        <table className='table'>
        <thead className='thead-default'>
          <tr>
                <th>#</th>
                <th>Assignment</th>
                <th>Due Date</th>
              </tr>
          </thead>
          <tbody>
        {
          items.map((item, index) =>
            <tr>
            <th onClick={this.showQuestion} data-id={item.id} data-index={item.question}>{index + 1}</th>
            <td onClick={this.showQuestion} data-id={item.id} data-index={item.question}>  {`${item.question}`}</td>
            <td onClick={this.showQuestion} data-id={item.id} data-index={item.question}>  {`${new Date(item.due_date)}`}</td>
            </tr>
            
          )
        }
        </tbody>
        </table>
        </div>
    );
    }
    
  }
}
