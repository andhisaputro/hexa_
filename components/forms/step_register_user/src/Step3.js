import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Button
} from 'react-bootstrap';
import I18n from '../../../../lib/translations/i18n'

// ACTION
import { submitUserRegister } from '../../../../actions/user/user_register_action'
import { saluation } from '../../../../actions/helpers/general_helper'
// CLASS

class Step3 extends Component {
  state = { value: 0 };

  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(){
    const {
      email,
      first_name,
      last_name,
      saluation,
      phone,
      password,
      confirm_password,
    } = this.props

    this.props.dispatch(submitUserRegister(
      email,
      first_name,
      last_name,
      saluation,
      phone,
      password,
      confirm_password,
    ))
  }

  render(){
    console.log(this.props)

    return(
        <Container>
          <h3>{I18n.t('wording_confirm_detail_user')}</h3>
          Email : {this.props.email}
          First name : {this.props.first_name}
          Last Name : {this.props.last_name}
          Saluation : {saluation(this.props.saluation)}
          Phone : {this.props.phone}

          <Button onClick={()=>this.onSubmit()}>CONFIRM</Button>
        </Container>
      )
  }
}

function mapStateToProps (state) {
  return{
    open_register_modal : state.registerUserReducer.open_register_modal,
    email : state.registerUserReducer.email,
    first_name : state.registerUserReducer.first_name,
    last_name : state.registerUserReducer.last_name,
    saluation : state.registerUserReducer.saluation,
    phone : state.registerUserReducer.phone,
    password  : state.registerUserReducer.password,
    confirm_password  : state.registerUserReducer.confirm_password
  }
}

export default connect(mapStateToProps)(Step3)
