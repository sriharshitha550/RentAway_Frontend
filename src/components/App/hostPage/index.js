import React from "react";
import "./host.css";
import Calender from "../Calender";
import ImageUpload from "../imageUpload";
import Maps from "../maps";
import CondNavBar from "../condNavbar";
//import { toast } from "mdbreact";
import { ToastContainer,toast } from "react-toastify";

var currentTab = 0; 
var x;

class HostPage extends React.Component{
    
   
    constructor(props){
        super(props);
        
            this.myFunction1=this.myFunction1.bind(this);
            this.myFunction2=this.myFunction2.bind(this);
            this.myFunction3=this.myFunction3.bind(this);
            this.onPropertyChange=this.onPropertyChange.bind(this);
            this.onGuestsChange=this.onGuestsChange.bind(this);
            this.onHomeNameChange=this.onHomeNameChange.bind(this);
            this.onLocationChange=this.onLocationChange.bind(this);
            this.onAmenityChange=this.onAmenityChange.bind(this);
            this.onPriceChange=this.onPriceChange.bind(this);
            this.onClickSubmit=this.onClickSubmit.bind(this);
            this.ontoDateDataChanged=this.ontoDateDataChanged.bind(this);
            this.onfromDateDataChanged=this.onfromDateDataChanged.bind(this);
           // this.onClickSubmit=this.onClickSubmit.bind(this);
           this.onAddressChange=this.onAddressChange.bind(this);
           this.onPincodeChange=this.onPincodeChange.bind(this);
           this.onDescriptionChange=this.onDescriptionChange.bind(this);
    
            this.state = {
                propertyType:' ',
                homeName:' ',
                guestCount:' ',
                location:' ',
                price:' ',
                houseStatus:' ',
                amenities: {},
                fromDate:' ',
                toDate:' ',
                address:' ',
                pincode:' ',
                description:''
              }
      
    }
    componentDidMount(){
        if(sessionStorage.getItem("add")) {
          toast("Home has been successfully added. It will be visible on next login.",{
            position: toast.POSITION.BOTTOM_RIGHT,
            
          }
          );
          sessionStorage.removeItem("add")
        }
    }
    onAddressChange(event) {
        this.setState({address:event.target.value})
    }
    onPincodeChange(event) {
        this.setState({pincode:event.target.value})
    }

    onDescriptionChange(event) {
        this.setState({description:event.target.value})
    }

    onPropertyChange(event){
        x=document.getElementById("propertyType").value;
        console.log(x);
        this.state.propertyType=x;
        //this.setState({propertyType:x})
        console.log(this.state.propertyType);
       
    }

    onGuestsChange(event){
        this.setState({guestCount:event.target.value})
    }

    onHomeNameChange(event){
        this.setState({homeName:event.target.value})
    }

    onLocationChange(event){
        this.setState({location:event.target.value})
        console.log(this.state.location)
    }

    onAmenityChange(e){
        this.state.amenities[e.target.value]=true;
    }
    onPriceChange(e){
        this.setState({'price':e.target.value})
    }

    ontoDateDataChanged(newData){
        this.setState({toDate:newData})
       
    }

    onfromDateDataChanged(newData){
        this.setState({fromDate:newData})
       
    }

