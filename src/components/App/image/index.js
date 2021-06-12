import React from "react"
import "./img.css"
import CondNavBar from "../condNavbar";
import SignUpModal from "../signUpModal";
import SearchBar from "../searchBar";
import HomeSearch from "../homeSearch";
// import DayPicker from "react-day-picker";
// import 'react-day-picker/lib/style.css';
// //import HomeSearch from "../homeSearch"


class  Image extends React.Component{

    
    render(){
        
        return(<div className="myImg">
            <CondNavBar/>
           <div className='hello'><HomeSearch/></div> 
        </div>
        );
    }

    }

export default Image;