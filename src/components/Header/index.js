import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

import * as actionCreators from 'actions/items';

@connect(
  state => state.items,
  dispatch => bindActionCreators(actionCreators, dispatch)
)

export class Header extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = (event) => {
    this.setState({inputName: event.target.value})
    event.preventDefault();
  };
  submitUser = () =>{
    const that = this.props;
    let error = false;
    if(this.state){
       this.props.setUser(this.state.inputName, function(error){
      that.loginError(true);
      error = true;
      that.logout();
    });
    }
   


  };

  reset = () =>{
    this.props.reset();

  };

  logout = () =>{
    this.props.logout();

  };
  render() {
    console.log(this.props)
    return (
      <header className={`${styles}`}> 
        <div className="container">
          <div className="row">
            <div className="col-xs-5 col-sm-3 col-md-3 col-lg-3 logo">
              <Link onClick={this.reset} to="/">
                Homework Checker
              </Link>
            </div>

            <div className="col-xs-7 col-sm-8 col-md-8 col-lg-8">
              <nav>
                <Link onClick={this.reset} to="/home" activeClassName="active">
                  Home
                </Link>
                <Link onClick={this.reset} to="/list" activeClassName="active">
                  Assignments
                </Link>
                <input
                        type="text"
                        onSubmit={this.submitUser}
                        onChange={this.handleChange}
                      />
                 <button className='btn btn-primary' onClick={this.submitUser}>Login</button> 
                 <button className='btn btn-warning' onClick={this.logout}>Logout</button>  
                 {this.props.login_error ? <span id='errorCheck'>User does not exist</span> : null}  
              </nav>
            </div>

          
          </div>
        </div>
      </header>
    );
  }
}
