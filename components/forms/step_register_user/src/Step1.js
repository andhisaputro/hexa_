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

class Step1 extends Component {
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
    return(
        <Container>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{I18n.t('email')}</Form.Label>
            <FormControl name="email" defaultValue={this.props.email} onChange={(e)=>this.onChangeInput(e)} aria-describedby="basic-addon12" placeholder="" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{I18n.t('first_name')}</Form.Label>
            <FormControl name="first_name" defaultValue={this.props.first_name} onChange={(e)=>this.onChangeInput(e)} aria-describedby="basic-addon12" placeholder="" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{I18n.t('last_name')}</Form.Label>
            <FormControl name="last_name" defaultValue={this.props.last_name} onChange={(e)=>this.onChangeInput(e)} aria-describedby="basic-addon12" placeholder="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>{I18n.t('saluation')}</Form.Label>
            <DropdownButton
              variant="outline-secondary"
              className="saluation-btn-option"
              title={saluation(this.props.saluation)}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item name="saluation" onClick={(e)=>this.onChangeInput(e,'saluation',0)} href="#">Mr</Dropdown.Item>
              <Dropdown.Item name="saluation" onClick={(e)=>this.onChangeInput(e,'saluation',1)} href="#">Ms</Dropdown.Item>
              <Dropdown.Item name="saluation" onClick={(e)=>this.onChangeInput(e,'saluation',2)} href="#">Mrs</Dropdown.Item>
            </DropdownButton>
          </Form.Group>
        </Container>
      )
  }
}

function mapStateToProps (state) {
  return{
    email : state.registerUserReducer.email,
    first_name : state.registerUserReducer.first_name,
    last_name : state.registerUserReducer.last_name,
    saluation : state.registerUserReducer.saluation
  }
}

export default connect(mapStateToProps)(Step1)
