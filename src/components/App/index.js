import React from "react";
//import App from "./Components/App";
//import HomeSearch from "./homeSearch";
import HomePreSignin from "./homePreSignin";

import HostPage from "./hostPage";
import AdminTabs from './adminTabs';
import UserNavBar from "./userNavbar";

import{
   BrowserRouter as Router,
   Route,
   Switch,
   Redirect
} from "react-router-dom";
import {createBrowserHistory} from 'history';
import SignUpModal from "./signUpModal";
import ResultsPage from "./resultsPage";
//import Details from "./details";
import DetailsPage from "./detailsPage";
import CheckOut from "./checkoutForm";
import SearchResults from "./searchResults";
import ViewProfile from "./viewProfile";
import Maps from "./maps";
import ResultMaps from "./resultsMap";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class App extends React.Component{

   constructor(props) {
      super(props);
     
    }
  
   
   render(){
      return (
         <div>
        <div> 
        </div>
         <Router>
            <Switch>            
               <Route exact path = "/homePreSignin" component={HomePreSignin}/>
               {/* <Route exact path = "/signUp" component={signUpModal}/> */}
               <Route exact path = "/resultsPage" component={ResultsPage}/>
               <Route exact path = "/detailsPage/profile" component={ViewProfile}/>
               <Route exact path = "/detailsPage/:id" component={DetailsPage}/>
              
               <Route exact path = "/searchResults" component={SearchResults}/>
               <Route exact path = "/hostPage" component={HostPage}/>
               <Route exact path ='/profile' component={ViewProfile}/>
               <Route exact path = "/userPage" component={UserNavBar}/>
               <Route exact path = "/checkOut" component={CheckOut}/>
               <Route exact path = "/admin" component={AdminTabs}/>
               <Route exact path='/map' component={Maps}/>
               <Route exact path='/resultmap' component={ResultMaps}/>
               <Redirect to = "/homePreSignin" component={HomePreSignin}/>
            </Switch>

         </Router>
         </div>
      );
      
   }
}

export default App;

