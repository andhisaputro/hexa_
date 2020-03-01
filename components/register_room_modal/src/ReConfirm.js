import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Button
} from 'react-bootstrap';
import I18n from '../../../lib/translations/i18n'

// ACTION
import { submitUserRegister } from '../../../actions/user/user_register_action'
import { saluation } from '../../../actions/helpers/general_helper'
// CLASS

class ReConfirm extends Component {
  state = { value: 0 };

  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(){
    alert('Confirm')
    // const {
    //   email,
    //   first_name,
    //   last_name,
    //   saluation,
    //   phone,
    //   password,
    //   confirm_password,
    // } = this.props
    //
    // this.props.dispatch(submitUserRegister(
    //   email,
    //   first_name,
    //   last_name,
    //   saluation,
    //   phone,
    //   password,
    //   confirm_password,
    // ))
  }

  render(){
    console.log(this.props)

    return(
        <Container>
          "property_name" : {this.props.property_name}<br/>,
          "floor_id" : {this.props.floor_id}<br/>,
          "floor_number" : {this.props.floor_number}<br/>,
          "room_number" : {this.props.room_number}<br/>,
          "room_type_id" : {this.props.room_type_id}<br/>,
          "room_type_name" : {this.props.room_type_name}<br/>,
          "total_bed_room" : {this.props.total_bed_room}<br/>,
          "total_bath_room" : {this.props.total_bath_room}<br/>,
          "first_name" : {this.props.first_name}<br/>,
          "last_name" : {this.props.last_name}<br/>,
          "email" : {this.props.email}<br/>,
          "mobile" : {this.props.mobile}<br/>
          <Button onClick={()=>this.onSubmit()} className="btn-stepzilla-light btn btn-warning">CONFIRM</Button>
        </Container>
      )
  }
}

function mapStateToProps (state) {
  return{
    show_form : state.registerRoomReducer.show_form,
    register_new_property : state.registerRoomReducer.register_new_property,
    property_name : state.registerRoomReducer.property_name,
    floor_id : state.registerRoomReducer.floor_id,
    floor_number : state.registerRoomReducer.floor_number,
    room_id : state.registerRoomReducer.room_id,
    room_number : state.registerRoomReducer.room_number,
    room_type_id : state.registerRoomReducer.room_type_id,
    room_type_name : state.registerRoomReducer.room_type_name,
    total_bed_room : state.registerRoomReducer.total_bed_room,
    total_bath_room : state.registerRoomReducer.total_bath_room,
    property_detail : state.registerRoomReducer.property_detail,
    first_name: state.registerRoomReducer.first_name,
    last_name: state.registerRoomReducer.last_name,
    email: state.registerRoomReducer.email,
    mobile: state.registerRoomReducer.mobile,
  }
}

export default connect(mapStateToProps)(ReConfirm)
