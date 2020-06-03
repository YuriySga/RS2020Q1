import React, { PureComponent } from 'react';
import './style.scss';

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default class DataMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pos: null,
    };
  }


  componentDidMount() {
    this.renderMap(); 
  }


  componentDidUpdate() {

  }

  render() {
    const clsName = this.props.className;
    let { longitude } = this.props.pos;
    let { latitude } = this.props.pos;
    //this.renderMap(longitude, latitude); 

    const editedLongitude = `${Math.trunc(Number(longitude))}° ${Math.trunc(((Number(longitude).toFixed(2)) % 1) * 60)}'`;
    const editedLatitude = `${Math.trunc(Number(latitude))}° ${Math.trunc(((Number(latitude).toFixed(2)) % 1) * 60)}'`;


    return (
      <div className={`${clsName} dataMap`}>
        <div className="mapMask">
          <div className="dataMap__map" id="map" />
        </div>
        <div className="dataMap__coords">
          <div>{`Longitude: ${editedLongitude}`}</div>
          <div>{`Latitude: ${editedLatitude}`}</div>
        </div>
      </div>
    );
  }

  renderMap = () => {
        const {longitude, latitude} = this.props.pos;

        const mapboxToken = 'pk.eyJ1IjoieXVyaXlzZ2EiLCJhIjoiY2thanB1dzl5MGQwYzMwcGlpenE5N3U5diJ9.WoVhYs3HRx5n6qtIl3KAyA'
        mapboxgl.accessToken = mapboxToken
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 8
        })

        const marker = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map)
    }  
}
