import SignUp from '../components/Signup'
import styled from 'styled-components'

const Colums = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`

const SignUpPage = props => (
  <Colums>
    <SignUp />
    <SignUp />
    <SignUp />
  </Colums>

)


export default SignUpPage