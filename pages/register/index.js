import { connect } from 'react-redux'
import React, { Component } from 'react' 
import LandingPage from '../../components/layouts/landing_page'
import Content from './src/Content'
import { setTitlePage } from '../../actions/meta/metaAction'

class RegisterPage extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(setTitlePage("Register Page"))
  }

  render(){
    return(
      <LandingPage
        hiddenNavAndFooter={false}
      >
        <Content/>
      </LandingPage>
    )
  }
}

function mapStateToProps (state) {
  return{}
}

export default connect(mapStateToProps)(RegisterPage) 