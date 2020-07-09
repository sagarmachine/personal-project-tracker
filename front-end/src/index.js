import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import axios from 'axios';


let authentication;

axios.interceptors.response.use(response =>{
 // console.log("intercept->"+response.headers.authentication);
  authentication=response.headers.authentication;
  if(authentication)
  axios.defaults.headers.common['Authentication'] = authentication;
  return response;});
// axios.interceptors.request.use(request=>{console.log("3"+authentication);
//                                        return request;})
// axios.interceptors.request.use(request=>{console.log("2"+request.headers.Authentication);
//                                        return request;})
//  axios.interceptors.request.use(request=>{console.log("1"+JSON.stringify(request.headers));
//                                         return request;})
//  axios.interceptors.request.use(request =>function (config) {
//   const token = authentication;
//   config.headers.Authentication =  token;
//   console.log("0" +authentication)
//   return config;
// });



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
