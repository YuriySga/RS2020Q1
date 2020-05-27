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
                <header className="container header">                
                    <HeaderButton/>
                    <SearchForm/>
                </header> 
                <main className="container main">
                    <Weather/>
                    <DataMap/> 
                </main>
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