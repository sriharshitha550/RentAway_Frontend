import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import "./index.css";
  import EditProfile from "../editProfile";

class HostNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.SignOut=this.SignOut.bind(this);
    this.onClickE=this.onClickE.bind(this);

    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  SignOut(){
   


    const url = "http://10.10.200.24:9000/users/signout";
    var bearerToken = localStorage.getItem('accessToken');
    var accesstoken = 'Bearer ' + bearerToken;
    console.log(accesstoken);
  

    fetch(url, {
        method: 'PUT',
        withCredentials:true,
     credentials:'include',
     headers:{
       'Authorization':accesstoken,
     },
    })
        .then(response => response.json())
        
        .catch(() => console.log("can't access" + url + "response. "))


    window.location.assign("http://10.10.200.42:3000/homePreSignin");
    localStorage.clear();
    
  }

  render() {
    return (
      <div>
        <Navbar  className="navBar" light expand="md" >
          <NavbarBrand className="navBar" href="/">
          <img src={require('./rentaway.png')} width="75"></img></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-black"> 
                  Services
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink href="http://10.10.200.42:3000/homePreSignin">Homes</NavLink> 
                  </DropdownItem>
                  <DropdownItem>
                    Office Spaces
                  </DropdownItem>
                  <DropdownItem>
                    Appliances
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink className="text-black" onClick={this.onClickN} href="http://10.10.200.42:3000/hostPage">Add Listing 
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar className='dropdownWidth'>
                <DropdownToggle nav caret className="text-black">
                  <i class="fa fa-user-o"></i>
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem disabled>
                  Hey, {localStorage.getItem('username')}
                  </DropdownItem>
                  
                  <NavItem >
                <NavLink href="./profile" >
                <p className='ep'><i class="fa fa-user-plus"/>Edit Profile</p>
                </NavLink>
              </NavItem>
              
                 
              <NavItem >
                  <NavLink href="./profile" >
                  <p className='ep'><i class="fa fa-user-plus"/>View Listings</p>
                  </NavLink>
                  </NavItem>
                  <NavItem >
                  <NavLink href="./profile" >
                  <p className='ep'><i class="fa fa-close"/>Remove Listings</p>
                  </NavLink>
                  </NavItem>
                
                  <NavItem >
                  <NavLink href="./profile" >
                  <p className='ep'><i class="fa fa-bell" aria-hidden="true"></i>Notifications</p>
                  </NavLink>
                  </NavItem>
                  <DropdownItem divider />
                  <DropdownItem>
                  <div onClick={this.SignOut}>
                    <i class="fa fa-sign-out"></i> Sign Out
                  </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  onClickE(event) {
    var modal = document.getElementById('id03');
    modal.style.display = "block";
    
  }
}
export default HostNavBar;