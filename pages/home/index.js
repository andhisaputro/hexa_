import { connect } from 'react-redux'
import React, { Component } from 'react'; 
import LandingPage from '../../components/layouts/landing_page' 
import { setTitlePage } from '../../actions/meta/metaAction'; 
import DashboardCard from '../../components/commons/Cards/DashboardCard'
import Router from 'next/router'
import { apiCall } from '../../actions/request/apiCall'; 

const styles = {
    container : {
      'padding' : '20px'
    }
}

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      count_summary : null
    }
  }
 
  componentDidMount() {
    this.props.dispatch(setTitlePage("Home Page"))  
    this.getDataList()
  }
  
  getDataList = async () => { 
  
    const dataReq={
        method: 'get',
        url: '/api/count_dashboard',
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
        count_summary : response.data
      })
    } 

    if(response.meta && response.meta.code === 400 && response.error ){
      this.props.dispatch(snackBarPayload({'type' : 'warning' , 'text' : 'Gagal mengambil data program'})); 
    } 

 }

  render(){
    if(!this.state.count_summary) return <></>

    const {count_summary} = this.state 
    return(
      <LandingPage>
        <div style={styles.container}>
            {/* <h>Tahun Ajaran 2020 - 2024</h>  */} 
            <div className="row">
              <DashboardCard onClick={()=> Router.push('/programs')} className="cold" name="Program" value={count_summary.Program}/>
              <DashboardCard onClick={()=> Router.push('/subject')} className="cold" name="Mata Kuliah" value={count_summary.Subject}/>
              <DashboardCard onClick={()=> Router.push('/class')} className="cold" name="Kelas" value={count_summary.Class}/>
              {/* <DashboardCard className="cold" name="Semester" value="4"/> */}
            </div>
        </div> 
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

export default connect(mapStateToProps)(HomePage)
