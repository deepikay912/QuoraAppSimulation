import React, { Component } from "react";
import SignUp from '../SignUp/signUp'
import quora from '../../images/Logo.png';
import quora2 from '../../images/Logo2.png';
import Login from '../Login/login';
import '../Frame/frame.css'
import SideQuoraPic from '../../images/SideQuoraPic.png';
import RightQuoraPic from '../../images/RightQuoraPic.png'
import {Redirect} from 'react-router';
export default class Frame extends Component {
  constructor(props) {
    super(props);
   
  }

  render(){
    var redirectVar = null;
  if(!localStorage.getItem('token')){
    redirectVar = <Redirect to="/" />
    return redirectVar;        
   }
    return (
    <div className='rowC'>
       <img className = "QuoraLogo" style = {{ width : 1500 }}src = {quora}/>
       
       <Login></Login>
      
        <img className = "QuoraLogo2" style = {{ width : 1500 }}src = {quora2}/>
     </div>
    );
    }

 }

