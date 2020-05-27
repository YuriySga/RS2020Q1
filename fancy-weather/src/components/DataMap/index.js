import React, {Component, PureComponent} from 'react'
import './style.css'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default class DataMap extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            pos: null,            
        }
    }

    componentWillMount() {
        console.log('-------componentWillMount');

        const getPosition = function (options) {
            return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
          }
    
        
          getPosition()
            .then((pos) => {
                localStorage.fancyWeatherCoords = pos.coords
                this.setState( {pos: pos.coords} )
            })           
            .catch((err) => {
              console.error(err.message);
            });
            console.log('----END---componentWillMount');
    }
    
    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        console.log('-------render');
        let longitude = '';
        let latitude = '';
        if (this.state.pos) {
            this.renderMap()
            longitude = this.state.pos.longitude
            latitude = this.state.pos.latitude
        }

        return (            
            <div className="dataMap float-right">
                <div className="dataMap__map" id='map'/>
                <div className="dataMap__coords">
                    <div>{`Longitude: ${longitude}`}</div>
                    <div>{`Latitude: ${latitude}`}</div>
                </div>
            </div> 
        )
    }

    renderMap = () => {
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












/* componentWillMount() {
    console.log('componentWillMount');
    console.log((!!this.state.coords));
    const success = (pos)=> this.setState({coords: pos.coords})  
    navigator.geolocation.getCurrentPosition(success)      
}

componentDidMount() {
    console.log('componentDidMount');
    console.log((!!this.state.coords));
}

render() {
    console.log('render');
    let longitude = '';
    let latitude = '';
    if (!!this.state.coords) {
        this.renderMap()
        longitude = this.state.coords.longitude
        latitude = this.state.coords.latitude
    }

    return (            
        <div className="dataMap float-right">
            <div className="dataMap__map" id='map'/>
            <div className="dataMap__coords">
                <div>{`Longitude: ${longitude}`}</div>
                <div>{`Latitude: ${latitude}`}</div>
            </div>
        </div> 
    )
}

renderMap = () => {
    const mapboxToken = 'pk.eyJ1IjoieXVyaXlzZ2EiLCJhIjoiY2thanB1dzl5MGQwYzMwcGlpenE5N3U5diJ9.WoVhYs3HRx5n6qtIl3KAyA'
    mapboxgl.accessToken = mapboxToken
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.coords.longitude, this.state.coords.latitude],
        zoom: 8
    })
        
    const marker = new mapboxgl.Marker()
        .setLngLat([this.state.coords.longitude, this.state.coords.latitude])
        .addTo(map)
}  
} */