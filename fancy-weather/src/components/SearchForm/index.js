import React, {Component, PureComponent} from 'react';
import './style.scss'

/* class SearchForm extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
            isOpen: props.defaultOpen,
            count: 0
        }
    }

    render() {
        return (
            <div className="header__search-form search-form">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
            </div>
        )
    }    
} */


export default function SearchForm() {  
     
    return (
        <div className="header__search-form search-form float-md-right float-lg-right float-xl-right mx-auto mx-sm-auto mx-md-0 mx-lg-0 mx-xl-0">
            <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg" placeholder="Search city or ZIP" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button className="btn searchButton btn-lg btn-secondary" type="button" id="button-addon2">SEARCH</button>
                </div>
            </div>
        </div>
    )
}