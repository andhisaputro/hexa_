import { connect } from 'react-redux'
import React, { Component } from 'react'; 
import LandingPage from '../../components/layouts/landing_page' 
import { setTitlePage } from '../../actions/meta/metaAction'; 
import AddModal from './src/AddModal'
import { apiCall } from '../../actions/request/apiCall'; 
import { snackBarPayload} from '../../actions/loader/loaderAction' 
import Router from 'next/router'
import BreadCrumb from '../../components/commons/BreadCrumb'

class ClassPage extends Component {
  constructor(props){
    super(props)
    this.state={
      showAddModal : false,
      programName :'',
      errorValidation : {},
      dataList : []
    }
  }

  componentDidMount(){
    this.props.dispatch(setTitlePage("Class Page")) 
    this.getDataList()
  }

  handleChangeInput(e){
    this.setState({programName : e.target.value })
  }

  onAddSubmit = async () => { 
    let datas = new FormData();
    datas.append('name', this.state.programName) 

      const dataReq={
          method: 'POST',
          url: '/api/class/add',
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
        this.setState({ showAddModal : false , programName : ''}) 
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
          url: '/api/class/list',
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
          dataList : response.data
        })
      } 

      if(response.meta && response.meta.code === 400 && response.error ){
        this.props.dispatch(snackBarPayload({'type' : 'warning' , 'text' : 'Gagal mengambil data'})); 
      } 

   }

  render(){
     const { dataList } = this.state
     return(      
      <LandingPage> 

        <BreadCrumb 
          list={[{ 'path' : '' , 'name' : 'Home'} , { 'path' : 'class' , 'name' : 'Kelas' }]}
        />

         {/* Begin Page Content */}
        <div className="container-fluid">

          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Kelas</h1>

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
              <h6 className="m-0 font-weight-bold text-primary">Data Program</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Nama</th> 
                    </tr>
                  </thead> 
                  <tbody>
                    {
                      dataList.map((item) => {
                          return(
                            <tr key={item._id}>
                              <td>{item.name}</td> 
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
            <input name="name" value={this.state.programName} onChange={(e)=> this.handleChangeInput(e)} type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
        </div> 
        <small id="emailHelp" class="form-text" style={{color : 'red'}}>{this.state.errorValidation.name}</small>     
      </AddModal>
      </LandingPage>
    )
  }
}

function mapStateToProps (state) {
  return{
    lang : state.setupLandingPageReducer.lang,
    userDetailReducer : state.authReducer
  }
}

export default connect(mapStateToProps)(ClassPage)
