import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'


//mutation query
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
      $title: String!
      $description: String!
      $price: Int!
      $image: String
      $largeImage: String
  ) {
    createItem(
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

class CreateItem extends Component {
  state = {
    title: 'cool big dog',
    description: 'I love those sniekers dogs',
    image: 'dog.jpg',
    largeImage: 'bigdog.jpg',
    price: 1780
  };

  handleChange = (e) => {
    const {name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val
    })
  }

  // Mutation-function with IMPLICIT RETURN with this normal brackets => ()
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
        <Form onSubmit={ async (e) => {
          // stop form from submitting
          e.preventDefault()
          // call the mutation
          const res = await createItem()
          // change them to the single item page
          console.log('response', res);
          Router.push({
            pathname: '/item',
            query: {id: res.data.createItem.id}
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

export default CreateItem;
export { CREATE_ITEM_MUTATION }