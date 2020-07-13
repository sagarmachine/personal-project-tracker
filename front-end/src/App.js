import React,{Fragment} from 'react';
import './App.scss';
import Layout from "./components/layout/layout"
import axios from "axios"

axios.defaults.baseURL="http://projecttracker-env.eba-g6te9sw4.ap-south-1.elasticbeanstalk.com/api";



function App() {
  return (
    <Fragment>
       <Layout/>
    </Fragment>
  );
}

export default App;
