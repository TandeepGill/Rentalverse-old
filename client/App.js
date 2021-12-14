import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='text-slate-700'>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
