import React, {Component, PureComponent} from 'react'
import { Dropdown, Button, ButtonGroup } from 'bootstrap-4-react';
import './style.scss';
//import SearchForm from '../SearchForm'

export default class HeaderButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isOpen: props.defaultOpen,
            count: 0,
        }
    }

     

    render() {
        /* mt-sm-4 mb-sm-4 mx-md-0 mx-xl-0 mx-lg-0 mx-sm-auto */ 
        return (            
                <div className="buttons-group mx-auto mx-sm-auto mx-md-0 mx-lg-0 mx-xl-0">
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
                            <button type="button" className="btn btnRfrshImage btnRfrshImage--size44 btn-secondary"></button>
                        </div>
                        <Dropdown className="mr-2">
                            <Dropdown.Button className="dropDownBtn dropDownBtn--size7144 p-0" secondary id="dropdownMenuButton">EN</Dropdown.Button>
                            <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                                <Dropdown.Item>EN</Dropdown.Item>
                                <Dropdown.Item>RU</Dropdown.Item>
                                <Dropdown.Item>BE</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <ButtonGroup aria-label="Basic example">
                            <Button secondary>°F</Button>
                            <Button secondary>°C</Button>
                        </ButtonGroup>                       

                    </div>
                    
        
                   {/*212529  <button onClick={this.dropdown}>5656</button> */}
                </div> 

                
        )            
    } 
    dropdown = () => {
        const dropdownMenu = document.querySelector(".dropdown-menu")
        //dropdownMenu.className.add(".dropDownBtn--open")        
        dropdownMenu.style.display = "block"
    }
}




