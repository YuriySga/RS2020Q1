import React, {Component, PureComponent} from 'react'
import './style.scss'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default class DataMap extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
            pos: null           
        }
    }

    componentWillMount() {
        console.log('datamap componentWillMount') 
        //this.setState( {pos: this.props.pos} )
      /*   const getPosition = function (options) {
            return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
          }
        
          getPosition()
            .then((pos) => {
                this.setState( {pos: pos.coords} )
            })           
            .catch((err) => {
              console.error(err.message);
            }); */
    }
    
    componentDidMount() {  
        console.log('datamap componentDidMount')  
    }

    componentWillUpdate() {
        console.log('datamap componentWillUpdate')  
    }

    componentDidUpdate() {
        console.log('datamap componentDidUpdate') 
        this.setState( {pos: this.props.pos} ) 
    }

    render() {
        const clsName = this.props.className
        let longitude = '';
        let latitude = '';
        if (this.state.pos) {
            this.renderMap()
            longitude = `${Math.trunc(Number(this.state.pos.longitude))}° ${Math.trunc(((Number(this.state.pos.longitude).toFixed(2))%1)*60)}'`
            latitude = `${Math.trunc(Number(this.state.pos.latitude))}° ${Math.trunc(((Number(this.state.pos.latitude).toFixed(2))%1)*60)}'`
        }

        return (            
            <div className={`${clsName} dataMap`}>
                <div className="mapMask">
                    <div className="dataMap__map" id='map'/>
                </div>
                <div className="dataMap__coords">
                    <div>{`Longitude: ${longitude}`}</div>
                    <div>{`Latitude: ${latitude}`}</div>
                </div>
            </div> 
        )
    }

    renderMap = () => {
        console.log('renderMap+++')
        console.log(this.state.pos.longitude)
        console.log(this.state.pos.latitude)


        const mapboxToken = 'pk.eyJ1IjoieXVyaXlzZ2EiLCJhIjoiY2thanB1dzl5MGQwYzMwcGlpenE5N3U5diJ9.WoVhYs3HRx5n6qtIl3KAyA'
        mapboxgl.accessToken = mapboxToken
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.pos.longitude, this.state.pos.latitude],
            zoom: 8
        })
            
        const marker = new mapboxgl.Marker()
            .setLngLat([this.state.pos.longitude, this.state.pos.latitude])
            .addTo(map)
    }  
}

