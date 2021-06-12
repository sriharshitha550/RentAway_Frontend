import React, {Component} from 'react';
import CondNavBar from "../condNavbar";
import SearchResults from "../searchResults";
import SearchFilters from "../filters";
import './page.css';
import {createBrowserHistory as createHistory} from 'history';
import ResultMaps from '../resultsMap';
import Switch from "react-switch";
 import MapFilters from '../mapFilters';

class ResultsPage extends Component {
    //history=createHistory(this.props)
    constructor(props){
        super(props);
        this.state = {
            type1: [],
            Amen1: [],
            HR1:  [],
            Lang1: [],
            checked:false
        }

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(checked) {
        this.setState({ checked });
        if(this.state.checked){
            console.log('it is checked '+this.state.checked)
          
            
        }
      }

   

    render() {
        if(this.state.checked){
            return(
                <div className="results">
                <div className="way">
                <CondNavBar/>
              <MapFilters/>
                <div style={{float:'right',marginRight:'2vw'}}><span>Show Map</span><Switch onChange={this.handleChange} checked={this.state.checked}/></div>
                <br></br>
               <div>
               <br/>
                <div style={{width:'30%',float:"right",marginRight:'5vw',marginLeft:'3vw'}}><ResultMaps/></div>
                </div>
                </div>
            </div>
           )
        }
        else{
        return(
           
            <div className="results">
                <div className="way">
                <CondNavBar/>
                <SearchFilters/>
                <div style={{float:'right',marginRight:'2vw'}}><span ><a >Show Map</a></span><Switch onChange={this.handleChange} checked={this.state.checked}/></div>
                <div style={{width:'100%'}}><SearchResults/></div>
                
                </div>
            </div>
        )
    }
}
}

export default ResultsPage;