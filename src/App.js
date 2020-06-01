import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Mainshow from './component/mainshow';
import Login from './component/Login';
import Room from './component/Room';



import {Provider} from 'react-redux'; 
import {store}from './reducers/rootReducers.js';
import {initStateWithPrevTab} from 'redux-state-sync'


initStateWithPrevTab(store)


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Mainshow}/>
        <Route path='/login' component={Login}/>
        <Route path='/room'  component={Room}/>
      </div>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;
