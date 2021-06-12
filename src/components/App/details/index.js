import React, {Component} from 'react';

import { UncontrolledCarousel } from 'reactstrap';
import './details.css';


class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
           data: [],
           id : this.props.id,
           carParking: ' ',
           wifi: ' ',
           pool: ' ',
           heater: ' ',
           kitchen: ' ',
           airConditioner: ' ',
           imageUrls:[]  

        }
     
     }
     
     componentDidMount(){
         const id =`${this.state.id}`
         console.log(id)
        const url = `http://10.10.200.24:9000/homes/`+id;
        let headers = new Headers();
     
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
     
        headers.append('Access-Control-Allow-origin',url);
        headers.append('Access-Control-Allow-Credentials','true');
     
        headers.append('GET','POST');
     
        fetch(url, {
           headers:headers,
           method: 'GET'
        })
        .then(response => response.json())
        .then(contents => {console.log("in fetch"+contents);
                          this.setState({
                             data:contents
                          })
     })
     .catch(()=> console.log("can't access" + url + "response. "))
     }
     
    render() {
        return (
            <div>
            <div className="Image">
           
           {this.state.data.map((home,index) => {
               const id = `${home.id}`
               // const path= `/detailsPage/`+id
               return(
                  <li key={index}>
                  <UncontrolledCarousel items={[
      {
        src: home.imageUrls[0],
        
      },
      {
        src: home.imageUrls[1],
        
      },
      {
        src: home.imageUrls[2],
        
      }
    ]} />
                   </li>
               )
            })}
            </div>
           <p>
           </p>
           </div>
        )
    }
}

export default Details;