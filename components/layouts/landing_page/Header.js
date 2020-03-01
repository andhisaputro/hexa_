import Link from 'next/link'
import Head from 'next/head';
import React, { Component } from 'react';
import I18n from '../../../lib/translations/i18n';
import { setLang } from '../../../actions/appSetup/appSetupAction'; 
import { connect } from 'react-redux' 
import SnackBar from '../../commons/modals/SnackBar';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const { APP_KEY_GOOGLE_MAP} = publicRuntimeConfig

// CLASS
class Header extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(setLang(0))
  }

  handleMobileMenuToogle(){
    this.props.dispatch(setMenuToogle(!this.props.is_main_menu))
  }

  render(){ 
    let { meta } = this.props;
    return(
      <div>
          <Head>
            {/* MAIN WEB */}

            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <title>{I18n.t('brand')} | {meta.title}</title>

            {/* META */}

            <meta name="author" content="SaputroAndhi"></meta>
            <meta name="description" content={meta.description}></meta>
            <meta name="keywords" content={meta.keywords}></meta>

            {/* TWITTER */}
            <meta name="twitter:card" content="summary"></meta>
            <meta name="twitter:site" content="@SaputroAndhi"></meta>
            <meta name="twitter:creator" content="@SaputroAndhi"></meta>
            <meta name="twitter:title" content={I18n.t('brand') +' | '+ meta.og_title}></meta>
            <meta name="twitter:url" content={meta.og_url}></meta>
            <meta name="twitter:description" content={meta.og_description}></meta>
            <meta name="twitter:image:src" content={meta.og_image}></meta>

            {/* OG FACEBOOK */}
            <meta property="og:title" content={I18n.t('brand') +' | '+ meta.og_title}></meta>
            <meta property="og:description" content={meta.og_description} ></meta>
            <meta property="og:image" content={meta.og_image}></meta>
            <meta property="og:url" content={meta.og_url}></meta>
            <meta property="og:type" content={meta.og_type}></meta>

            <link href="/static/sbadmin/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
            <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"/>
            <link href="/static/sbadmin/css/sb-admin-2.min.css" rel="stylesheet"/>
          
          </Head>
          <SnackBar/> 
      </div>
    )
  }
}

function mapStateToProps (state) {
  return{
    meta : state.metaReducer,
    lang_list : state.setupLandingPageReducer.lang_list,
    lang : state.setupLandingPageReducer.lang
  }
}

export default connect(mapStateToProps)(Header)
