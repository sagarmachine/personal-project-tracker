import React,{Fragment} from 'react';
import './App.scss';
import Layout from "./components/layout/layout"
import axios from "axios"

axios.defaults.baseURL="http://localhost:8081/api";



function App() {
  return (
    <Fragment>
       <Layout/>
    </Fragment>
  );
}

export default App;
