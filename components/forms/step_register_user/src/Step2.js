import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  FormControl,
  Form,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
import I18n from '../../../../lib/translations/i18n'

// ACTION
import { setRegisterUserInput } from '../../../../actions/user/user_register_action'
import { saluation } from '../../../../actions/helpers/general_helper'
// CLASS

class Step2 extends Component {
  state = { value: 0 };

  constructor(props){
    super(props)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput(e,key = null , value = null){
    let key_input = key === null ? e.target.name : key
    let value_input = value === null ? e.target.value : value
    this.props.dispatch(setRegisterUserInput(key_input,value_input))
  }

  render(){
    console.log(this.props)

    return(
        <Container>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{I18n.t('phone')}</Form.Label>
            <FormControl name="phone" defaultValue={this.props.phone} onChange={(e)=>this.onChangeInput(e)} aria-describedby="basic-addon12" placeholder="" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{I18n.t('password')}</Form.Label>
            <FormControl name="password" defaultValue={this.props.password} onChange={(e)=>this.onChangeInput(e)} aria-describedby="basic-addon12" placeholder="" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{I18n.t('confirm_password')}</Form.Label>
            <FormControl name="confirm_password" defaultValue={this.props.confirm_password} onChange={(e)=>this.onChangeInput(e)} aria-describedby="basic-addon12" placeholder="" />
          </Form.Group>
        </Container>
      )
  }
}

function mapStateToProps (state) {
  return{
    phone : state.registerUserReducer.phone,
    password  : state.registerUserReducer.password,
    confirm_password  : state.registerUserReducer.confirm_password
  }
}

export default connect(mapStateToProps)(Step2)
