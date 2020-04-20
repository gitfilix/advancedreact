import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
  mutation($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`


class DeleteItem extends Component {
  update = (cache, payload)=> {
    // manually update the cache on client so it matches new server state after a client-delete Item
    // 1. read the cache from items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY})
    console.log(data);
    // 2. filter the deleted item out of the page 
    data.itemss = data.items.filter(items => item.id !== payload.data.deleteItem.id)
    // 3. put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data:data })
  }


  render() {
    return (
      <Mutation 
        mutation={DELETE_ITEM_MUTATION} 
        variables={{ id: this.props.id}}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button onClick={() => {
            if (confirm('Are you sure you want to delete this item?')) {
              deleteItem()
            }
          }}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;