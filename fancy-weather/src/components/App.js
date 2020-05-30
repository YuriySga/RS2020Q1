import React, {Component, PureComponent} from 'react'
//import ArticleList from './ArticleList'
//import articles from '../fixtures'
import HeaderButton from './HeaderButton'
import SearchForm from './SearchForm'
import DataMap from './DataMap'
import Weather from './Weather'
import ChangeBackground from './ChangeBackground'
//import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'

export default class App extends PureComponent {
    state = {
        scaleIsFarengeit: true
    }

    celsiusOrFarengeit = this.celsiusOrFarengeit.bind(this)

    componentWillMount() {
        ChangeBackground()
    }

    celsiusOrFarengeit (target) {
        target.classList.contains("farengeit") && this.setState( {scaleIsFarengeit: true} )
        target.classList.contains("celsius") && this.setState( {scaleIsFarengeit: false} )
    }


    render() {        

        return (
            <div className="container app">                
                    <div className="row justify-content-center pt-4 mb-4">
                        <div className="col-sm-12 col-md-5 col-lg-7 col-xl-7 mb-4">
                            <HeaderButton onChange={this.celsiusOrFarengeit}/>
                        </div>
                        <div className="col-sm-12 col-md-7 col-lg-4 col-xl-4">
                            <SearchForm/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-7">
                            <Weather scaleIsFarengeit = {this.state.scaleIsFarengeit}/>
                        </div>
                        <div className="col-12 col-xl-4 pt-0 pt-sm-0 pt-md-0 pt-lg-0 pt-xl-5">
                            <DataMap className="mx-auto mx-sm-auto mx-md-auto mx-lg-auto float-xl-right"/>
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

