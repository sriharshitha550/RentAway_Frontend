import React from "react";
import "./index.css"
import SearchBar from "../searchBar";
import Calender from "../Calender";
import {createBrowserHistory as createHistory} from 'history';
import moment from 'moment';
import SearchResults from "../searchResults";
class HomeSearch extends React.Component{
    history=createHistory(this.props)
    constructor(props){
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onGuestChange = this.onGuestChange.bind(this);
        this.onLocationDataChanged = this.onLocationDataChanged.bind(this);
        this.ontoDateDataChanged=this.ontoDateDataChanged.bind(this);
        this.onfromDateDataChanged=this.onfromDateDataChanged.bind(this);
        this.state = {
            id: ' ',
            location1:null,
            fromDate:null,
            toDate:null,
            guestCount:null
          }

    }

    onGuestChange(event){
        //console.log(event.target.value);
        this.setState({guestCount: event.target.value})
        
    }
    onLocationDataChanged(newData){
        this.setState({location1:newData})
       
    }

    ontoDateDataChanged(newData){
        var dateObj = new Date(newData);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');
        this.setState({toDate:momentString})
       
    }

    onfromDateDataChanged(newData){
        var dateObj = new Date(newData);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');
        this.setState({fromDate:momentString})
       
    }

    onFormSubmit(event){
        event.preventDefault();
        console.log(this.state.location1)
        console.log(this.state.guestCount)
        console.log(this.state.toDate)
        console.log(this.state.fromDate)
        let path= '/resultsPage'
        this.setState({
            location1: this.state.location1,
            guestCount: this.state.guestCount,
            toDate: this.state.toDate,
            fromDate: this.state.fromDate
        }
        );
        
       sessionStorage.setItem('location1',this.state.location1)
       sessionStorage.setItem('guestCount',this.state.guestCount) 
       sessionStorage.setItem('toDate',this.state.toDate)  
       sessionStorage.setItem('fromDate',this.state.fromDate) 
       window.location.assign('http://10.10.200.42:3000/resultsPage')
       event.preventDefault();

    }

    
    
    render(){
        
        return(
           <form onSubmit = {this.onFormSubmit}>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
               <div className="aa">
               <center><h2> Book unique homes and  experiences. </h2></center>
               <div className="nextt"><center><h4> Your Place, Our safety. </h4></center></div>
               <br></br>
                    <h5>WHERE</h5>
                    <SearchBar location1 = {this.state.location1} onLocationDataChanged={this.onLocationDataChanged}/>
                    {/* <input type="text" name="location" placeholder="Location" required=""/><br/><br/> */}
                    <h5>CHECK-IN AND CHECK-OUT</h5>
                    <br></br>
                    <Calender fromDate={this.state.fromDate} toDate={this.state.toDate} ontoDateDataChanged={this.ontoDateDataChanged} onfromDateDataChanged={this.onfromDateDataChanged}/>
                    <br></br>
                    <h5>NUMBER OF GUESTS</h5>
                    <input type="text" name="guests" placeholder="Guests" required="" onChange={this.onGuestChange}/><br/><br/>
                    <div id="logincontent" >
                        <input className="target" id = "target" type="submit" name = "search" value = "search"/>
                    </div>
                   
                </div>
                
           </form>
        )}
}
export default HomeSearch;