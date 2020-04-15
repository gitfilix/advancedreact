import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation, Query } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

// single Item query
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id :ID!) {
    item(where: { id: $id}) {
      id
      title
      description
      price
    }
  }
`

//mutation query
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
      $title: String!
      $description: String!
      $price: Int!
      $image: String
      $largeImage: String
  ) {
    teItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class UpdateItem extends Component {
  state = {}

  // onChange of every field - update state
  // very fancy: [name] is variable
  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val
    })
  }


  // Mutation-function with IMPLICIT RETURN with this normal brackets => ()
  render() {
    return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={async (e) => {
            // 1. stop form from submitting
            e.preventDefault()
            // 2. call the mutation
            const res = await createItem()
            // 3. change them to the single item page
            console.log('response', res);
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <Error error={error} />
            {/* if loading is true disable form and trigger bg-animation */}
            <fieldset disabled={loading} aria-busy={loading} >
              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title'
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor='price'>
                Price
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Title'
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor='description'>
                Description
                <textarea
                  id='description'
                  name='description'
                  placeholder='Enter a Description'
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
            </fieldset>
            <button type='submit'>Submit Form</button>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION }