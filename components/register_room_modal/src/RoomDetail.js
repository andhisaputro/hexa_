import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { changeFreeInput } from '../../../actions/room_register/room_register'
import { getCityList } from '../../../actions/location/location_action'


// CLASS
class RoomDetail extends Component {

  constructor(props){
    super(props)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.state = {
      isValidated : false
     };
  }

  componentWillMount(){
    if(this.props.property_detail === null){
      this.props.dispatch(getCityList())
    }
  }

  onChangeInput(e,key = null , value = null){
    let key_input = key === null ? e.target.name : key
    let value_input = value === null ? e.target.value : value

    this.props.dispatch(changeFreeInput(key_input,value_input))
  }

  jumpToStep(toStep) {
    // We can explicitly move to a step (we -1 as its a zero based index)
    if(this.state.isValidated === true){
      this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
    }else {
      alert('Form not complete yet !')
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.floor_id !== this.props.floor_id || newProps.room_type_id !== this.props.room_type_id || newProps.room_number !== this.props.room_number){
        if(this.props.floor_id !== null && this.props.floor_id !== null && this.props.room_number !== null){
          this.setState({isValidated : true })
        }
      }
  }

  onChangeSelect2(key,value){
    this.setState({[key] : value });
   }

  onSelected2(key,value){
    this.setState({[key] : value });
    this.props.dispatch(changeFreeInput('city_id',value))
  }

  render(){
    let {property_detail} = this.props
    if(property_detail === null)
    {
      property_detail = this.props.dumy_property_detail
    }
    const isValidatedClass = this.state.isValidated ? 'btn btn-stepzilla-light btn-info pull-right float-right btn-next-step' : 'btn btn-stepzilla-light btn-info pull-right float-right btn-next-step disabled';

    const formatGroupLabel = data => (
       <div style={groupStyles}>
         <span className="text-primary">{data.label}</span>
         <span className="text-primary" style={{"color":"red"}}>{data.province_name}</span>
       </div>
     )

    return(
        <Container>

        {property_detail.id === 0 ?
          <Form.Group controlId="floorId">
            <Form.Label>{I18n.t('property_location')}</Form.Label>
            <Select
              value={this.state.city}
              onChange={city => this.onSelected2('city',city)}
              inputValue={this.state.city_name}
              onInputChange={ val => this.onChangeSelect2('city_name',val)}
              isSearchable={true}
              placeholder="Starting typing city name... "
              formatGroupLabel={formatGroupLabel}
              options={this.props.city_list}
              inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }}
            />
          </Form.Group>
          :''}
          <Form.Group controlId="floorId">
            <Form.Label>{I18n.t('floor')}</Form.Label>
              <Form.Control as="select" defaultValue={""} onChange={(e)=>this.onChangeInput(e,'floor_id')}>
                   <option disabled value="">- {I18n.t('select')} -</option>
                {
                  property_detail.floor.map((item,key)=>(
                    <option key={key} value={item.id}>{item.number}</option>
                  ))
                }
              </Form.Control>
          </Form.Group>

          <Form.Group controlId="roomType">
            <Form.Label>{I18n.t('room_type')}</Form.Label>
              <Form.Control as="select" defaultValue={""} onChange={(e)=>this.onChangeInput(e,'room_type_id')}>
                <option disabled value="">- {I18n.t('select')} -</option>
                {
                  property_detail.room_type.map((item,key)=>(
                    <option key={key} value={item.id}>{item.name}</option>
                  ))
                }
              </Form.Control>
          </Form.Group>

          <Form.Group controlId="roomType">
            <Form.Label>{I18n.t('room_number')}</Form.Label>
            <Form.Control autoComplete="off" autoCorrect="off" spellCheck="off" placeholder="Room number" onChange={(e)=>this.onChangeInput(e,'room_number')}/>
          </Form.Group>

        <br/>
        <Button className={isValidatedClass} onClick={() => this.jumpToStep(3)}>
           Next
        </Button>
        </Container>
      )
  }
}

function mapStateToProps (state) {
  return{
    property_detail : state.registerRoomReducer.property_detail,
    floor_id : state.registerRoomReducer.floor_id,
    room_type_id : state.registerRoomReducer.room_type_id,
    room_number : state.registerRoomReducer.room_number,
    dumy_property_detail : state.registerRoomReducer.dumy_property_detail,
    city_list : state.locationReducer.city_list,
  }
}

export default connect(mapStateToProps)(RoomDetail)
