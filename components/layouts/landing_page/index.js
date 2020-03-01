import React, { Component } from 'react'
import NavHeader from './src/NavHeader'
import Header from './Header'
import Footer from './Footer'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import Router from 'next/router'

class LandingPage extends Component{
  constructor(props) {
    super(props)
    
  }

  componentDidMount(){ 
  }

  render(){
  
  return(
      <div>
        <Header/>
          {
             Cookies.get('user_detail') === undefined ? <></> : <NavHeader/>
          }
          <div className="main-content">{this.props.children}</div>
        <Footer/>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return{
  }
}

export default connect(mapStateToProps)(LandingPage)
