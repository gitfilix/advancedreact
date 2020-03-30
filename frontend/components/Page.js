import React, { Component } from 'react'
import Header from '../components/Header'
import Meta from '../components/Meta'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

const theme = {
  red: '#A33',
  black: '#121212',
  grey: '#555',
  lightgray: '#e1e1e1',
  offWhite: '#ededed',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0,0,0,0.8)'
}

const StylePage = styled.div`
  color: ${props => props.theme.black};
  background: #FFF;
`
const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StylePage>
          <Meta />
          <Header />
            <Inner>
              {this.props.children}
            </Inner>
        </StylePage>
      </ThemeProvider>
    );
  }
}

export default Page