import mapboxgl from 'mapbox-gl';
import React,{Component} from 'react';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
 
class Maps extends Component{

  mapRef = React.createRef()
  geocoderContainerRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
              width: 570,
              height: 200,
              latitude: 17.3850,
              longitude: 78.4867,
              zoom: 8
            },
            latitude:17.3850,
            longitude:78.4867,
            place:''
          };
          this.onMapclick=this.onMapclick.bind(this)
          this.setLatLng=this.setLatLng.bind(this)
    }
    onMapclick(e){
        this.setState({latitude:e.lngLat[1],
            longitude:e.lngLat[0]
        })
       sessionStorage.setItem('lat',this.state.latitude)
       sessionStorage.setItem('long',this.state.longitude)
    }
    setLatLng(event){
        
        this.setState({
            latitude:event.lngLat[1],
            longitude:event.lngLat[0],
            
        })
        sessionStorage.setItem('lat',this.state.latitude)
       sessionStorage.setItem('long',this.state.longitude)
        
    }

    
    
    
      render() {
        return (
          <div
          ref={this.geocoderContainerRef}
          style={{paddingTop:'20px',paddingBottom:'20px'}}
          >
          
          <ReactMapGL
            ref={this.mapRef}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...this.state.viewport}
            onClick={this.onMapclick}
            onViewportChange={(viewport) => this.setState({viewport})}
            mapboxApiAccessToken='pk.eyJ1IjoibmlkaGlwYXZ1bHVyaSIsImEiOiJjanRqcGQ3eDEwMWE3M3ltamdzYnlpc2syIn0.Iw2YRzOYRS7mBJNmykVa6g'>
             
             <Marker latitude={this.state.latitude} longitude={this.state.longitude} offsetLeft={-20} offsetTop={-10} draggable onDragEnd={this.setLatLng}>
          <div><i class="fas fa-home fa-2x"></i></div>
          </Marker>
        </ReactMapGL>
        <br/>
        <div style={{float:'right'}}>
        <Geocoder
         containerRef={this.geocoderContainerRef}
         mapRef={this.mapRef}
         onViewportChange={(viewport) => this.setState({viewport})}
         mapboxApiAccessToken='pk.eyJ1IjoibmlkaGlwYXZ1bHVyaSIsImEiOiJjanRqcGQ3eDEwMWE3M3ltamdzYnlpc2syIn0.Iw2YRzOYRS7mBJNmykVa6g'
        
       />
       </div>
       </div>
        );
      }
}

export default Maps;