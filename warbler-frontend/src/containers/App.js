import React, { Component } from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from './Navbar';
import Main from './Main';
import Particles from 'react-particles-js';
import {setAuthorizationToken, setCurrentUser} from '../store/actions/auth';
import jwtDecode from "jwt-decode";
const store = configureStore();


if(localStorage.jwtToken)
{
  setAuthorizationToken(localStorage.jwtToken);
  //prevent smone frm manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}
const particleOptions = {
  particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
    } 
};


const App = () => (
  <Provider store={store}>
   <Particles className="particles"
                params={particleOptions} />
    <Router>
      <div className="onboarding">
      <Navbar/>
      <Main/>
      </div>
    </Router>
     </Provider>
)




export default App;
