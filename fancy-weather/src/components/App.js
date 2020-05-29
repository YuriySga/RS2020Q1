import React, {Component, PureComponent} from 'react'
//import ArticleList from './ArticleList'
//import articles from '../fixtures'
import HeaderButton from './HeaderButton'
import SearchForm from './SearchForm'
import DataMap from './DataMap'
import Weather from './Weather'
//import Requests from './Requests'
//import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'

class App extends PureComponent {
    state = {
        reverted: false,
        requestIsEnd: false
    }

    render() {

        return (
            <div className="container app">                
                    <div className="row justify-content-center pt-4 mb-4">
                        <div className="col-sm-12 col-md-5 col-lg-7 col-xl-7 mb-4">
                            <HeaderButton/>
                        </div>
                        <div className="col-sm-12 col-md-7 col-lg-4 col-xl-4">
                            <SearchForm/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-7">
                            <Weather/>
                        </div>
                        <div className="col-12 col-xl-4">
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

export default App