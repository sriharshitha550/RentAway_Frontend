import React from "react";
//import HomeSearch from ".App/homeSearch";
//import {Navbar, Nav, NavItem, NavDropdown,MenuItem} from 'react-bootstrap';
//import NavBar from "../NavBar";
import Image from "../image"
//import SignUp from "../signUp";
//import SignUpModal from '../signUpModal';
import './profile.css';
import ProfileTabs from "../profileTabs";

class ViewProfile extends React.Component{
  componentDidMount(){
    sessionStorage.clear()
  }
    
    render(){
      return( 
        <div className='profilebg'>
        <div className='Tabprof'>
        <ProfileTabs/>
        </div>
        </div>
        
      )
    }
  }


export default ViewProfile;