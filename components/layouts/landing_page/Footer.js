import React, { Component } from 'react';
import Link from 'next/link' 
import I18n from '../../../lib/translations/i18n';
import { connect } from 'react-redux'
import Router from 'next/router'

const styles = {
  mainFooter : {
  },
  app_img : {
    padding : '0'
  }
}

class Footer extends Component {
  constructor(props){
    super(props)
    this.state = {
      email : null
    }
    this.onClickSubscrition = this.onClickSubscrition.bind(this)
  }

  handleClickMenu(page){
    Router.push('/'+page);
  }

  onClickSubscrition(){
    if(this.state.email === null)
    return alert(I18n.t('email_please'))

    this.props.dispatch(mailSubscriptions(this.state.email))
  }

  render()
  {
    return(
       <footer className="page-footer font-small blue pt-4 main-footer" style={styles.mainFooter}>
          {/* FOOTER NAME */}
          

          <script src="static/sbadmin/vendor/jquery/jquery.min.js"/>
          <script src="static/sbadmin/vendor/bootstrap/js/bootstrap.bundle.min.js"/>
          <script src="static/sbadmin/vendor/jquery-easing/jquery.easing.min.js"/>
          <script src="static/sbadmin/js/sb-admin-2.min.js"/>
          <script src="static/sbadmin/vendor/datatables/jquery.dataTables.min.js"/>
          <script src="static/sbadmin/vendor/datatables/dataTables.bootstrap4.min.js"/>
          <script src="static/sbadmin/js/demo/datatables-demo.js"/>
       </footer>
    )
  }
}

function mapStateToProps (state) {
  return{
    lang : state.setupLandingPageReducer.lang
  }
}
export default connect(mapStateToProps)(Footer)
