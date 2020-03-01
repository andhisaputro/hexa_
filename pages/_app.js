import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { PageTransition } from 'next-page-transitions'
import Content from './login/src/Content'
 
class MyApp extends App {
  componentWillUnmount(){
    // this.props.dispatch(IntlActions.setLocale('en'))
  }

  static async getInitialProps({ Component, router, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <PageTransition
          timeout={0}
          classNames="page-transition"
          loadingDelay={0}
          loadingComponent={<Content />}
          loadingTimeout={{
            enter: 400,
            exit: 0,
          }}
          loadingClassNames="loading-indicator"
        >
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </PageTransition>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
