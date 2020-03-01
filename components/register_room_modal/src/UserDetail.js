import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  FormControl,
  Form,
  Dropdown,
  DropdownButton,
  Button,
  Row
} from 'react-bootstrap';
import I18n from '../../../lib/translations/i18n'
import Select from 'react-select'
import SearchAutoComplete from '../../commons/SearchAutoComplete';
import { withUserAgent } from "react-useragent";

// ACTION
import { changeFreeInput } from '../../../actions/room_register/room_register'
import { submitRoomRegister } from '../../../actions/room_register/room_register'


// CLASS
class UserDetail extends Component {

  constructor(props){
    super(props)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.onCityChange = this.onCityChange.bind(this)
    this.state = {
      isValidated : true
    }
  }

  onSubmit(e){
    e.preventDefault()

    let {
      floor_id,
      floor_number,
      room_id,
      room_number,
      room_type_id,
      room_type_name,
      total_bed_room,
      total_bath_room,
      property_detail,
      first_name,
      last_name,
      email,
      mobile,
      property_name,
      city_id
    } = this.props

    let property_id = property_detail !== null ? property_detail.id : null;

    this.props.dispatch(submitRoomRegister(
      property_id,
      property_name,
      city_id,
      floor_id,
      floor_number,
      room_id,
      room_number,
      room_type_id,
      room_type_name,
      total_bed_room,
      total_bath_room,
      first_name,
      last_name,
      email,
      mobile
    ))
  }

  jumpToStep(toStep) {
    this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
  }

  onChangeInput(e,key = null , value = null){
    let key_input = key === null ? e.target.name : key
    let value_input = value === null ? e.target.value : value
    this.props.dispatch(changeFreeInput(key_input,value_input))
  }

  onCityChange(value){
    let city = value[0];
    this.props.dispatch(changeFreeInput('city_id',city.id))
  }

  render(){
    let {property_detail} = this.props
    const isValidatedClass = this.state.isValidated ? 'btn btn-stepzilla-light btn-info pull-right float-right btn-next-step' : 'btn btn-stepzilla-light btn-info pull-right float-right btn-next-step disabled';

    const formatGroupLabel = data => (
       <div style={groupStyles}>
         <span className="text-primary">{data.label}</span>
         <span className="text-primary" style={{"color":"red"}}>{data.province_name}</span>
       </div>
     )
    const useragent = this.props.ua;

    return(
        <div style={{marginTop : '1em'}}>
        <Form onSubmit={(e) => this.onSubmit(e)}>
          <Row>
          {property_detail === null ?
            <Form.Group controlId="city" className="col-md-12 col-lg-6 col-xl-12 col-sm-12 col-xs-12">
              <Form.Label className="text-light1 text-bold">{I18n.t('property_location')}</Form.Label>
              <SearchAutoComplete
              inputProps={{autoComplete: 'nope'}}
              key={"select-single-1"} index={0} data={this.props.city_list} placeholder={I18n.t('placeholder_city')} labelKey="name" onChange={this.onCityChange}/>
            </Form.Group>
            :''}

            <Form.Group controlId="first_name" className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <Form.Label className="text-light1 text-bold">{I18n.t('first_name')}</Form.Label>
              <Form.Control autoComplete="new-password" required name="first_name" placeholder={I18n.t('placeholder_first_name')} onChange={(e)=>this.onChangeInput(e)}/>
            </Form.Group>

            <Form.Group controlId="last_name" className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <Form.Label className="text-light1 text-bold">{I18n.t('last_name')}</Form.Label>
              <Form.Control autoComplete="new-password" name="last_name" placeholder={I18n.t('placeholder_last_name')} onChange={(e)=>this.onChangeInput(e)}/>
            </Form.Group>

            <Form.Group controlId="email" className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
              <Form.Label className="text-light1 text-bold">{I18n.t('email')}</Form.Label>
              <Form.Control autoComplete="new-password" name="email" type="email" placeholder={I18n.t('placeholder_email')} onChange={(e)=>this.onChangeInput(e)}/>
            </Form.Group>

            <Form.Group controlId="mobile" className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
              <Form.Label className="text-light1 text-bold">{I18n.t('mobile')}</Form.Label>
              <Form.Control autoComplete="new-password" name="mobile" type="text" placeholder={I18n.t('placeholder_mobile')} onChange={(e)=>this.onChangeInput(e)}/>
            </Form.Group>

            <Form.Group controlId="submit" className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
              <Button type="submit" className={isValidatedClass} onClick={() => property_detail.estimate == null ?  '' : this.jumpToStep(3)}>
                 Next
              </Button>
            </Form.Group>
            </Row>
          </Form>
        </div>
      )
  }
}

function mapStateToProps (state) {
  return{
    property_detail : state.registerRoomReducer.property_detail,
    phone : state.registerUserReducer.phone,
    password  : state.registerUserReducer.password,
    confirm_password  : state.registerUserReducer.confirm_password,
    city_list : state.locationReducer.city_list,
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
    city_id: state.registerRoomReducer.city_id,
  }
}

export default withUserAgent(connect(mapStateToProps)(UserDetail))
