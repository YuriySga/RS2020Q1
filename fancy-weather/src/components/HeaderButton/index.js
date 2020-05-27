import React, {Component, PureComponent} from 'react'
import './style.scss';
//import SearchForm from '../SearchForm'

export default class HeaderButton extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
            isOpen: props.defaultOpen,
            count: 0
        }
    }

    render() {        
        return (            
                <div className="header__button">
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
                            <button type="button" className="btn btn-secondary">1</button>
                        </div>
                        <div className="btn-group btn-group-lg mr-2" role="group">
                            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </button>
                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <a className="dropdown-item" href="#">Dropdown link</a>
                                <a className="dropdown-item" href="#">Dropdown link</a>
                            </div>
                        </div>
                        <div className="btn-group  btn-group-lg" role="group" aria-label="Third group">
                            <button type="button" className="btn btn-secondary">3</button>
                            <button type="button" className="btn btn-secondary">4</button>
                        </div>
                    </div>
                </div> 
                        
                       
        )
    }
}



