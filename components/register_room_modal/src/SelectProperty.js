import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Maps from "../../commons/map"
import {
  Container,
  FormControl,
  Form,
  Dropdown,
  DropdownButton,
  Button
} from 'react-bootstrap';
import I18n from '../../../lib/translations/i18n'
import Select from 'react-select'

// ACTION
import { setRegisterUserInput } from '../../../actions/user/user_register_action'
import { saluation } from '../../../actions/helpers/general_helper'
import { getPropertyList } from '../../../actions/property/property_action'
import { getProvinceList } from '../../../actions/location/location_action'
import { changeFreeInput , setPropertyDetail } from '../../../actions/room_register/room_register'

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};


class SelectProperty extends Component {

  constructor(props){
      super(props)
      this.state = {
        isShowMaps : true,
        isValidated : false
      }
      this.onChangeSelect2 = this.onChangeSelect2.bind(this)
    }

   jumpToStep(toStep,free  = false) {
     // We can explicitly move to a step (we -1 as its a zero based index)
     if(this.state.isValidated === true || free !== false){
       this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
     }else {
       alert('Select Property !')
     }
   }

  componentWillMount(){
    this.props.dispatch(getPropertyList(null,true,this.props.total_bed_room,this.props.total_bath_room))
    this.props.dispatch(setPropertyDetail(null))
  }

  onChangeSelect2(key,value){
    clearTimeout(this.timer)
    this.setState({[key] : value });
   }

  onSelected2(key,value){
    this.setState({[key] : value });
    if(key === "property"){
      this.setState({ isShowMaps: false })
      this.props.dispatch(setPropertyDetail(value))

      this.props.dispatch(changeFreeInput('register_new_property',false))
      this.setState({isValidated : true})
    }
  }

  handleNoResultButton(property_name){
    this.setState({isValidated:true})
    this.props.dispatch(changeFreeInput('property_name',property_name))
    setTimeout(this.jumpToStep(3,'free'))
  }

  render(){
     const isValidatedClass = this.state.isValidated ? 'btn btn-stepzilla-light btn-info pull-right float-right btn-next-step' : 'btn btn-stepzilla-light btn-info pull-right float-right btn-next-step disabled';
     let {property_detail} = this.props

     const formatGroupLabel = data => (
        <div style={groupStyles}>
          <span className="text-primary">{data.label}</span>
          <span className="text-primary" style={groupBadgeStyles}>{data.length}</span>
        </div>
      )


    return(
      <div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-light1 text-bold">{I18n.t('property_name')}</Form.Label>
          <Select
            value={ property_detail !== null ? property_detail : this.state.property}
            onChange={property => this.onSelected2('property',property)}
            inputValue={this.state.property_name}
            onInputChange={ val => this.onChangeSelect2('property_name',val)}
            isSearchable={true}
            noOptionsMessage={() => <Button className="btn btn-info" onClick={()=> this.handleNoResultButton(this.state.property_name)} >Your property has no register yet,<br/> Click to Register This Property</Button>}

            placeholder="Starting typing Property name... "
            formatGroupLabel={formatGroupLabel}
            options={this.props.property_list}
            inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }}
          />
        </Form.Group>
        {
          this.props.register_new_property === true && property_detail === null?
          <>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{I18n.t('province')}</Form.Label>
            <SelectProvince
                value={ this.state.province }
                onChange={province => this.setState({ province })}
                inputValue={this.state.province_name}
                onInputChange={ val => this.onChangeSelect2('province_name',val)}
                isSearchable={true}
                noOptionsMessage={() => <Button className="btn btn-info" onClick={()=> this.setState({property_name : this.state.property_name})} >Your property has no register yet,<br/> Click to Register This Property</Button>}
                placeholder="Starting typing city name... "
                formatGroupLabel={formatGroupLabel}
                inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }}
              />
            </Form.Group>
          </>
          :
          property_detail !== null && this.state.isShowMaps === true?
          <>
            <Maps
              isMarkerShown
              lat={property_detail.latitude}
              lng={property_detail.longitude}
            />
          </>
          :
          <>
          </>
        }

       <br/>
       <Button className={isValidatedClass} onClick={() => this.jumpToStep(2)}>
          Next
       </Button>

       </div>
      )
  }
}

function mapStateToProps (state) {
  return{
    property_list : state.propertyReducer.property_list,
    province_list : state.locationReducer.province_list,
    property_detail : state.registerRoomReducer.property_detail,
    register_new_property : state.registerRoomReducer.register_new_property,
    total_bed_room : state.registerRoomReducer.total_bed_room,
    total_bath_room : state.registerRoomReducer.total_bath_room
  }
}

export default connect(mapStateToProps)(SelectProperty)
