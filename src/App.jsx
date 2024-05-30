import React from 'react';
import Products from './components/Products';

const App = () => {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center my-8 text-4xl font-bold'>Dummy <span className='text-[#60dba8]'>Products</span></h1>
      <Products />
    </div>
  );
};

export default App;