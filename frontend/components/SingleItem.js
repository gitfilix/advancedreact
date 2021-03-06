import React, { Component } from 'react';
import gql from 'graphql-tag'
import { Query} from 'react-apollo'
import Error from './ErrorMessage'
import Head from 'next/head'
import styled from 'styled-components'

const SingleItemStyles = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 400px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 2rem;
    font-size: 2rem;
    h2 {
      background: #300;
      color: #A33;
      font-family: 'radnika_next';
      line-height: 3.5rem;
      font-style: italic;
    }
  }
`

const SINLE_ITEM_QUERY = gql`
  query SINLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      description
      largeImage
    }
  }
`

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINLE_ITEM_QUERY} 
      variables={{
        id: this.props.id
        }}
      >
      {({error, loading, data}) => {
        if (error) return (
          <Error error={error} />
        ) 
        if (loading) return (
          <span>Loading</span>
        )
        if (!data.item) return (
        <p>No item found for {this.props.id}</p>
        )
        const item = data.item
        return (
          <SingleItemStyles>
            <Head>
              <title>Sick Item | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className='details'>
              <h2>Viewing {item.title}</h2>
              <p>{item.description}</p>
            </div>
          </SingleItemStyles>
        )
      }}
      </Query>
    );
  }
}

export default SingleItem;