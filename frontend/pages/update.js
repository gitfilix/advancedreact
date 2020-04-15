import React from 'react';
import Link from 'next/link'
import UpdateItem from '../components/UpdateItem'

const Sell = ({ query }) => (
  <>
    <UpdateItem id={query.id} />
  </>

)

export default Sell