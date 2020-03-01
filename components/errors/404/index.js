import { connect } from 'react-redux'
import React, { Component } from 'react';
import LandingPage from '../../layouts/landing_page'
import { setTitlePage } from '../../../actions/meta/metaAction'
import Content from './src/Content'

class Error404 extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(setTitlePage("Error 404"))
  }

  render(){
    return(
      <LandingPage>
        <Content/>
      </LandingPage>
    )
  }
}

function mapStateToProps (state) {
  return{}
}

export default connect(mapStateToProps)(Error404)
