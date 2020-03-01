import { connect } from 'react-redux'
import React, { Component } from 'react'; 
import LandingPage from '../../components/layouts/landing_page' 
import { setTitlePage } from '../../actions/meta/metaAction'; 
import AddModal from './src/AddModal'
import { apiCall } from '../../actions/request/apiCall'; 
import { snackBarPayload} from '../../actions/loader/loaderAction' 
import Router from 'next/router'
import BreadCrumb from '../../components/commons/BreadCrumb'

class SubjectPage extends Component {
  constructor(props){
    super(props)
    this.state={
      showAddModal : false,
      errorValidation : {},
      data_list : [],
      inputName : '',
      inputCredit : 1
    }
  }

  componentDidMount(){
    this.props.dispatch(setTitlePage("Home Page")) 
    this.getDataList()
  }

  handleChangeInput(e){
    this.setState({[e.target.name] : e.target.value })
  }

  onAddSubmit = async () => { 
    let datas = new FormData();
    datas.append('name', this.state.inputName) 
    datas.append('credit', this.state.inputCredit) 

      const dataReq={
          method: 'POST',
          url: '/api/subject/add',
          data: {
              data : datas,
              params:{
                  ...datas
              },
              headers:{
                // "token" : token
              }
          },
          baseURL : ''
      }
      
      const response = await apiCall(dataReq);
      
      if(response.meta && response.meta.code === 200){ 
        this.setState({ showAddModal : false , inputName : ''}) 
        this.props.dispatch(snackBarPayload({'type' : 'success' , 'text' : 'Data berhasil di tambahkan'})); 
        this.getDataList()

        setTimeout(() => {
          this.props.dispatch(snackBarPayload(false)); 
        },5000);

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

   getDataList = async () => { 
  
      const dataReq={
          method: 'get',
          url: '/api/subject/list',
          data: { 
              headers:{
                // "token" : token
              }
          },
          baseURL : ''
      }
      
      const response = await apiCall(dataReq);
      
      if(response.meta && response.meta.code === 200){ 
        this.setState({
          data_list : response.data
        })
      } 

      if(response.meta && response.meta.code === 400 && response.error ){
        this.props.dispatch(snackBarPayload({'type' : 'warning' , 'text' : 'Gagal mengambil data program'})); 
      } 

   }

  render(){
     const { data_list } = this.state

     const optionCredit = [];

     for(var i = 1 ;i < 21 ; i ++){
        optionCredit.push(<option value={i}>{i}</option>)
     }
     return(      
      <LandingPage> 

        <BreadCrumb 
          list={[{ 'path' : '' , 'name' : 'Home'} , { 'path' : 'programs' , 'name' : 'Program' }]}
        />

         {/* Begin Page Content */}
        <div className="container-fluid">

          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Mata Kuliah</h1>

          <a href="#" class="btn btn-info btn-icon-split float-right">
            <span class="icon text-white-50">
              <i class="fas fa-plus-circle"></i>
            </span>
            <span class="text" onClick={()=>this.setState({ showAddModal : !this.state.showAddModal })}>Tambah Data</span>
          </a>
          <br/>
          <br/>
          
          {/* DataTales Example */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Data Mata Kuliah</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Nama</th> 
                      <th>SKS</th> 
                    </tr>
                  </thead> 
                  <tbody>
                    {
                      data_list.map((item) => {
                          return( 
                            <tr>
                              <td>{item.name}</td> 
                              <td>{item.credit}</td> 
                            </tr>  
                          )
                      })
                    } 
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
        {/* /.container-fluid */} 
      <AddModal onSubmit={()=> this.onAddSubmit()} show={this.state.showAddModal} onClose={() => this.setState({ showAddModal : !this.state.showAddModal })}>
        <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Nama</span>
        </div>
            <input name="inputName" value={this.state.inputName} onChange={(e)=> this.handleChangeInput(e)} type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
        </div> 
        <small id="emailHelp" class="form-text" style={{color : 'red'}}>{this.state.errorValidation.name}</small>     

        <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">SKS</span>
        </div>
          <select  class="form-control"  value={this.state.inputCredit} name="inputCredit" onChange={(e)=> this.handleChangeInput(e)}>
             { optionCredit }
          </select>
        </div> 
        <small id="emailHelp" class="form-text" style={{color : 'red'}}>{this.state.errorValidation.name}</small>     
        
      </AddModal>
      </LandingPage>
    )
  }
}

function mapStateToProps (state) {
  return{ 
  }
}

export default connect(mapStateToProps)(SubjectPage)
