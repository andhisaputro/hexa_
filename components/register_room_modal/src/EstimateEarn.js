import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Button,
  Badge
} from 'react-bootstrap';
import I18n from '../../../lib/translations/i18n'

// ACTION
import { submitRoomRegister } from '../../../actions/room_register/room_register'
import { saluation } from '../../../actions/helpers/general_helper'
// CLASS

const styles = {
  containerEarn : {
    paddingTop : '5em'
  },
  badge : {
    "backgroundColor": "transparent",
    "color": "#FFCB1F",
    "fontSize": "12px",
    "marginLeft": "0px"
  }
}
class EstimateEarn extends Component {
  state = { value: 0 };

  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(){
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

  jumpToStep(toStep,free  = false) {
    this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
  }

  kFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) +  I18n.t('million') : Math.sign(num)*Math.abs(num)
  }

  render(){
    const {property_detail} = this.props
    const {estimate} = property_detail
    const count_estimate = (estimate.prices / 100) * 7

    return(
        <Container className="confirm-earn-total" style={styles.containerEarn}>
          <p className="light-color-one">{I18n.t('ESEA_000003')}</p>
          <h1 style={styles.h1}>{I18n.t('rp')+' '+this.kFormatter(count_estimate)} <Badge style={styles.badge} variant="secondary">{I18n.t('ESEA_000004')}</Badge></h1>
          <p className="white p-title">{I18n.t('ESEA_000001')}</p>
          <p className="white p-sub-title">{I18n.t('ESEA_000002')}</p>
          {/*
          <p className="light-color-one text-bold">
            Thank you for trusting Roomz for the purposes of managing your apartment unit rental, our accuracy team will immediately contact you to verify the data.
          </p>*/}
          {<Button onClick={()=>this.onSubmit()} className="btn-stepzilla-light btn btn-warning">{I18n.t('confirm')}</Button>}
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
    city_id: state.registerRoomReducer.city_id,
    lang : state.setupLandingPageReducer.lang,
  }
}

export default connect(mapStateToProps)(EstimateEarn)
