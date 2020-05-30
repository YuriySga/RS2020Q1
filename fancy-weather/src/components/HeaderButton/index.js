import React, {Component, PureComponent} from 'react'
import { Dropdown, Button, ButtonGroup, Radio } from 'bootstrap-4-react';
import ChangeBackground from '../ChangeBackground/index.js'
import './style.scss';
//import SearchForm from '../SearchForm'

export default class HeaderButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target)
      }

    render() {
        return (            
            <div className="buttons-group mx-auto mx-sm-auto mx-md-0 mx-lg-0 mx-xl-0">
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
                        <button onClick={ChangeBackground} type="button" className="btn btnRfrshImage btnRfrshImage--size44 btn-secondary">
                            <div className="spinner"></div>
                        </button>
                    </div>
                    <Dropdown className="mr-2">
                        <Dropdown.Button className="dropDownBtn dropDownBtn--size7144 p-0" secondary id="dropdownMenuButton">EN</Dropdown.Button>
                        <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                            <Dropdown.Item>EN</Dropdown.Item>
                            <Dropdown.Item>RU</Dropdown.Item>
                            <Dropdown.Item>BE</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ButtonGroup toggle>
                        <Button className="farengeit" onClick={this.handleChange} secondary as="label">
                            <Radio autoComplete="off" />
                            °F
                        </Button>                        
                        <Button className="celsius" onClick={this.handleChange} active secondary as="label"  >
                            <Radio autoComplete="off" />
                            °C
                        </Button>
                    </ButtonGroup>
                </div>
            </div> 
        )            
    }
    /* ChangeBackground */
    spinnerOn = () => {
        console.log("spin")
        this.props.onChange(9999999999)
    } 
   /* 

   @keyframes rotation { 
  0% {transform:rotate(0deg);} 
  100% {transform:rotate(-360deg);}
}

  &__load-indicator {
    display: none;
    position: absolute;
    right: 132px;
    top: 2px;
    width: 26px;
    height: 26px;
    z-index: 5;
  }
  
  &__load-indicator_active {
    display: block;    
    animation-name: rotation;
    animation-duration: 0.8s; 
    animation-iteration-count: infinite;
    animation-timing-function: linear;    
  }
  

   function loadIndicatorOn(indicatorTurnOn) {
  if (indicatorTurnOn) {
    searchForm__loadIndicator.classList.add('search-form__load-indicator_active');
  } else {
    searchForm__loadIndicator.classList.remove('search-form__load-indicator_active');
  }
}
   
   
   changeBackground = () => {
        const dropdownMenu = document.querySelector(".dropdown-menu")
        dropdownMenu.style.display = "block"
    }  
    */
    

}




