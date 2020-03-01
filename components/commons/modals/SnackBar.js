import React, { Component } from 'react'; 
import { connect } from 'react-redux' 
import ReactSnackBar from "react-js-snackbar";
import { snackBarPayload} from '../../../actions/loader/loaderAction' 

class SnackBar extends Component {
  constructor(props){
    super(props)

     this.handleClickSnackBar = this.handleClickSnackBar.bind(this)
  }
  
  handleClickSnackBar(){
    this.props.snackBarPayload(false)
  }
  render(){
    
    if(this.props.SnackBarReducer === false ) return <></>;

    const {type , text } = this.props.SnackBarReducer
    let icon = '';

    switch(type){
      case 'success':
        icon = <i className="fas fa-check-circle fa-lg" style={{color:"#34A853"}}/>
      break;
      case  'warning':
        icon = <i className="fas fa-times-circle fa-lg" style={{color:"#FBBC05"}}/>
      break;
      case  'danger':
        icon = <i className="fas fa-times-circle fa-lg" style={{color:"#EA4335"}}/>
      break;
    }
    return(
      <div onClick={() => this.handleClickSnackBar()}>
        <ReactSnackBar Icon={icon} Show={this.props.SnackBarReducer ? true : false}>
            {text}
        </ReactSnackBar>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return{
    SnackBarReducer : state.loaderReducer.snack_bar,
  }
}

export default connect(mapStateToProps,{snackBarPayload})(SnackBar)
