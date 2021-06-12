import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle ,faImages} from '@fortawesome/free-solid-svg-icons';


var i=-1;
class ImageUpload extends React.Component {

constructor() {
    super();
    this.state = {
      form: {
        name:'',
        location: '',
        description:'',
        amenities:'',
        price:'',
        rating:'',
        url:'',
        imageUrls:[],
        files:[]
      },
      
      errors: {},
      file: '',
      imagesPreviewUrls:[],
      imagePreviewUrl: '',
      result:'',
      img:[],
      files:[]
    };
    
    this._handleImageChange=this._handleImageChange.bind(this);
  }

 

  _handleSubmit(e) {
    i++;
    e.preventDefault();
    console.log('handle uploading-', this.state.file);
    const url = "http://10.10.200.24:9000/images"; 
    var bearerToken = localStorage.getItem('accessToken');
    var accesstoken = 'Bearer ' + bearerToken;
    console.log(accesstoken)
    const formdata=new FormData()
    console.log("After submitting"+this.state.files);
    

    
     formdata.append("file",this.state.files[i]);
     
 
    let headers = new Headers();

        
        
    
        headers.append('Access-Control-Allow-Origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('GET', 'POST');
        
        e.preventDefault();
        
        fetch(url, {
          headers: headers,
          method: 'POST',
          withCredentials:true,
          credentials:'include',
          headers:{
            'Access-Control-Allow-Origin': url,
            'Authorization':accesstoken
          },
          body: formdata
        })       
       
        .then(response=>{
          console.log(response);
          response.json().then((responseData)=>{console.log(responseData.image_url)
            this.state.img.push(responseData.image_url)
          console.log(this.state.img)
          sessionStorage.setItem('imgURLs',JSON.stringify(this.state.img))
          })
         
        })
       
 
        
   }
   _handleImageChange = e =>{
     
    e.preventDefault();
  
    // FileList to Array
    let files = Array.from(e.target.files);
    console.log("target files"+e.target.files);
    console.log("bbb"+files);
  
    // File Reader for Each file and and update state arrays
    files.forEach((file, i) => {
        let reader = new FileReader();
  
        reader.onloadend = () => {
            this.setState(prevState => ({
                files: [...prevState.files, file],
                imagesPreviewUrls: [...prevState.imagesPreviewUrls, reader.result]
            }));
        }
  
        reader.readAsDataURL(file);
    });
  }

  
  removeImage(e,i,image){
    console.log("i",i);
    let did=this.state.imagesPreviewUrls.findIndex(k=>k==i)
   
    console.log("index is",did)
    console.log(this.state.imagesPreviewUrls);
    let remimg=this.state.imagesPreviewUrls.splice(did,1)
    let f=this.state.files.splice(did,1)
   
    
     this.setState({
       imagesPreviewUrls: remimg,
       //files:f
      
     })
     console.log(this.state.imagesPreviewUrls);
     this.setState({
         imagesPreviewUrls: this.state.imagesPreviewUrls,
       })
      
   }
  

render() {
  
const { form } = this.state;
return(
  <div className="hotelformb">
    <div className="imgform">
        <form>
                <input className="upload" type='file' id='multi' onChange={this._handleImageChange} multiple />
             
                <div className="imgPreview" ><br></br>
                  {/* {$imagePreview} */}
                  {this.state.imagesPreviewUrls.map((image, index)=>{
                    return (
                        <div key={index}>                  
                           <FontAwesomeIcon icon={faTimesCircle} size='1x' onClick={this.removeImage.bind(this,index,image)}/>
                            <img key={index} className='fadein' src={image} width="200px" style={{padding:"1vh"}} />
                        </div>
                        )
                     })}
                </div><br></br>
                <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button><br></br>
              </form>

            
          
            
      
    </div>
    
  </div>
  );
  };
}

export default ImageUpload;