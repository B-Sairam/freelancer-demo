import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Applied from './components/Applied';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
const App = () => {
  return <>
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/applies' element={<Applied/>}/>

    </Routes>
  </Router>

  </>
}

export default App;