import React from "react";
 
import {Button } from 'reactstrap';

class PendingUsers extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      
      }
  }
  confirmUser(Id){
    console.log(parseInt(Id))
      const url = "http://10.10.200.24:9000/users/pending/"+parseInt(Id);
      console.log(url)
      let headers = new Headers();
     console.log(url)
      
   
     headers.append('POST','PUT');
   
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
   window.location.reload()
      
    }


   componentDidMount(){
     
    const url = "http://10.10.200.24:9000/pendingUsers";
    let headers = new Headers();
 
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
 
    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');
 
    headers.append('GET','POST','PUT');
 
    fetch(url, {
       headers:headers,
       method: 'GET',
    })
    .then(response => {
      console.log(response.status);
            response.json()
                    .then((responseData)=>{
                      
                      this.setState({
                        data: Object.keys(responseData).map((key) => [ key,responseData[key]]),
                        
                      })                 
                    })   
                      
 })
 .catch(()=> console.log("can't access " + url))
     
      }

      
    render(){  
      return( 
        <div className='ViewListings'>
        <ul>
        {this.state.data.map((user,index)=>{return(<li key={index} style={{fontSize:'20px'}}><div>{user[0]} &nbsp; {user[1]} &nbsp; <input type='button' style={{backgroundColor:'#32CD32',color:'white',fontSize:'16px',fontStyle:'oblique',borderRadius:'10%',height:'30px'}} className='listbutton' value='Confirm' onClick={this.confirmUser.bind(this,user[0])}></input><br/></div></li>)})}
        </ul>
   </div>
        
      )
    }
  }


export default PendingUsers ;