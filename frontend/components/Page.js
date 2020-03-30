import React, { Component } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Header from '../components/Header'
import Meta from '../components/Meta'

const theme = {
  red: '#A33',
  black: '#222',
  grey: '#555',
  lightgrey: '#d7d7d7',
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
// global styles 
injectGlobal`
  @font-face {
    font-family: 'radnika_next' ;
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration:none;
    color: ${theme.black};
  }
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