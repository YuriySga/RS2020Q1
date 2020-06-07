import React, { Component, PureComponent } from 'react';
import {
  Dropdown, Button, ButtonGroup, Radio,
} from 'bootstrap-4-react';
import './style.scss';

export default class HeaderButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.hendleLangButton = this.hendleLangButton.bind(this);
  }

  handleChange(e) {
    const { onChange } = this.props;
    onChange(e.target);
  }

  hendleLangButton(e) {
    const { onClick } = this.props;
    onClick(e.target.dataset.lang);
  }

  render() {
    const { scaleIsFarengeit, lang } = this.props;

    return (
      <div className="buttons-group mx-auto mx-sm-auto mx-md-0 mx-lg-0 mx-xl-0">
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
            <button onClick={this.handleChange} type="button" className="btn btnRfrshImage btnRfrshImage--size44 btn-secondary">
              <div className="spinner" />
            </button>
          </div>
          <Dropdown className="mr-2">
            <Dropdown.Button
              className="dropDownBtn dropDownBtn--size7144 p-0"
              secondary
              id="dropdownMenuButton"
            >
              {lang.toUpperCase()}
            </Dropdown.Button>
            <Dropdown.Menu aria-labelledby="dropdownMenuButton">
              <Dropdown.Item
                onClick={this.hendleLangButton}
                data-lang="en"
              >
                EN
              </Dropdown.Item>
              <Dropdown.Item
                onClick={this.hendleLangButton}
                data-lang="ru"
              >
                RU
              </Dropdown.Item>
              <Dropdown.Item
                onClick={this.hendleLangButton}
                data-lang="be"
              >
                BE
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <ButtonGroup toggle>
            <Button className="farengeit" onClick={this.handleChange} active={scaleIsFarengeit} secondary as="label">
              <Radio autoComplete="off" />
              °F
            </Button>
            <Button className="celsius" onClick={this.handleChange} active={!scaleIsFarengeit} secondary as="label">
              <Radio autoComplete="off" />
              °C
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
