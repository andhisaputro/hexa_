import React, { Component } from 'react'; 
import { connect } from 'react-redux'
import { snackBarPayload } from '../../../actions/loader/loaderAction' 

class AjaxLoaderModal extends Component {
  constructor(props){
    super(props)

    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleCloseModal(){
    this.props.dispatch(toggleMessageModal(false,'',''))
  }

  render(){ 
    let className
    let style

    if(this.props.is_ajax_loader) {
      className = 'modal fade show'
      style = {"padding-right": "17px","display":"block"}
    }else{
      className = 'modal fade';
      style     = {"display": "none"}
    }

    return(
      <div className={className} id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={style}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button onClick={()=> this.handleCloseModal()} className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              {/* <a className="btn btn-primary" href="login.html">Logout</a> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return{
    is_ajax_loader : state.loaderReducer.is_ajax_loader,
  }
}

export default connect(mapStateToProps)(AjaxLoaderModal)
