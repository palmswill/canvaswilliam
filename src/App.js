import React from 'react';
import Navbar from './component/navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import Mainshow from './component/mainshow';
import Login from './component/Login';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Mainshow}/>
        <Route path='/login' component={Login}/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
