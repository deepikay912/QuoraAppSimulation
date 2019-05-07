import React from 'react';
import './Modal.css'
import axios from 'axios';
import {Redirect} from 'react-router';
//import console = require('console');
class Model extends React.Component {

  state={
    question : ""
  }

  handleQuestion=(e)=>{
   this.setState({question : e.target.value})
  }
   
    render() {
      var redirectVar = null;
  if(!localStorage.getItem('token')){
    redirectVar = <Redirect to="/" />
    return redirectVar;        
   }
      return (
        <div>
      
        </div>
      );
    }
  }
  
export default Model;