import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation, Query } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

// single Item query:
// take the id passed in the url (and by props) and put it into form - so the user can see
// which item gets updated. 
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
      $id: ID!,
      $title: String,
      $description: String,
      $price: Int) {
    updateItem(
      id: $id,
      title: $title,
      description: $description,
      price: $price
    )
    {
      id,
      title
      description
      price
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
  updateItem = async (e, updateItemMutation) => {
    e.preventDefault()
    console.log('Update Item!!');
    console.log(this.state)
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    })
    console.log('updated');
  }


  // Mutation-function with IMPLICIT RETURN with this normal brackets => ()
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
      }}>
        
        {({data, loading}) => {
          if(loading) 
            return( 
              <p>Loading...</p>
          )
          if(!data.item)
            return(
            <p>No Item found for ID {this.props.id}</p>
            )
        return (
        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
          {(updateItem, { loading, error }) => (
            <Form onSubmit={e => this.updateItem(e, updateItem)}>
              <Error error={error} />
              {/* if loading is true disable form and trigger bg-animation */}
              {/* one-time prepopulation fields defaultValue={data.item.title} */}
              <fieldset disabled={loading} aria-busy={loading} >
                <label htmlFor='title'>
                  Title
                  <input
                    type='text'
                    id='title'
                    name='title'
                    placeholder='Title'
                    required
                    defaultValue={data.item.title}
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
                    defaultValue={data.item.price}
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
                    defaultValue={data.item.description}
                    onChange={this.handleChange}
                    />
                </label>
              </fieldset>
          <button type='submit'>Sav{loading ? 'ing': 'e'} Changes</button>
            </Form>
          )}
        </Mutation>
      )
      }}
    </Query>
    )
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION }