import React, { Component } from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
//import Slider from 'reactrangeslider';
//import Calender from '../Calender';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './filters.css';
import {createBrowserHistory as createHistory} from 'history';
import { withRouter } from 'react-router-dom';
import SearchBar from "../searchBar";
import Calender from "../Calender";
import moment from 'moment';

class SearchFilters extends Component {
    history=createHistory(this.props)
    constructor(props) {
        super(props);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.onLocationDataChanged=this.onLocationDataChanged.bind(this);
        this.ontoDateDataChanged=this.ontoDateDataChanged.bind(this);
        this.onfromDateDataChanged=this.onfromDateDataChanged.bind(this);
        this.state = { 
            type1: null,
            Amen1: {},
            HR1:  {},
            Lang1: [],
            price: '',
            location1:'',
            fromDate:null,
            toDate:null,
            guestCount:null,
            price: ''
        }
        this.onFiltersChange=this.onFiltersChange.bind(this);
        this.onCheckBoxT=this.onCheckBoxT.bind(this);
        this.onCheckBoxAm=this.onCheckBoxAm.bind(this);
        this.onCheckBoxH=this.onCheckBoxH.bind(this);
        //this.rangeSet=this.rangeSet.bind(this);
        this.priceChange=this.priceChange.bind(this);
        this.onGuestChange = this.onGuestChange.bind(this);
        
    }
    onGuestChange(event){

        
        sessionStorage.setItem('guestCount',event.target.value) 
        
    }

    ontoDateDataChanged(newData){
        var dateObj = new Date(newData);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');
        sessionStorage.setItem('toDate',momentString)
       
    }

    onfromDateDataChanged(newData){
        var dateObj = new Date(newData);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');
    sessionStorage.setItem('fromDate',momentString)
       
    }

    priceChange(e){
        this.setState({'price':e.target.value})
        sessionStorage.setItem('price',e.target.value)
    }
    
    onFiltersChange(e) {
        
        let path= '/resultsPage'
        this.setState({
            type1: this.state.type1,
            Amen1: this.state.Amen1,
            HR1: this.state.HR1,
            range1: this.state.range1,
            price: this.state.price
        }
        )
       
        sessionStorage.setItem('propertyType',JSON.stringify(this.state.type1))
        sessionStorage.setItem('amenities',JSON.stringify(this.state.Amen1))
        sessionStorage.setItem('rules',JSON.stringify(this.state.HR1))
        console.log(this.state.type1)

    //     sessionStorage.setItem('location1',this.state.location1)
    //     sessionStorage.setItem('price',this.state.price)
    //     sessionStorage.setItem('toDate',this.state.toDate)  
    //    sessionStorage.setItem('fromDate',this.state.fromDate)
    //    sessionStorage.setItem('guestCount',this.state.guestCount) 
        this.props.history.push(path,this.state)
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("spp").style.color = "rgba(255, 255, 255, 1)";
        e.preventDefault();
        this.props.history.go(0)
    }

    onLocationDataChanged(newData){
        // this.setState({location1:newData})
        sessionStorage.setItem('location1',newData)
    }

    
      
    onCheckBoxT(e) {

        this.setState({type1:e.target.value})
        
    }
    onCheckBoxAm(e) {
        this.state.Amen1[e.target.value]=true;
        console.log(this.state.Amen1)
    }
    onCheckBoxH(e) {
        this.state.HR1[e.target.value]=true;
        console.log(this.state.HR1)
    }

   


