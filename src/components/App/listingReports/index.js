import React from "react";
 
import {Button } from 'reactstrap';

class ReportList extends React.Component{
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

  deleteReport(Id){
    console.log(parseInt(Id))
      const url = "http://10.10.200.24:9000/homes/report/"+parseInt(Id);
      console.log(url)
      let headers = new Headers();
     console.log(url)
      
   
     headers.append('POST','PUT');
   
      fetch(url, {
         method: 'DELETE',
      })
      .then(response => {
        console.log("repost"+response.status);

         if(response.status===200)
            {
              alert("Deleted Successfully");
              window.location.reload();
            }

        else if(response.status===401)
            {
              alert("Unauthorized");
              window.location.reload();
            }
          

            else if(response.status===500)
            {
             
              window.location.reload();
            }
          

           })
            
      .then(contents => {console.log("in fetch "+contents);
                  
                        
   })
   .catch(()=> 
   console.log("can't access" + url)
   
   
   )
   window.location.reload()
      
    }

  
   componentDidMount(){

    const url = "http://10.10.200.24:9000/reported";
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
                        data: responseData
                        
                      })                 
                    })   
                      
 })
 .catch(()=> console.log("can't access " + url))
      }

      
    render(){  
      return( 
        <div className='ViewListings'>
  
        <ul>
          <br/>
           {this.state.data.map((home,index) => {
     return(
        <li key={index}>
      <h3>{home.homeName}
      <input type='button' style={{backgroundColor:'red',color:'white',fontSize:'16px',fontStyle:'oblique',borderRadius:'10%',height:'30px'}} className='listbutton' value='Delete' onClick={this.deleteReport.bind(this,home.homeId)}></input> 
      </h3>
      
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


export default ReportList;