    onClickSubmit(e){
      e.preventDefault();
        console.log("entered");
     
     let body = {
    
         propertyType:this.state.propertyType,
         homeName:this.state.homeName,
         guestCount:this.state.guestCount,
         location:this.state.location,
         price:this.state.price,
         houseStatus:"PENDING",
         amenities:this.state.amenities,
         toDate:this.state.toDate,
         fromDate:this.state.fromDate,
         imageUrls:JSON.parse(sessionStorage.getItem('imgURLs')),
         address: this.state.address,
         pincode: this.state.pincode,
         description:this.state.description,
         latitude:sessionStorage.getItem('lat'),
         longitude:sessionStorage.getItem('long')
      }
      console.log("become a host"+body);
      var bearerToken = localStorage.getItem('accessToken');
      const url = "http://10.10.200.24:9000/homes";
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
              sessionStorage.removeItem('imgURLs');
              window.location.reload();
              sessionStorage.setItem('add',1);
              localStorage.setItem('role',"HOST")
            }
            else if(response.status===400){
                sessionStorage.removeItem('imgURLs');
              alert("Username already exists");
              window.location.reload();
             
            }
            else if(response.status===401){
                sessionStorage.removeItem('imgURLs');
              alert("Username or password is incorrect");
              window.location.reload();
            
            }
            else{
                sessionStorage.removeItem('imgURLs');
              alert("Unauthorized");
              window.location.reload();
            }})
      .then(contents => {console.log("in fetch"+contents);
                  
                        
   })
   .catch(()=> console.log("can't access" + url))

    }
    
    render(){
        return(
            <div>
                <ToastContainer/>
            <center>
               
            <section className="bg">
            <div>
            <CondNavBar/>
            </div></section>
            </center>
            <section>
           <div className = "container0">
           <center>
           <p className="title">Hosting in 3 steps</p> 
           <br/><br/> 
           <ul className="progressbar">
          <li><h1>List your space for free</h1>
           <p className="page">No matter what kind of home or room you have to share, Rent@way makes it simple and secure to host travelers. </p>
           </li>
           <li><h1>Decide how you want to host</h1>
           <p className="page">Choose your own schedule, prices, and requirements for guests. We’re there to help along the way.</p>
           </li>
           <li><h1>Welcome your first guest</h1>
           <p className="page">Once your listing is live, qualified guests can reach out. You can message them with any questions before their stay.</p>
           </li>

           </ul>
           </center>
           </div>   
            </section>


            <section>
                <form onSubmit={this.onClickSubmit}>
          <div id="bg2">
             
                  <br></br>
             
               <div className="box1">
               <center><h2><b>LIST YOUR SPACE FOR FREE</b></h2></center>
               <div className="nextt"><center></center></div>
               <br></br>
              
                    <h5><b>Property Type</b></h5>
                    <select id="propertyType" required className="prop" onChange={this.onPropertyChange} >
                    <option value="">Choose the Property type</option>
            <option value="APARTMENT" >Apartment</option>
            
            <option value="HOUSE" >House</option>
            <option value="CONDO" >Condo</option>
            <option value="SERVICEDAPARTMENTS" >Serviced Apartment</option>
          </select>
               
                    <br></br>
                    <br></br>
                    <br></br>
                    {/* <input type="text" name="location" placeholder="Location" required=""/><br/><br/> */}
                    
                    <h5><b>Guest Count</b></h5>
                    <input  className = "prop" type="number" min="1" name="guestCount" placeholder="Guests" required="" onChange={this.onGuestsChange}/><br></br><br></br>
                    <h5><b>House Name</b></h5>
                    <input  className = "prop" type="text" name="homeName" placeholder="HomeName" required="" onChange={this.onHomeNameChange}/><br></br><br></br>
                    <h5><b>Address</b></h5>
                    <input  className = "ts" type="text" name="address" placeholder="Address" required="" onChange={this.onAddressChange}/><br></br><br></br>
                    <h5><b>City</b></h5>
                    <input  className = "ts" type="text" name="location" placeholder="Location" required="" onChange={this.onLocationChange}/><br></br><br></br>
                    <h5><b>Pin Code</b></h5>
                    <input  className = "ts" type="text" name="PIN" placeholder="Pin Code" required="" onChange={this.onPincodeChange}/><br></br><br></br>
                    <h4><b>Location</b></h4>
                     <div><Maps/></div>
                    <h5><b>Description</b></h5>
                    <input  className = "ts" type="text" name="DES" placeholder="Description" required="" onChange={this.onDescriptionChange}/><br></br><br></br>
                    <h5><b>BASIC AMENITIES</b></h5>
                   
                               

                    <div className="cs1" >      
                                <input id="pool" type="checkbox" name="amenity" value="pool" onChange={this.onAmenityChange}/>
                                <label for="pool">Pool</label>
                                <br/>
                                <input id="gym" type="checkbox" name="amenity" value="gym" onChange={this.onAmenityChange}/>
                                <label for="gym">Gym</label>
                                <br/>

                                <input id="parking" type="checkbox" name="amenity" value="parking" onChange={this.onAmenityChange}/>
                                <label for="parking">Parking</label>
                                <br/>
                                <input id="workspace" type="checkbox" name="amenity" value="workspace" onChange={this.onAmenityChange}/>
                                <label for="workspace">Workspace</label>
                                <br/>

                      </div> 
                                
                        <div className="cs">      
                                <input id="wifi" type="checkbox" name="amenity" value="wifi" onChange={this.onAmenityChange}/>
                                <label for="wifi">Wifi</label>
                                <br/>
                                <input id="airConditioning" type="checkbox" name="amenity" value="airConditioner" onChange={this.onAmenityChange}/>
                                <label for="airConditioning">Air Conditioning</label>
                                <br/>

                                <input id="Tv" type="checkbox" name="amenity" value="tv"onChange={this.onAmenityChange}/>
                                <label for="Tv">Tv</label>
                                <br/>
                                <input id="breakfast" type="checkbox" name="amenity" value="breakfast" onChange={this.onAmenityChange}/>
                                <label for="breakfast">Breakfast</label>
                                <br/>

                      </div>
                      <br></br>     
                        <h5><b>SAFETY AMENITIES</b></h5>
                        <div className="cs">      
                                <input id="fak" type="checkbox" name="amenity" value="firstAidKit" onChange={this.onAmenityChange}/>
                                <label for="fak">First Aid Kit</label>
                                <br/>
                                <input id="fe" type="checkbox" name="amenity" value="fireExtinguisher" onChange={this.onAmenityChange}/>
                                <label for="fe">Fire Extinguisher</label>
                                <br/>

                                <input id="sd" type="checkbox" name="amenity" value="smokeDetector" onChange={this.onAmenityChange}/>
                                <label for="sd">Smoke Detector</label>
                                <br/>
                                
                      </div> 
                      <br></br> 

                      <h5><b>HOUSE RULES</b></h5>
                        <div className="cs">      
                                <input id="nopets" type="checkbox" name="rules" value="noPets" onChange={this.onAmenityChange}/>
                                <label for="nopets">No Pets</label>
                                <br/>
                                <input id="nodrinking" type="checkbox" name="rules" value="noDrinking" onChange={this.onAmenityChange}/>
                                <label for="nodrinking">No Drinking</label>
                                <br/>

                                <input id="nosmoking" type="checkbox" name="rules" value="noSmoking" onChange={this.onAmenityChange}/>
                                <label for="nosmoking">No Smoking</label>
                                <br/>
                                
                      </div> 
                      <br></br> 

                      
                    <center>
                    <div>
                        <input className="next1" id = "next1" type="button" name = "Next" value = "Next" onClick={this.myFunction1}/>
                    </div>
                    </center>
                    <br></br>
                    
                   
                </div>
                
                
           
           <br></br>
           <br></br>
             
          </div>
          <div id="upload">
                    <br></br>
                    <br></br>
                    <div className="box1">
                    <center><h2><b> UPLOAD IMAGES</b></h2></center>
                    <br></br>
                    <br></br>
                    <ImageUpload/>
                    {/* <input className="prop" type="file" name="file" accept="image/*"/> */}
                    <br></br>
                    <br></br>
                    <center>
                    <input className="next1" id = "next2" type="button" name = "Next" value = "Next" onClick={this.myFunction2}/>
                    </center>
                    <br></br>
                    </div>
                    <br></br>
                    <br></br>
                </div>


                <div id="calender">
                    <br></br>
                    <br></br>
                    <div className="box1">
                    <center><h2><b> DECIDE HOW YOU WANT TO HOST</b></h2></center>
                    <br></br>
                    <br></br>
                   <h5><b>CHECK-IN AND CHECK-OUT</b></h5>
                   <div className="cs">

                    <Calender fromDate={this.state.fromDate} toDate={this.state.toDate} ontoDateDataChanged={this.ontoDateDataChanged} onfromDateDataChanged={this.onfromDateDataChanged}/>
                    </div>
                    <br></br>
                    <h5><b>PRICE</b></h5>
                    <input  className = "ts" type="text" name="price" placeholder="price" onChange={this.onPriceChange}/><br></br>
                    <br></br>

                    <br></br>
                    <br></br>
                    <center>
                    <input className="next1" id = "next3" type="button" name = "Edit" value = " Edit  " onClick={this.myFunction3}/>
                    <button className="next1" id = "next4" type="submit" name = "Submit" value = "Submit" style={{width:'100px'}}>Submit</button>
                    
                    </center>
                    <br></br>
                    </div>
                    <br></br>
                    <br></br>
                </div>

            </form>
          </section>
            <section>
          <br></br>
          
          <center>
           <div className = "container1">
           <br/>
           <p className="title">ABOUT RENTAWAY </p> 
           <br/>
           <ul className="align">
           
          <li><h1>What is Rent@way?</h1>
           <p className="page1">RentAway connects people with places to stay and things to do around the world. </p>
           </li>

           <li><h1>What is hosting?</h1>
           <p className="page1">If you have an extra toom, entire home, or expertise you can earn money by renting out</p>
           </li>
           
           </ul>
           </div>   
           </center>
            </section>


          
            </div>
        );
    }

    myFunction1(event) {
        var d=document.getElementById('bg2');
        d.style.display="none";

        var f=document.getElementById('upload');
        f.style.display="block";
        
        var e=document.getElementById('calender');
       e.style.display="none";
        
      }

      myFunction2(event) {
        var d=document.getElementById('bg2');
        d.style.display="none";

        var f=document.getElementById('upload');
        f.style.display="none";
        
        var e=document.getElementById('calender');
       e.style.display="block";
        
      }

      myFunction3(event) {
        var d=document.getElementById('bg2');
        d.style.display="block";

        var f=document.getElementById('upload');
        f.style.display="none";
        
        var e=document.getElementById('calender');
       e.style.display="none";
        
      }

     
}
export default HostPage;