    render() {
        //console.log("5"+this.state.Amen1)
        return (
            <div>
                <div id="main">
                    <span className="spp" id="spp" onClick={this.openNav}>&#10095;</span>
                </div>
                <div id="mySidenav" className="sidenav">
                    <a href="#" className="closebtn" onClick={this.closeNav}>&#10094;</a>
                    <center><h1><i>Filters</i></h1></center>
                    <hr></hr>
                    <form onSubmit={this.onFiltersChange}>
                    <div className="filters">
                    
                    <center>

                    <Button color="black" id="location" style={{ marginBottom: '1rem', fontSize:'18px' }}>Location</Button>
                        <UncontrolledCollapse toggler="#location" style={{ marginLeft: '0%' }}>
                    <SearchBar location1 = {this.state.location1} onLocationDataChanged={this.onLocationDataChanged}/>
                    </UncontrolledCollapse>
                    

                    <Button color="black" id="Check" style={{ marginBottom: '1rem', fontSize:'18px' }}>Check-In and Check-Out</Button>
                        <UncontrolledCollapse toggler="#Check" style={{ marginLeft: '0%' }}>
                    <Calender fromDate={this.state.fromDate} toDate={this.state.toDate} ontoDateDataChanged={this.ontoDateDataChanged} onfromDateDataChanged={this.onfromDateDataChanged}/>
                    </UncontrolledCollapse>

                    <Button color="black" id="guest" style={{ marginBottom: '1rem', fontSize:'18px' }}>Guest Count</Button>
                        <UncontrolledCollapse toggler="#guest" style={{ marginLeft: '0%' }}>
                    <input type="text" name="guests" placeholder="Guests" required="" onChange={this.onGuestChange}/>
                    </UncontrolledCollapse>

                        <Button color="black" id="Price" style={{ marginBottom: '1rem', fontSize:'18px' }}>Price</Button>
                        <UncontrolledCollapse toggler="#Price" style={{ marginLeft: '0%' }}>
                        {/* <Range onAfterChange={this.rangeSet}/>  */}
                       &#8377; <input type="number" name="Price" min="1000" max="5000000" onChange={this.priceChange}/> 
                        {/* <input type="number" name="Price" min="1000" max="100000"/> */}
                        </UncontrolledCollapse>
                        </center>
                        <Button color="black" id="type" style={{ marginBottom: '1rem', fontSize:'18px' }}>Home Type</Button>
                        <UncontrolledCollapse toggler="#type" style={{ marginLeft: '10%' }}>
                            <div className="leftCheck" style={{ float: "left" }}>
                                <input id="condo" type="radio" name="type" value="CONDO" onClick={this.onCheckBoxT} />
                                <label for="condo">Condo</label>
                                <br />
                                <input id="apartment" type="radio" name="type" value="APARTMENT" onClick={this.onCheckBoxT} />
                                <label for="apartment">Apartment</label>
                            </div>
                            <div className="rightCheck" style={{ float: "right" }}>
                                <input id="Bung" type="radio" name="type" value="HOUSE" onClick={this.onCheckBoxT} />
                                <label for="Bung">Bungalow</label>
                                <br />
                                <input id="Service" type="radio" name="type" value="SERVICEDAPARTMENTS" onClick={this.onCheckBoxT} />
                                <label for="Service">Serviced Apartment</label>
                            </div>
                        </UncontrolledCollapse>
                        <Button color="black" id="amenities" style={{ marginBottom: '1rem', fontSize:'18px' }}>Amenities</Button>
                        <UncontrolledCollapse toggler="#amenities" style={{ marginLeft: '10%' }}>
                            <div className="leftCheck" style={{ float: "left" }}>
                                <input id="pool" type="checkbox" name="Amen[]" value="Pool" onClick={this.onCheckBoxAm}/>
                                <label for="pool">Pool</label>
                                <br />
                                <input id="WF" type="checkbox" name="Amen[]" value="wifi" onClick={this.onCheckBoxAm} />
                                <label for="WF">Wi-fi</label>
                                <br/>
                                <input id="parking" type="checkbox" name="Amen[]" value="parking" onClick={this.onCheckBoxAm} />
                                <label for="parking">Parking</label>
                                <br/>
                                <input id="bf" type="checkbox" name="Amen[]" value="breakfast" onClick={this.onCheckBoxAm} />
                                <label for="bf">Breakfast</label>
                                <br/>
                                <input id="FE" type="checkbox" name="Amen[]" value="fireExtinguisher" onClick={this.onCheckBoxAm} />
                                <label for="FE">Fire Extinguisher</label>
                                <br/>
                                <input id="SD" type="checkbox" name="Amen[]" value="smokeDetector" onClick={this.onCheckBoxAm} />
                                <label for="SD">Smoke Detector</label>
                            </div>
                            <div className="rightCheck" style={{ float: "right" }}>
                                <input id="AC" type="checkbox" name="Amen[]" value="airConditioner" onClick={this.onCheckBoxAm} />
                                <label for="AC">Air Conditioner</label>
                                <br />
                                <input id="TV" type="checkbox" name="Amen[]" value="tv" onClick={this.onCheckBoxAm} />
                                <label for="TV">Television</label>
                                <br/>
                                <input id="Gym" type="checkbox" name="Amen[]" value="gym" onClick={this.onCheckBoxAm} />
                                <label for="Gym">Gym</label>
                                <br/>
                                <input id="Workspace" type="checkbox" name="Amen[]" value="workspace" onClick={this.onCheckBoxAm} />
                                <label for="workspace">Work Space</label>
                                <br/>
                                <input id="FK" type="checkbox" name="Amen[]" value="firstAidKit" onClick={this.onCheckBoxAm} />
                                <label for="FK">First Aid Kit</label>
                            </div>
                        </UncontrolledCollapse>
                        <Button color="black" id="HR" style={{ marginBottom: '1rem' , fontSize:'18px'}}>House Rules</Button>
                        <UncontrolledCollapse toggler="#HR" style={{ marginLeft: '10%' }}>
                            <div className="leftCheck" style={{ float: "left" }}>
                                <input id="drink" type="checkbox" name="HR[]" value="noDrinking" onClick={this.onCheckBoxH}/>
                                <label for="drinking">No Drinking</label>
                                <br />
                                <input id="smoke" type="checkbox" name="HR[]" value="noSmoking" onClick={this.onCheckBoxH}/>
                                <label for="smoke">No Smoking</label>
                            </div>
                            <div className="rightCheck" style={{ float: "right" }}>
                                <input id="pet" type="checkbox" name="HR[]" value="noPets" onClick={this.onCheckBoxH} />
                                <label for="pet">No Pets Allowed</label>
                            </div>
                           
                        </UncontrolledCollapse>
                       
                    </div> 
                    <br/>
                    <Button color="danger" style={{float:"right", width:"80px",marginRight:"10%",fontSize:'18px'}}>Done</Button>{' '}
                    </form> 
                </div>


            </div>
        )
    }
    openNav(event) {
        document.getElementById("mySidenav").style.width = "350px";
        document.getElementById("main").style.marginLeft = "350px";
        document.getElementById("spp").style.color = "rgba(255, 255, 255, 0)";
        // document.getElementById("main").style.display = "none";
    }

    closeNav(event) {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("spp").style.color = "rgba(255, 255, 255, 1)";
    }

}

export default withRouter(SearchFilters);