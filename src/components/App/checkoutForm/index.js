import React, {Component} from 'react';
import CondNavBar from '../condNavbar';
import './checkout.css';
import Notifications, {notify} from 'react-notify-toast';
import moment from 'moment';
import { Card } from 'reactstrap';
class CheckOut extends Component{

  constructor(props){
    super(props);
    this.onCheckOut=this.onCheckOut.bind(this)
    this.show = notify.createShowQueue();
  }

 onCheckOut(){
  console.log("entered");
  
  console.log("Bookanme"+sessionStorage.getItem('Name'));
  sessionStorage.setItem('BookName',sessionStorage.getItem('Name'))
  sessionStorage.removeItem('Name');
  let body = { 
    "homeId": sessionStorage.getItem('homeid'),
      "toDate": sessionStorage.getItem('bookToDate'),
      "fromDate":sessionStorage.getItem('bookFromDate') 
   }
   console.log("become a host"+body);
   var bearerToken = localStorage.getItem('accessToken');
   const url = "http://10.10.200.24:9000/booking";
   var accesstoken = 'Bearer ' + bearerToken;
   console.log(accesstoken);
   let headers = new Headers();

   headers.append('Content-Type','application/json');
   headers.append('Accept','application/json');

   headers.append('Access-Control-Allow-origin',url);
   headers.append('Access-Control-Allow-Credentials','true');

   headers.append('GET','POST');

   fetch(url, {
     headers: headers,
     method: 'POST',
     withCredentials:true,
     credentials:'include',
     headers:{
       'Authorization':accesstoken,
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': url
     },
     body: JSON.stringify(body) 
 })
   .then(response => {
     console.log(response.status);
     
     if(response.status===200)
         {
          localStorage.setItem('role',response.role)
         
           window.location.reload();
           
         }
         else if(response.status===400){
           alert("Username already exists");
           window.location.reload();
         }
         else if(response.status===401){
           alert("Username or password is incorrect");
           window.location.reload();
         }
         else{
           alert("Unauthorized");
           window.location.reload();
         }})
   .then(contents => {console.log("in fetch"+contents);
               
                     
})
.catch(()=> console.log("can't access" + url))


 }
 
    
    render(){
        
        return(<div className="CheckImg">
            <CondNavBar/>
            <div className='boxC'>
            <form>
                <div class="aaaa" style={{border:'1px solid #D3D3D3'}}>
                    <form action="/action_page.php">
  <div>
  
    <div style={{paddingTop:'5px'}}>
      <br/>
      <h1>Payment</h1>
      <label htmlFor="fname"><h3>Accepted Cards</h3></label>
      <div className="icon-container">
        <i className="fa fa-cc-visa fa-2x" style={{color: 'navy'}} /> &nbsp;
        <i className="fa fa-cc-amex fa-2x" style={{color: 'blue'}} /> &nbsp;
        <i className="fa fa-cc-mastercard fa-2x" style={{color: 'red'}} /> &nbsp;
        <i className="fa fa-cc-discover fa-2x" style={{color: 'orange'}} /> &nbsp;
      </div>
      <label htmlFor="cname"><h3>Name on Card</h3></label>
      <input type="text" id="cname" name="cardname" placeholder="Name on Card" required />
      <label htmlFor="ccnum"><h3>Credit card number</h3></label>
      <input type="number" id="ccnum" name="cardnumber" placeholder="Card Number " required style={{border:'0.5px solid #D3D3D3',width:'100%',height:'40px'}}/>
      <br/>
      <br/>
      <div >
        <div>
        <label htmlFor="expmonth"><h5>Exp Month  </h5></label> &nbsp;
      <input type="number" id="number" name="expmonth" min={1} max={12} placeholder=" " required style={{border:'0.5px solid #D3D3D3',width:'10%',padding:'2px'}}/>
         <div style={{float:'right',marginRight:'30%'}}>
          <label htmlFor="expyear"><h5>Exp Year  </h5></label> &nbsp;
          <input type="number" id="expyear" name="expyear" min={2008} max={2035} required style={{border:'0.5px solid #D3D3D3',width:'40%',padding:'2px'}}/>
          </div>
        </div>
        <br/>
        <div>
          <label htmlFor="cvv"><h3>CVV</h3></label> &nbsp;
          <input type="password" id="number" name="cvv" style={{border:'0.5px solid #D3D3D3',width:'10%',padding:'2px'}} required/>
        </div>
      </div>
    </div>
  </div>
  <label>
    <input type="checkbox" defaultChecked="checked" name="sameadr" /> Shipping address same as billing
  </label>
  <br/>
 <center><input type="submit" value="Continue to checkout" className="btn" onClick={this.onCheckOut} /></center> 
 
</form>
</div>
 </form>
</div>
<div style={{float:'right',backgroundColor:'white',height:'47vh',width:'400px',marginRight:'2vw',border:'1px solid #D3D3D3',borderRadius:'2%',padding:'10px'}} >
      <center>
        <h1>{sessionStorage.getItem('Name')}</h1>
        <h4><i>{sessionStorage.getItem('Type')}</i></h4>
        <hr/>
        <br/>
    <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp; 
    {moment(sessionStorage.getItem('bookFromDate')).format("MMMM, D,YYYY")} &nbsp;
    <i class="fa fa-arrow-right" aria-hidden="true"></i>  &nbsp;
    {moment(sessionStorage.getItem('bookToDate')).format("MMMM,D,YYYY")}  &nbsp;
    <br/><br/>

    <hr/>
    </center>
    <div>
    <div style={{float:'left'}}>
    <i class="fa fa-inr" aria-hidden="true"></i> {sessionStorage.getItem('Price')} x {moment(sessionStorage.getItem('bookToDate')).diff( sessionStorage.getItem('bookFromDate'),'days')} nights &nbsp;&nbsp;&nbsp;
    <br/>
    Safety Deposit 
    <br/>
    Service Fee<br/>
    <br/>
    
    Total Fee
    </div>
    <div style={{float:'right'}}>
    <i class="fa fa-inr" aria-hidden="true"></i> { moment(sessionStorage.getItem('bookToDate')).diff( sessionStorage.getItem('bookFromDate'),'days') * sessionStorage.getItem('Price')}
    <br/>
    <i class="fa fa-inr" aria-hidden="true"></i> {0.15*sessionStorage.getItem('Price')}
    <br/>
    <i class="fa fa-inr" aria-hidden="true"></i> 2000
    <br/>
    <br/>
   
     <i class="fa fa-inr" aria-hidden="true"></i> {(moment(sessionStorage.getItem('bookToDate')).diff( sessionStorage.getItem('bookFromDate'),'days') * sessionStorage.getItem('Price'))+(0.15*sessionStorage.getItem('Price'))+2000}
    </div>
   <br/>
  
   </div>
   <Card style={{width:'100%',border:'0px'}}>
   <hr/>
   <div style={{float:'left'}}>
   <h3>Strict with grace period – free cancellation</h3>
Cancel within 48 hours of booking to get a full refund. 
</div>

</Card>
   </div>
   
 </div>
            )
    }

    }

export default CheckOut;