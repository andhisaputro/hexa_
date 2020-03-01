import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { setLoginEmail,setLoginPassword , handleSubmitLogin} from '../../../actions/auth/authAction' 
import { snackBarPayload} from '../../../actions/loader/loaderAction' 

class Content extends Component {

  constructor(props){
    super(props)
    this.state = {
      show_message : false,
      text_message : "",
      show_modal : false,
      resend_type : null // "password" or "verify_email"
    }

    this.handleSetEmail    = this.handleSetEmail.bind(this)
    this.handleSetPassword = this.handleSetPassword.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
  }

  handleSetEmail(e){ 
    this.props.setLoginEmail(e.target.value)
  }

  handleSetPassword(e){
    this.props.setLoginPassword(e.target.value)
  }

  handleSubmitLogin(){
    if(this.props.login_email === '' || this.props.login_password === ''){
      this.props.snackBarPayload({'type' : 'warning' , 'text' : 'Mohon lengkapi email dan password'}); 
    }else{
      this.props.handleSubmitLogin(this.props.login_email,this.props.login_password)
    }
  }
 
  render(){
    return(
      <div className="container"> 

      <div className="row justify-content-center">
  
        <div className="col-xl-10 col-lg-12 col-md-9">
  
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">

              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Selamat Datang</h1>
                    </div>
                    {/* <form className="user"> */}
                      <div className="form-group">
                        <input onChange={(e)=> this.handleSetEmail(e)} type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="example@email.com"/>
                      </div>
                      <div className="form-group">
                        <input onChange={(e)=> this.handleSetPassword(e)} type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="**********"/>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck"/>
                        </div>
                      </div>
                      <button onClick={()=> this.handleSubmitLogin() }  className="btn btn-primary btn-user btn-block">
                        Masuk
                      </button>
                      <hr/> 
                    {/* </form> */}
                    {/* <hr/>
                    <div className="text-center">
                      <a className="small" href="forgot-password.html"></a>
                    </div> */}
                    <div className="text-center">
                      <a className="small" href="register">Buat akun !</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
  
      </div>
  
    </div>
      )
  }
}

function mapStateToProps (state) {
  return{
    lang : state.setupLandingPageReducer.lang, 
    login_email : state.authReducer.login_email,
    login_password : state.authReducer.login_password
  }
}

const actions =  {
  setLoginEmail,setLoginPassword , handleSubmitLogin , snackBarPayload
}
export default connect(mapStateToProps,actions)(Content)
