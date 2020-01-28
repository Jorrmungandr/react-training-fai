import React from 'react';
import { checkToken } from '../../global/func';

function Home() {
  const handleClick = async () => {
    const isValid = await checkToken();
    console.log(isValid);
  };

  return (
    <section className="home">
      <button onClick={handleClick}>Click</button>
    </section>
  );
}

export default Home;
