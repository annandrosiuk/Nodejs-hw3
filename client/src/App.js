import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes />
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
