import React, { PureComponent } from 'react';
import timeDateParse from '../timeDateParse.js';
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
    this.renderMap();
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevProps.pos.longitude !== this.props.pos.longitude || prevProps.pos.latitude !== this.props.pos.latitude) {
        const {longitude, latitude} = this.props.pos
        this.map.flyTo({ center: [longitude, latitude]});
        this.marker.setLngLat([longitude, latitude])
      }
  }

  render() {
    const clsName = this.props.className;
    let { longitude, latitude } = this.props.pos;
    const { lang } = this.props;

    const editedLongitude = `${Math.trunc(Number(longitude))}° ${Math.abs(Math.trunc(((Number(longitude).toFixed(2)) % 1) * 60))}'`;
    const editedLatitude = `${Math.trunc(Number(latitude))}° ${Math.abs(Math.trunc(((Number(latitude).toFixed(2)) % 1) * 60))}'`;
    const mapPosLangIndexOfLongitude = timeDateParse.mapPos.en.indexOf('Longitude');
    const mapPosLangIndexOfLatitude = timeDateParse.mapPos.en.indexOf('Latitude');
    const textLongitude = `${timeDateParse.mapPos[lang][mapPosLangIndexOfLongitude]}`;
    const textLatitude = `${timeDateParse.mapPos[lang][mapPosLangIndexOfLatitude]}`;

    return (
      <div className={`${clsName} dataMap`}>
        <div className="mapMask">
          <div className="dataMap__map" id="map" />
        </div>
        <div className="dataMap__coords">
          <div>{`${textLongitude}: ${editedLongitude}`}</div>
          <div>{`${textLatitude}: ${editedLatitude}`}</div>
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
