import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import I18n from '../../../../lib/translations/i18n';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import { FaArrowLeft , FaHome } from 'react-icons/fa';


// STYLES
const styles = {
  containerStyle : {
    backgroundImage : "url('https://roomz.sgp1.cdn.digitaloceanspaces.com/web/assets/images/404.png')",
    backgroundSize: "contain",
    backgroundRepeat : "no-repeat",
    backgroundPosition : "center",
    height :'350px',
    marginTop:'3em'
  }
}
// CLASS
class Content extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
            <Container>
              <Row>
                <Col className="col-md-6 col-sm-12 col-xl-12">
                  <Container style={styles.containerStyle}>
                  <h1 className="text-big-blue text-center text-right">NOT FOUND</h1>
                  <Container className="d-flex justify-content-center">
                    <Button className="p-6 btn btn-info"><h3 className="text-big-blue">404</h3></Button>
                  </Container>
                  </Container>
                </Col>
               </Row>
            </Container>
          )
  }
}

function mapStateToProps (state) {
  return{
  }
}

export default connect(mapStateToProps)(Content)
