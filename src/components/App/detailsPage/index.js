import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import CondNavBar from "../condNavbar";
import './pageD.css';
import { Card, Button } from 'reactstrap';
import LoginModal from "../loginModal";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import MapsDetails from '../mapsDetails';
import CalenderBook from '../CalenderBook';
import BookModal from '../bookModal';
import ReactStars from 'react-stars'
var print = []

class DetailsPage extends Component {

    constructor(props) {
        super(props);
        this.submitCheckout = this.submitCheckout.bind(this);
        this.onClickB=this.onClickB.bind(this);
        //this.onLatLongChange=this.onLatLongChange.bind(this);
        this.state = {
            data: [],
            homeId: ' ',
            fromDate: ' ',
            address:' ',
            location: ' ',
            homeName: ' ',
            latitude1:0,
            longitude1:0,
            price: ' ',
            toDate: ' ',
            description:'',
            rating:'',
            amenities: [],
            output: [],
            output1: [],
            rules: [],
            rules1: [],
            imageUrls: [],
            user:[],
            propertyType: '',
            
           }
     this.report=this.report.bind(this);
    }

    report(){
        const url = "http://10.10.200.24:9000/homes/report/"+this.props.match.params.id;
        let headers = new Headers();
        var bearerToken = localStorage.getItem('accessToken');
         var accesstoken = 'Bearer ' + bearerToken;
       console.log(url)
      
        fetch(url, {
           method: 'PUT',
           headers:{
            'Authorization':accesstoken,
           }
        })
            .then(response => response.json())
            .catch(() => console.log("can't access " + url + "response. "))
    
       }

    submitCheckout() {
        
        if (localStorage.getItem('role') === null) {

            var modal = document.getElementById('id01');
            modal.style.display = "block";
            return (
                <LoginModal />
            )

        }

        else {
            window.location.assign('http://10.10.200.42:3000/checkOut')
        }
    }


   


    componentDidMount() {
        const url = "http://10.10.200.24:9000/homes/" + this.props.match.params.id;
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST');

        fetch(url, {
            headers: headers,
            method: 'GET'
        })
            .then(response => response.json())
            .then(contents => {
                console.log("in fetch" + contents);
                console.log("Long"+contents.longitude)
                this.setState({
                    data: contents,
                    amenities: contents.amenities,
                    imageUrls: contents.imageUrls,
                    user: contents.user, 
                    latitude1:parseFloat(contents.latitude),
                    longitude1:parseFloat(contents.longitude)
                   
                })
               
                sessionStorage.setItem("Price",this.state.data.price)
                sessionStorage.setItem("Type",this.state.data.propertyType)
                sessionStorage.setItem("Name",this.state.data.homeName)
               

            })
            .catch(() => console.log("can't access" + url + "response. "))
    }




