import React from "react";
 import './listings.css';
import {Button } from 'reactstrap';
import { toast, ToastContainer } from "react-toastify";
class Listings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      homeId:'',
      homeName : ' ',
      propertyType:' ',
      location: ' '
      }
  }
    onDelete(id){
      const url = "http://10.10.200.24:9000/homes/users/"+id;
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
            if(response.status===500)
            {
              //alert("Cannot delete the home since booked");
              sessionStorage.setItem('del',1)
              window.location.reload();
              
            }
            })
            
      .then(contents => {console.log("in fetch "+contents);
                  
                        
   })
   .catch(()=> {sessionStorage.setItem('del',1);console.log("can't access" + url)})
   window.location.reload()
      
    }
   componentDidMount(){
     
    if(sessionStorage.getItem("del")) {
      toast.error("Deletion can't be done when the home is booked.",{
        position: toast.POSITION.BOTTOM_LEFT,
        
      }
      );
      sessionStorage.removeItem("del")
    }
        console.log("entered");
        console.log(typeof localStorage.getItem('id'))
       let body = {
      
            username : localStorage.getItem('id')
         
        }
        console.log("Listings"+body);
        const url = "http://10.10.200.24:9000/homelist";
        let headers = new Headers();
     
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
     
        headers.append('Access-Control-Allow-origin',url);
        headers.append('Access-Control-Allow-Credentials','true');
     
        headers.append('GET','POST');
     
        fetch(url, {
           headers:headers,
           method: 'POST',
           body: JSON.stringify(body)
        })
        .then(response => {
          console.log(response.status);
          if(response.status===401)
              {
                alert("Unauthorized");
                window.location.reload();
              }
              response.json()
              .then((responseData)=>{
                                     
                                     this.setState({data:responseData})
              })})
              
        .then(contents => {console.log("in fetch"+contents);
                    
                          
     })
     .catch(()=> console.log("can't access" + url))
     
      }

      
    render(){  
      return( 
        <div className='ViewListings'>
        <ToastContainer/>
        <ul>
          <br/>
           {this.state.data.map((home,index) => {
     return(
        <li key={index}>
      <i><b>{home.homeName}</b> </i>   <input type='button' style={{backgroundColor:'#DC143C'}} className='DeleteListing' value='Delete Listing' onClick={this.onDelete.bind(this,home.homeId)}></input>
        <br/>
        <br/>
         </li>
     )
  })}
  </ul>
   </div>
        
      )
    }
  }


export default Listings;