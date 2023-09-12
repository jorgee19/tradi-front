import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 20.6584339,
      lng: -103.3255987
    },
    zoom: 11
  };

  state = {
    lat:this.props.lat,
    lng:this.props.lat
  }

  onClickMap = (data) =>{  
    if(typeof(this.props.sendCoordinates) != 'undefined'){
      this.setState({"lat":data.lat,"lng":data.lng},this.selectCoordinates) 
    }

  }

  render() {

    let lat, lng
    if(typeof(this.props.sendCoordinates) == 'undefined'){
      lat=this.props.lat
      lng=this.props.lng
    }
    else{
      lat=this.state.lat
      lng=this.state.lng
    }
    let marker =(<Marker
          lat={lat}
          lng={lng}
    
      />);

    return (
      <div className="mapview">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.onClickMap}
        >
          {marker}
        </GoogleMapReact>
      </div>
    );
  }

  selectCoordinates = () =>{
    console.log('seleect coordinates fucntion original: lat:' + this.state.lat.toString() + ' lng:' + this.state.lng.toString())
    this.props.sendCoordinates(this.state.lat.toString(), this.state.lng.toString())
  }

}

export default MapContainer;