    render() {

        console.log('lat state'+this.state.longitude1)
        
        if (this.state.amenities.wifi == true) {

            this.state.output1.push(<img src={require('./wireless-internet.png')}></img>)

            this.state.output.push("Wifi  ");



        }

        if (this.state.amenities.airConditioner == true) {

            this.state.output1.push(<img src={require('./AC.png')}></img>)

            this.state.output.push("Air Conditioner  ");



        }
        if (this.state.amenities.breakfast == true) {
            this.state.output1.push(<img src={require('./break.png')}></img>)

            this.state.output.push("Breakfast  ");

        }
        if (this.state.amenities.fireExtinguisher == true) {
            this.state.output1.push(<img src={require('./fire.png')}    ></img>)

            this.state.output.push("Fire Extinguisher ");
        }
        if (this.state.amenities.firstAidKit == true) {
            this.state.output1.push(<img src={require('./first.png')} ></img>)

            this.state.output.push("First Aid Kit  ");
        }
        if (this.state.amenities.gym == true) {
            this.state.output1.push(<img src={require('./gym.png')}></img>)

            this.state.output.push("Gym  ");
        }
        if (this.state.amenities.parking == true) {
            this.state.output1.push(<img src={require('./parking.png')} style={{alignSelf:'center'}}></img>)

            this.state.output.push("Parking  ");
        }
        if (this.state.amenities.pool == true) {
            this.state.output1.push(<img src={require('./pool.png')}></img>)

            this.state.output.push("Pool  ");
        }
        if (this.state.amenities.tv == true) {
            this.state.output1.push(<img src={require('./tv.png')}></img>)

            this.state.output.push("TV  ");
        }
        if (this.state.amenities.workspace == true) {
            this.state.output1.push(<img src={require('./work.png')} ></img>)

            this.state.output.push("Work Space  ");

        }
        if (this.state.amenities.smokeDetector == true) {
            this.state.output1.push(<img src={require('./smoke-detector.png')} style={{borderRadius:'100%'}}></img>)

            this.state.output.push("Smoke Detector  ");

        }
        if (this.state.amenities.noPets == true) {

            this.state.rules1.push(<img src={require('./pet.png')} ></img>)

            this.state.rules.push(" No Pets ");



        }
        if (this.state.amenities.noDrinking == true) {
            this.state.rules1.push(<img src={require('./event.png')} style={{height:'120px'}}></img>)
            this.state.rules.push(" Not Suitable for Events  ");



        }
        if (this.state.amenities.noSmoking == true) {

            this.state.rules1.push(<img src={require('./smoke.png')}></img>)

            this.state.rules.push(" No Smoking  ");



        }






        return (
            <div className="details">
                <CondNavBar />
                <div className="HomenameBox">
                    <i class="fab fa-houzz fa-3x"></i>
                    <br />
                    <div style={{ fontSize: '26px', textTransform: 'uppercase', paddingTop: '10px', fontWeight: '120' }}>{this.state.data.propertyType} in {this.state.data.location} </div>
                    <br />
                    <i style={{ fontSize: '66px' }}>{this.state.data.homeName}
                    </i>
                    <br/>
                    <br/>
                    
                    <Button style={{
                        width: '20%',
                        padding: '5px 5px',
                        marginLeft: '2px',
                        backgroundColor: '#e6e6e6',
                       display:'inline',
                        borderRadius:'10%',
                        color:'purple',
                        border:'0px',
                        float:'left'

                    }} onClick={this.report} ><h4><i class="fa fa-flag-o" aria-hidden="true"></i>  Report this Listing</h4></Button>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{paddingLeft:'20px'}}>
                       
                        <ReactStars
                        count={5}
                        value={parseFloat(this.state.data.rating)}
                        size={24}
                        edit={false}
                        color2={'purple'} />
                        </div>
                    


                </div>
                <div className="images" style={{zIndex:'0'}}><UncontrolledCarousel indicators={false} items={[
                    {
                        src: this.state.imageUrls[0],
                        
                    },
                    {
                        src: this.state.imageUrls[1],
                        
                    },
                    {
                        src: this.state.imageUrls[2],
                       
                    }
                ]}   /></div>
                <div>

                    <div className="cardD"  >
                    <Card className='HR'>
                            <br />
                            <b><h1 style={{ fontSize: '50px' }}>Description</h1></b>
                                {this.state.data.description}
                            
                        </Card>

                        <br/>
                        <hr/>
                        <Card className='HR'>
                            <b><h1 style={{ fontSize: '50px' }}>Amenities</h1></b>
                            <br />
                            <center>

                                {this.state.output.map((home, index) => {
                                    const id = `${home.id}`
                                    // const path= `/detailsPage/`+id
                                    return (
                                        <li key={index} style={{ listStyle: 'none', float: 'left', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '10px', paddingTop: '20px', display: 'inline' }}>
                                            <div className='listitemsAmen' >
                                                {this.state.output1[index]}
                                                <br /> <br />
                                               <span className='imgcaption'> {this.state.output[index]}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </center>
                        </Card>
                        <br />
                        <hr />
                        <Card className='HR'>
                            <b><h1 style={{ fontSize: '50px' }}>House Rules</h1></b><br />
                            <center>
                                {this.state.rules.map((home, index) => {
                                    const id = `${home.id}`
                                    // const path= `/detailsPage/`+id
                                    return (
                                        <li key={index} style={{ listStyle: 'none', float: 'left', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '10px', paddingTop: '20px', display: 'inline' }}>
                                            <div className='listitemsAmen' >
                                                {this.state.rules1[index]}<br />
                                                <br /><br/>
                                                {this.state.rules[index]}
                                            </div>

                                        </li>

                                    )
                                })}
                            </center>



                        </Card>
                        <br />
                        <hr />
                        <Card className='HR'>
                        <div>
                            <h1 style={{fontSize:'50px'}}>Availability</h1>
    
                            <Button style={{
                        width: '20%',
                        padding: '10px 30px',
                        marginRight: '15px',
                        backgroundColor: 'white',
                        color:'purple',
                        border:'none'                    
                    }} onClick={this.onClickB}><h4>Show Calender</h4>
                    <BookModal id={this.props.match.params.id} bookOwnerToDate={this.state.data.toDate} bookOwnerFromDate={this.state.data.fromDate}/></Button>
                       
                      
                      </div>
                            
                            
                        </Card>
                        <hr/>
                        <Card className='HR'>
                        <h1 style={{fontSize:'50px'}}>Location</h1>
                        <br/>
                        <i style={{fontSize:'25px',textTransform:'uppercase',float:'left'}}>{this.state.data.location}</i>
                        <br/>
                        <i style={{fontSize:'30px',float:'right'}}>{this.state.data.address}</i>
                        <br/>
                        <MapsDetails latitude={this.state.latitude1} longitude={this.state.longitude1}/>  
                        </Card>
                        <hr/>
                        <Card className='HR'>
                        <h1 style={{fontSize:'50px'}}>Meet Your Host</h1>
                        <i style={{fontSize:'25px'}}>
                        <br/>
                        <b>Hi, I'm   
                        {this.state.user.name}
                        <br/>
                        Contact me at
                        {this.state.user.mobilenbr}</b>
                        </i>
                        <br/>
                        </Card>
                        <hr/>
                        <Card className='HR'>
                        <h1 style={{fontSize:'50px'}}>Cancellation Policy and House Rules</h1>
                        <br/>
                        <i style={{fontSize:'25px'}}>
                        This home has a Strict (grace period) cancellation policy.
                        <br/>
                         Cancel within 48 hours of booking and at least 14 days prior to check-in to get a full refund.
                        </i>
                        </Card>
                        <br /><br />
                        <br /> <br /> <br /> <br />
                    </div>
                </div>
           

                <div className="fixed-footer">

                    <span style={{ fontSize: '16px', marginLeft: '25px', textTransform: 'uppercase', marginTop: '20px', fontWeight: '500', fontStyle: 'oblique' }}><i class="fa fa-home fa-3x" aria-hidden="true"></i> &nbsp; &nbsp; {this.state.data.propertyType} in {this.state.data.location} </span>
                    <Button style={{
                        width: '7%',
                        padding: '10px 30px',
                        marginRight: '15px',
                        backgroundColor: '#f44336',
                        float: 'right',
                        borderRadius:'10%'
                    }} onClick={this.onClickB}><h4>Book</h4>
                    <BookModal id={this.props.match.params.id} bookOwnerToDate={this.state.data.toDate} bookOwnerFromDate={this.state.data.fromDate}/></Button>
                    <i style={{ float: 'right', marginRight: '30px', marginTop: '20px' }}>  &#8377;{this.state.data.price}/ night</i>
                                 </div>
                                
            </div>
        )
    }

    onClickB(event) {
        var modal = document.getElementById('id07');
        modal.style.display = "block";
       
      }
}



export default DetailsPage;