import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import I18n from '../../../lib/translations/i18n'
import { 
  Container
} from 'react-bootstrap';
import CenterMediumModal from '../../commons/modals/CenterMediumModal'
import StepZilla from "react-stepzilla";
import Step1 from './src/Step1'
import Step2 from './src/Step2'
import Step3 from './src/Step3'

//function
import { openRegisterModal , clearForm } from '../../../actions/user/user_register_action'


// CLASS

const steps =
    [
      {name: 'Step 1', component: <Step1 />},
      {name: 'Step 2', component: <Step2 />},
      {name: 'Step 3', component: <Step3 />}
    ]

class FormStepUserRegister extends Component {
  constructor(props){
    super(props)
    this.handleCloseRegister = this.handleCloseRegister.bind(this)
  }

  handleCloseRegister(){
    this.props.dispatch(clearForm(false))
    this.props.dispatch(openRegisterModal(false))
  }

  render(){
    console.log(this.props)

    return(
        <Container>
          <Step1/>
          <Step2/>
          <Step3/>
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

export default connect(mapStateToProps)(FormStepUserRegister)
