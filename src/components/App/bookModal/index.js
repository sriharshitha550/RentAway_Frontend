import React,{ Component } from 'react';
import {createBrowserHistory as createHistory} from 'history';
import './book.css'
import CalenderBook from '../CalenderBook';
import {Button} from 'reactstrap';
import LoginModal from '../loginModal';
import Notifications, {notify} from 'react-notify-toast';
import CheckOut from '../checkoutForm';
class BookModal extends Component {
  history=createHistory(this.props);
    constructor(props){
        super(props);
        //this.onClickB=this.onClickB.bind(this);
        this.onClickN=this.onClickN.bind(this);
        this.book=this.book.bind(this);
       
       
    }
    book() {
       
        if (localStorage.getItem('role') === null) {

            var modal = document.getElementById('id02');
            modal.style.display = "block";
            return (
                <LoginModal />
            )

        }

        else {
           
           window.location.assign('http://10.10.200.42:3000/checkOut')
           
        }
    }
   

    render() {
        console.log("book owner to date"+ this.props.bookOwnerToDate)
        console.log("book id"+ this.props.id)
        return (
            <div>
                
  <div id="id07" className="modal">
  <div className="modal-content animate" >
    <button
          onClick={this.onClickN}
          className="close1"
          title="Close Modal">×</button>
        <br></br>
        <div style={{color:'black'}}>
        <CalenderBook id={this.props.id} ownerToDate={this.props.bookOwnerToDate} ownerFromDate={this.props.bookOwnerFromDate}/>
      
        <br></br>
        </div>
        <Button type="submit" style={{width:'100px',height:'50px',color:'white',float:'right',marginRight:'10%',backgroundColor:'maroon',borderRadius:'5%',marginLeft:'70%'}} onClick={this.book}> Book </Button>
    <br/>
     </div>
  </div>
  </div>
)
}
onClickN(event) {
    console.log("working")
    document.getElementById('id07').style.display="none";
    window.location.reload();
}

// onClickB(event) {
//   var modal = document.getElementById('id01');
//   modal.style.display = "block";
// }

}

export default BookModal;