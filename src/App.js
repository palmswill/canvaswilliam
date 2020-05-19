import React from 'react';
import Navbar from './component/navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import Mainshow from './component/mainshow';
import Login from './component/Login';

import {Provider} from 'react-redux'; 
import {store}from './reducers/rootReducers.js';




function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Mainshow}/>
        <Route path='/login' component={Login}/>
      </div>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;
