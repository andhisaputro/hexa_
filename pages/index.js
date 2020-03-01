import React, { Component } from 'react';
import Home from './home'
import Login from './login'
import { connect } from 'react-redux'


class Index extends Component {
  constructor(props){
    super(props)
  }

  render(){
     return <Home/> 
  }
}

function mapStateToProps (state) {
  return{
    is_mobile_app : state.setupLandingPageReducer.is_mobile_app
  }
}

export default connect(mapStateToProps)(Index)
