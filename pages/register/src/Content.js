import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { snackBarPayload} from '../../../actions/loader/loaderAction' 
import { apiCall } from '../../../actions/request/apiCall'; 
import Router from 'next/router'

class Content extends Component {

  constructor(props){
    super(props)
    this.state = {
      show_message : false,
      text_message : "",
      show_modal : false,
      resend_type : null, // "password" or "verify_email",
      level : 'student',
      errorValidation : []
    }
 }

  handleChangeInput(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmitRegister = async () => { 
    let datas = new FormData();
    datas.append('first_name', this.state.first_name  )
    datas.append('last_name', this.state.last_name )
    datas.append('email', this.state.email )
    datas.append('password', this.state.password )
    datas.append('level', this.state.level )

    const dataReq={
        method: 'POST',
        url: '/api/register',
        data: { 
            headers:{
              // "token" : token
            },
            data : datas
        },
        baseURL : ''
    }
    
    const response = await apiCall(dataReq);
    
    if(response.meta && response.meta.code === 200){ 
      this.setState({
        count_summary : response.data
      })
    } 

    if(response.meta && response.meta.code === 200){ 
      this.props.snackBarPayload({'type' : 'success' , 'text' : 'Berhasi Register'}); 

      setTimeout(() => {
        Router.push('/login')
      },1000);

    } 

    if(response.meta && response.meta.code === 400 && response.error ){
      const error_server = response.error
      const errorValidation  = [];
      error_server.map(item => {
        errorValidation[item.param] = item.msg 
      })

      this.setState({errorValidation : errorValidation})
    } 

 }

  
  render(){
    const {errorValidation} = this.state
    return(
      <div class="container">

      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          {/* <!-- Nested Row within Card Body --> */}
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Buat Akun</h1>
                </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input onChange={(e) => this.handleChangeInput(e)} name="first_name" type="text" class="form-control form-control-user" id="exampleFirstName" placeholder="First Name"/>
                    </div>
                    <div class="col-sm-6">
                      <input onChange={(e) => this.handleChangeInput(e)} name="last_name" type="text" class="form-control form-control-user" id="exampleLastName" placeholder="Last Name"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <input onChange={(e) => this.handleChangeInput(e)} name="email" type="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address"/>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input onChange={(e) => this.handleChangeInput(e)} name="password" type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                    </div>
                    <div class="col-sm-6">
                      <input onChange={(e) => this.handleChangeInput(e)} name="confirm_password" type="password" class="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                        <label className="float-center"><input onChange={(e) => this.handleChangeInput(e)} class="form-control form-control-user" type="radio" name="level" checked/> Siswa</label>
                     </div> 
                     <div class="col-sm-6 mb-3 mb-sm-0">
                        <label className="float-center"><input onChange={(e) => this.handleChangeInput(e)} class="form-control form-control-user" type="radio" name="level"/> Admin</label>
                     </div>
                  </div>

                  <button onClick={()=> this.handleSubmitRegister() }  class="btn btn-primary btn-user btn-block">
                    Register Account
                  </button> 
                <hr/> 
                <div class="text-center">
                  <a class="small" href="login"> Sudah punya akun ? Login!</a>
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
   snackBarPayload
}
export default connect(mapStateToProps,actions)(Content)
