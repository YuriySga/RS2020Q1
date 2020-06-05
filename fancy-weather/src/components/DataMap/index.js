import React, { PureComponent } from 'react';
import './style.scss';

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default class DataMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    }

  const map = null;
  const marker = null;
  }

  componentDidMount() {
    console.log('componentDidMount MAP');
    this.renderMap();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate MAP');
      if(prevProps.pos.longitude !== this.props.pos.longitude || prevProps.pos.latitude !== this.props.pos.latitude) {
        const {longitude, latitude} = this.props.pos
        this.map.flyTo({ center: [longitude, latitude]});
        this.marker.setLngLat([longitude, latitude])
      }
  }

  render() {
    console.log('render MAP');
    const clsName = this.props.className;
    let { longitude } = this.props.pos;
    let { latitude } = this.props.pos;

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
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude],
          zoom: 8
        }) 

        this.marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(this.map)
    }
    
}
