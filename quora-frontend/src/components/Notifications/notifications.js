import React, { Component } from 'react';
import Header from '../Header/Header'
import News from '../news/News'
import Topics from '../Topics/topics'
import topic1 from '../../images/topic.png'
 import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom';
import './notification.css'
import {rooturl} from '../../config/settings';
import axios from 'axios';
import follow from '../../images/follow.png'


class notifications extends Component {
      
  constructor(props){
     
    super(props);

    this.state = {
        notifications : [],
        open : false

  }
}




  componentDidMount () {

    console.log("inside notifications")
    const data = {
        email : localStorage.getItem('email')
       }

         axios.post('http://'+rooturl+':4000/notifications',data)
            .then(response => {
              console.log("inside response")
                this.setState({
                  notifications : this.state.notifications.concat(response.data)
                
                   });

                   console.log(response)
                
            })
            .catch(err => {
              console.log(err)
            })
         
         
}


  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };


    render() { 
       
      
        var options = { month: 'long', day: 'numeric' };
        let first = true;
    
        let notifications = this.state.notifications.map((notification) => {
    
          if(first) {
            first = false;
    
          }
          else {
          return (
            <div>
            <p class="color" >
            &nbsp; &nbsp;<i class="fa fa-user fa-lg" aria-hidden="true"></i>
           <b> &nbsp;  {notification.answerOwner} </b> &nbsp; answered : <Link class ="link" to ='/question'>  {notification.question} &nbsp; </Link> 
            {new Date(notification.postedTime).toLocaleDateString("en-US", options) } 
            <br></br>
            <br></br>
           
            <img  class="icons" src={follow} value="follow"/> <button  id="1" class="button-content" > <span class ="size-sm" >Following question </span></button>
             </p>
           <hr /> 
            </div>
          );
          }
        })
        return (
            <div>
            <Header/>
            
                  <div class="head notiTable"> 
                <p class="color" > &nbsp;   &nbsp;  See all notifications 
                &nbsp;  &nbsp;   &nbsp;  &nbsp;  &nbsp;   &nbsp;  &nbsp;  &nbsp;   &nbsp; &nbsp;  &nbsp;   &nbsp;
                &nbsp;  &nbsp;   &nbsp;  &nbsp;  &nbsp;   &nbsp;  &nbsp;  &nbsp;   &nbsp; &nbsp;  &nbsp;   &nbsp;
                &nbsp;  &nbsp;   &nbsp;  &nbsp;  &nbsp;   &nbsp;  &nbsp;  &nbsp;   &nbsp; &nbsp;  &nbsp;   &nbsp;
                <span style={{left :"200px", right: "1px" }}> Mark all read </span> </p>
                </div> 
                <hr/>
                
                
                     {notifications}
              
          </div>
          );
    }
}
 
export default notifications;




// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';

// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { withStyles } from '@material-ui/core/styles';

// import {Link} from 'react-router-dom';
// import './notification.css'
// import {rooturl} from '../../config/settings';
// import axios from 'axios';
// import follow from '../../images/follow.png'

// const styles = theme => ({
//   root: {
    
//   },
//   paper: {
//     marginRight: theme.spacing.unit * 2,
//   },
// });

// class Notifications extends React.Component {
//   state = {
//     open: false,
//     notifications : []
//   };

//   componentDidMount () {

//     console.log("inside notifications")
//     const data = {
//         email : "deeps@gmail.com"
//        }

//          axios.post('http://'+rooturl+':4000/notifications',data)
//             .then(response => {
//               console.log("inside response")
//                 this.setState({
//                   notifications : this.state.notifications.concat(response.data)
                
//                    });

//                    console.log(response)
                
//             })
//             .catch(err => {
//               console.log(err)
//             })
         
         
// }


//   handleToggle = () => {
//     this.setState(state => ({ open: !state.open }));
//   };

//   handleClose = event => {
//     if (this.anchorEl.contains(event.target)) {
//       return;
//     }

//     this.setState({ open: false });
//   };

//   render() {
//     const { classes } = this.props;
//     const { open } = this.state;
//     var options = { month: 'long', day: 'numeric' };
//     let first = true;

//     let notifications = this.state.notifications.map((notification) => {

//       if(first) {
//         first = false;

//       }
//       else {
//       return (
//         <div>
//         <p class="color" >
//         &nbsp; &nbsp;<i class="fa fa-user fa-lg" aria-hidden="true"></i>
//        <b> &nbsp;  {notification.answerOwner} </b> &nbsp; answered : <Link class ="link" to ='/question'>  {notification.question} &nbsp; </Link> 
//         {new Date(notification.postedTime).toLocaleDateString("en-US", options) } 
//         <br></br>
//         <br></br>
       
//         <img  class="icons" src={follow} value="follow"/> <button  id="1" class="button-content" > <span class ="size-sm" >Following question </span></button>
//          </p>
//        <hr /> 
//         </div>
//       );
//       }
//     })

//     return (
      
       
       
    
//     );
//   }
// }

// Notifications.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Notifications);