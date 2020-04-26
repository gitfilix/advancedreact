import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!){
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  } 
`

class Signup extends Component {
  state ={
    email: '',
    name: '',
    password: ''
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => {
          return(
           <Form method='post' 
                onSubmit={async (e) => {
                  e.preventDefault()
                  const res = await signup()
                  console.log(res);
                  this.setState({email: '', name: '', password: '' })
           }} >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign up for an Account</h2>
              <Error error={error} />
              <label htmlFor='email'>
                Email
                  <input
                    type='email'
                    name='email'
                    placehoder={this.state.email}
                    onChange={this.saveToState}
                    />
              </label>
                <label htmlFor='name'>
                  Name
                  <input
                    type='text'
                    name='name'
                    placehoder={this.state.name}
                    onChange={this.saveToState}
                    />
                </label>
                <label htmlFor='password'>
                  Password
                  <input
                    type='password'
                    name='password'
                    placehoder={this.state.password}
                    onChange={this.saveToState}
                    />
                </label>
                <button type='submit'>Sign up here!</button>
            </fieldset>
          </Form>)
        }}
    </Mutation>
    );
  }
}

export default Signup;