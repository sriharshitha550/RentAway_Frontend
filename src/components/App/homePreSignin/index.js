import React from "react";
//import HomeSearch from ".App/homeSearch";
//import {Navbar, Nav, NavItem, NavDropdown,MenuItem} from 'react-bootstrap';
//import NavBar from "../NavBar";
import Image from "../image"
import { toast, ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
class HomePreSignin extends React.Component{
  componentDidMount(){
    if(sessionStorage.getItem("BookName")) {
      toast("Booking for "+sessionStorage.getItem("BookName")+" has been done",{
        position: toast.POSITION.BOTTOM_LEFT,
        
      }
      );
      sessionStorage.removeItem("BookName")
    }
    sessionStorage.removeItem('price');
    sessionStorage.removeItem('propertyType');
    sessionStorage.removeItem('amenities');
    sessionStorage.removeItem('rules');
  }
    
    render(){
      return( 
        <div>
          <ToastContainer/>
        <Image/>  
        </div>
        
      )
    }
  }


export default HomePreSignin;