import React from "react";
import {Button } from 'reactstrap';
import ReactStars from 'react-stars';
import moment from 'moment';

class BookList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      homeName : ' ',
      toDate:'',
      homeId:'',
      rating:0,
      }
  }

  onDelete(id){
    const url = "http://10.10.200.24:9000/bookingByBookingId/"+id
    let headers = new Headers();
   console.log(url)
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
 
    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');
 
   // headers.append('','POST');
 
    fetch(url, {
       headers:headers,
       method: 'DELETE',
       //body: JSON.stringify(body)
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
 window.location.reload()
    
  }


  
   componentDidMount(){
   const url="http://10.10.200.24:9000/bookingsByUser/"+localStorage.getItem('id')
    
  

    fetch(url, {
        method: 'GET',
       
    })
        .then(response => response.json()
        .then((responseData)=>{
          console.log("ratings "+typeof responseData);
          this.setState({
            data: responseData,
          })
          console.log("data"+typeof new Set(this.state.data))
        }))
        
        .catch(() => console.log("can't access" + url + "response. "))
        
      }

      
    render(){  
      return( 
        <div className='ViewListings'>
          <ul>
          <br/>
          
           {this.state.data.map((home,index) => {
            if(moment(home[3]).dayOfYear()>moment().dayOfYear()){
     return(
        <li key={index}>
      <h3>{home[2]}&nbsp;
      ({moment(home[3]).format("MMMM D ,YYYY")}) &nbsp;  <input type='button' style={{backgroundColor:'#DC143C',fontWeight:'lighter'}} className='DeleteListing' value='Delete Booking' onClick={this.onDelete.bind(this,home[0])}></input>
      </h3>
      
        <br/>
        <br/>
         </li>
     )}
     })}
  </ul>
   </div>
        
      )
    }
  }


export default BookList;