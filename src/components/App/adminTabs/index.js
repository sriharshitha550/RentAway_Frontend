import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Listings from '../listings';
import './admin.css'
import CondNavBar from '../condNavbar';
import PendingUsers from '../pendingUsers';
import ReportList from '../listingReports';

export default class AdminTabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      data: [],
      homeId:'',
      homeName : ' ',
      propertyType:' ',
      location: ' ',
      user:[],
      userId:'',
      username:''

    };
    
    this.SignOut=this.SignOut.bind(this);
  }

  onDelete(id){console.log('Delete listing')}
  onConfirm(id){
  console.log('Confirm Listing')
  const url = "http://10.10.200.24:9000/homes/pending/"+parseInt(id);
  let headers = new Headers();
 console.log(url)

  fetch(url, {
     method: 'PUT',
     
  })
  .then(response => {
    console.log(response.status);
    if(response.status===401)
        {
          alert("Unauthorized");
          window.location.reload();
        }
        })
        
  .then(contents => {console.log("in fetch "+contents);
              
                    
})
.catch(()=> console.log("can't access" + url))
window.location.reload()}

  

  componentDidMount() {
     
    const url = "http://10.10.200.24:9000/pendingListings";
    // var bearerToken = localStorage.getItem('accessToken');
    //   var accesstoken = 'Bearer ' + bearerToken;
    let headers = new Headers();
 
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
 
    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');
    //headers.append('Authorization',accesstoken)
    headers.append('GET','POST');
 
    fetch(url, {
       headers:headers,
       method: 'GET',
       
    })
    .then(response => {

      response.json()
              .then((responseData)=>{
                
                this.setState({
                  data: responseData,
                  user: responseData.user
                })
              })
              
       
        if(response.status===401){
            alert("Go and Sign in");
            window.location.reload();
          }
          })
    .then(contents => {console.log("in fetch"+contents);
                
                      
 })
 .catch(()=> console.log("can't access" + url))
 this.toggle('2');

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
  


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
      
    }
  }
  render() {
    return (
      <div className='adminTabs'>
       <Button onClick={this.SignOut} style={{width:'200px',height:'50px',float:'right',marginRight:'2vw',backgroundColor:'#e6e6e6',color:'red',fontSize:'20px',border:'0px'}}>
                    <i class="fa fa-sign-out"></i> Sign Out
                  </Button>
      <div className='prof1Tabs'>
        <Nav tabs>
            <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <h2><b><i>View Pending Houses</i></b></h2>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <h2><b><i>View Pending Users</i></b></h2>
            </NavLink>
          </NavItem>
          <NavItem>
          <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              <h2><b><i>View Reports</i></b></h2>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <br/>
          <ul>
          <br/>
           {this.state.data.map((home,index) => {
     return(
        <li key={index} style={{fontSize:'20px'}}>
      <i><b>{home.homeName}</b> </i>  <div style={{float:'right'}}>  &nbsp; 
      <input type='button' style={{backgroundColor:'#32CD32',color:'white',fontSize:'16px',fontStyle:'oblique'}} className='listbutton' value='Confirm Listing' onClick={this.onConfirm.bind(this,home.homeId)}></input></div>
        <br/>
        <br/>
         </li>
     )
  })}
  </ul>
          </TabPane>
          <TabPane tabId="2">
          <br/>
          <PendingUsers/>
          </TabPane>
          <TabPane tabId="3">
          <br/> <ReportList/>
          </TabPane>
        </TabContent>
        <Button style={{width:'150px',height:'50px',backgroundColor:'rgb(255,255,255,0)',color:'black',float:'right',border:'rgb(255,255,255,0)',paddingTop:'20px'}} href='http://10.10.200.42:3000/homePreSignin'><i className='fa fa-home'/> Return to Home Page</Button>
      </div>
      </div>
    );
  }
}