import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import I18n from '../../lib/translations/i18n'
import {
  Container,
  Modal
} from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import CenterMediumModal from '../commons/modals/CenterMediumModal'
import StepZilla from "react-stepzilla";
import SelectProperty from './src/SelectProperty'
import RoomDetail from './src/RoomDetail'
import UserDetail from './src/UserDetail'
import EstimateEarn from './src/EstimateEarn'
import ReConfirm from './src/ReConfirm'
import FullScreenModal from '../commons/modals/FullScreenModal'
import { withUserAgent } from "react-useragent";
import { getCityList } from '../../actions/location/location_action'

//ACTIONS
import { toogleRegisterRoomModal } from '../../actions/modal/modal_action'

// CLASS

const steps =
    [
      {name: '', component: <SelectProperty />},
      {name: '', component: <UserDetail />},
      {name: '', component: <EstimateEarn />}
      // {name: '', component: <RoomDetail />},
      // {name: '', component: <ReConfirm />},
    ]

class RegisterRoomModal extends Component {
  constructor(props){
    super(props)
    this.handleToggleRegModalRoom = this.handleToggleRegModalRoom.bind(this)
  }

  componentWillMount(){
    this.props.dispatch(getCityList())
  }

  handleToggleRegModalRoom(bool){
    this.props.dispatch(toogleRegisterRoomModal(bool))
  }

  generateComponent(){
    return(
      <div className="step-zilla-room-register">
        <button type="button" onClick={()=>this.handleToggleRegModalRoom(!this.props.show)} className="back-btn-register">
         <span aria-hidden="true"><FaAngleLeft/></span>
        </button>

        <div className='step-progress'>
         <StepZilla
         backButtonCls="btn btn-stepzilla btn-warning pull-left float-left"
         nextButtonCls="btn btn-stepzilla-light btn-info pull-right float-right btn-next-step"
         steps={steps}
         stepsNavigation={false}
         nextBtnOnLastStep={false}
         prevBtnOnLastStep={false}
         nextTextOnFinalActionStep={'Get Your Estimate'}
         onStepChange={(step) => console.log(step)}
         showNavigation={false}
        />
        </div>
      </div>
    )
  }
  render(){
      const useragent = this.props.ua;
         if(useragent.mobile !== null){
          return (
            <FullScreenModal show={true} backgroundColor="#0F75BC">
              {this.generateComponent()}
            </FullScreenModal>
          )
        }else {
          return this.generateComponent()
        }
     }
}

function mapStateToProps (state) {
  return{
    show  : state.modalRegisterRoomsReducer.show,
    email : state.registerUserReducer.email,
    first_name : state.registerUserReducer.first_name,
    last_name : state.registerUserReducer.last_name,
    saluation : state.registerUserReducer.saluation,
    phone : state.registerUserReducer.phone,
    password  : state.registerUserReducer.password,
    confirm_password  : state.registerUserReducer.confirm_password,
    city_list : state.locationReducer.city_list,
    lang : state.setupLandingPageReducer.lang,
  }
}

export default withUserAgent(connect(mapStateToProps)(RegisterRoomModal))
