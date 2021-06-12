import React,{ Component } from 'react';
import './index.css';
import LoginModal from '../loginModal';

var passw=  /^[A-Za-z]\w{7,15}$/;
class SignUpModal extends Component {
    constructor(){
        super();
        //this.onClickB=this.onClickB.bind(this);
        this.onClickN=this.onClickN.bind(this);
        this.handleUname=this.handleUname.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleRePassword=this.handleRePassword.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.signUp=this.signUp.bind(this);
        this.state = { 
          username: ' ',
          password:' ',
          repassword:' ',
          email:' ',
         
        }
    }

    handleUname(e) {
      this.setState({
        username: e.target.value
      })
    }
    handlePassword(e) {
      this.setState({
        password: e.target.value
      })
    }

    handleRePassword(e) {
      this.setState({
        repassword: e.target.value
      })
    }

    handleEmail(e) {
      this.setState({
        email: e.target.value
      })
    }

    signUp(e){
      //this.setState({Amen1:this.props.history.location.state.Amen1})
     // e.preventDefault();
     
if(!this.state.password.match(passw)) 
{ 
alert('Not a strong password. Input 7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter')
e.preventDefault();
}

else if(!this.state.password.match(this.state.repassword)){
  alert("The passwords don't match");
  e.preventDefault();
}
else{

      console.log("after submit"+this.state.password)
     let body = {

        email : this.state.email,
          username : this.state.username,
          passwordHash : this.state.password,
          dob:'0000-00-00'
         
       
      }

      
      
   
      const url = "http://10.10.200.24:9000/users";
      let headers = new Headers();
   
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
   
      headers.append('Access-Control-Allow-origin',url);
      headers.append('Access-Control-Allow-Credentials','true');
   
      headers.append('GET','POST');
   
      fetch(url, {
         headers:headers,
         method: 'POST',
         body: JSON.stringify(body)
      })
      .then(response => {
        console.log(response.status);
        if(response.status===200)
            {
              window.location.assign('http://10.10.200.42:3000/homePreSignin');
            }
            else if(response.status===400){
              alert("Usernamealready exists");
              window.location.assign('http://10.10.200.42:3000/homePreSignin');
            }
            else if(response.status===401){
              alert("Username or password is incorrect");
              window.location.assign('http://10.10.200.42:3000/homePreSignin');
            }
            else{
              alert("Unauthorized");
              window.location.assign('http://10.10.200.42:3000/homePreSignin');
            }})
      .then(contents => {console.log("in fetch"+contents);
                  
                        
   })
   .catch(()=> console.log("can't access" + url + "response. "))
  }
   
}

    render() {
        return (
            <div>
  {/* <button onClick={this.onClickB} style={{ width: "auto" }} className="b1">Login</button> */}
  <div id="id02" className="modal">
    <form className="modal-content animate" onSubmit={this.signUp}>
    <button
          onClick={this.onClickN}
          className="close1"
          title="Close Modal">×</button>
        <br></br>
      <div className="imgcontainer">
        
        <img src={require('./img_login.png')} alt="Avatar" className="avatar" />
      </div>
      <div className="container">
      <label htmlFor="email">
          <b>Enter your E-mail</b>
        </label>
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          onChangeCapture={this.handleEmail}
          required
        />
        <label htmlFor="uname">
          <b>Enter your Username</b>
        </label>
        <input
          type="text"
          placeholder="Username"
          name="uname"
          onChangeCapture={this.handleUname}
          required
        />
        <label htmlFor="psw">
          <b>Enter Password</b>
        </label>
        <input
          type="password"
          placeholder="Password"
          name="psw"
          onChangeCapture={this.handlePassword}
          required
        />
        <label htmlFor="repsw">
        <b>Re-enter your Password</b>
        </label>
        <input
          type="password"
          placeholder="Re-enter Password"
          name="repsw"
          onChangeCapture={this.handleRePassword}
          required
        />
        <button type="submit">Submit</button>
        <br></br>
        <label>
          <input
            type="checkbox"
            defaultChecked="checked"
            name="TandC"
          />{" "}
          I agree to the terms and conditions.
        </label>
      </div>
      <div
        className="container"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <button
          type="button"
          onClick={this.onClickN}
          className="cancelbtn"
        >
          Cancel
        </button>
        {/* <span className="psw">
          Forgot Password <a href="#"><center><h6>password?</h6></center></a>
        </span> */}
      </div>
      <a href="#" onClick={this.onClickB}>Already a member? Login.</a>
      <LoginModal/>
    </form>
  </div>
  </div>
)
}
onClickN(event) {
  var modal = document.getElementById('id02');
        modal.style.display = "none";
}

onClickB(event) {
  var modal = document.getElementById('id01');
  var modal2 = document.getElementById('id02');
  modal.style.display = "block";
  modal2.style.display ='none';
}

}

export default SignUpModal;