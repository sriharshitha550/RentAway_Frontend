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
  import LoginModal from "../loginModal";
  import SignUpModal from "../signUpModal";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onClickB=this.onClickB.bind(this);
    this.onClickN=this.onClickN.bind(this);
    

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navBar" color="none"  light expand="md" >
          <NavbarBrand className="navBar" href="/">
          <img src={require('./rentaway.png')} width="75"></img>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-black"> 
                  Services
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink href="http://10.10.200.42:3000/homePreSignin">Homes
                </NavLink>
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
                <NavLink className="text-black" onClick={this.onClickN} href="#" style={{fontWeight:'150px'}}>Become a host</NavLink>
              </NavItem>
              <NavItem >
                <NavLink className="text-black"  onClick={this.onClickB} href="#">Login
                </NavLink>
                <LoginModal/>
               
              </NavItem>
              <NavItem>
                <NavLink className="text-black" onClick={this.onClickN} href="#">SignUp
                </NavLink>
                <SignUpModal/>
              </NavItem>
    
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  onClickB(event) {
    var modal = document.getElementById('id01');
    modal.style.display = "block";
   
  }

  onClickN(event) {
    var modal = document.getElementById('id02');
    modal.style.display = "block";
    
  }

  
}
export default NavBar;