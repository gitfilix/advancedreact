import Link from 'next/link'


import React from 'react';

const Home = props => (
  <>
      <p>Hey there !</p>
      <Link href='/sell'>
        <a>Sell</a>
      </Link>
  </>

)

export default Home