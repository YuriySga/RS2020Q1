import React, {Component, PureComponent} from 'react'
import HeaderButton from './HeaderButton'
import SearchForm from './SearchForm'
import DataMap from './DataMap'
import Weather from './Weather'
import ChangeBackground from './ChangeBackground'
import getCityOnIp from './Requests/getCityOnIp.js'
import getPosition from './getPosition.js'
import getWeather2Days from './Requests/getWeather2Days.js'
import getWeather3Day from './Requests/getWeather3Day.js'
import './style.scss'

export default class App extends PureComponent {
    state = {
        scaleIsFarengeit: false,
        valueForSearchCity: null,
        country: null,
        pos: null
        
    }

    buttonListener = this.buttonListener.bind(this)
    getValueForSearchCity = this.getValueForSearchCity.bind(this)
    getPosFromWeather = this.getPosFromWeather.bind(this)

    componentWillMount() {
        ChangeBackground()
        getCityOnIp()
            .then(data=>{
                this.setState( {valueForSearchCity: data.city, country : data.country} ) 
                })
            .then(() => getPosition())            
            .then((pos) => {this.setState( {pos: pos.coords} )})           
            .catch((err) => {console.log(err)})

        getPosition()            
            .then((pos) => {this.setState( {pos: pos.coords} )})           
            .catch((err) => {console.log(err)})
    }

    buttonListener(target) {
        target.classList.contains("spinner") && ChangeBackground()
        target.classList.contains("btnRfrshImage") && ChangeBackground()
        target.classList.contains("farengeit") && this.setState( {scaleIsFarengeit: true} )
        target.classList.contains("celsius") && this.setState( {scaleIsFarengeit: false} )
    }

    getValueForSearchCity(value) {
        this.setState( {valueForSearchCity: value} ) 
    }

    getPosFromWeather(pos) {     
        this.setState( {pos: pos} ) 
    }


    render() { 
        if (!this.state.valueForSearchCity) return <div/>
        console.log('APP RENDER' + this.state.pos)      

        return (
            <div className="container app">                
                <div className="row justify-content-center pt-4 mb-4">
                    <div className="col-sm-12 col-md-5 col-lg-7 col-xl-7 mb-4">
                        <HeaderButton onChange={this.buttonListener}/>
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-4 col-xl-4">
                        <SearchForm getValueInput={this.getValueForSearchCity}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-7">
                        <Weather getPos={this.getPosFromWeather} valueForSearchCity={this.state.valueForSearchCity} scaleIsFarengeit = {this.state.scaleIsFarengeit}/>
                    </div>
                    <div className="col-12 col-xl-4 pt-0 pt-sm-0 pt-md-0 pt-lg-0 pt-xl-5">
                        <DataMap pos={this.state.pos} className="mx-auto mx-sm-auto mx-md-auto mx-lg-auto float-xl-right"/>
                    </div>
                </div>                    
            </div>
                    
                   


                


             /*    <div className="jumbotron">
                    <h1 className="display-3">App name</h1>
                    <button className="btn" onClick = {this.revert}>Revert</button>
                </div>
                <ArticleList articles={this.state.reverted ? articles.slice().reverse() : articles}/>
            </div>*/
        )
    }

   
}

