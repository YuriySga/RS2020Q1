import React, { PureComponent } from 'react';
import timeDateParse from '../timeDateParse.js';
import './style.scss';

export default class SearchForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchFormValueInput: null,
    };

    this.handleSearchCity = this.handleSearchCity.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(event) {
    this.setState({ searchFormValueInput: event.target.value });
  }

  handleSearchCity(event) {
    event.preventDefault();
    const { getValueInput } = this.props;
    const { searchFormValueInput } = this.state;
    getValueInput(searchFormValueInput);
  }

  render() {
    const { lang } = this.props;
    const placeHolder = timeDateParse.searchPlaceholderLang[lang];
    return (
      <form onSubmit={this.handleSearchCity} className="header__search-form search-form float-md-right float-lg-right float-xl-right mx-auto mx-sm-auto mx-md-0 mx-lg-0 mx-xl-0">
        <div className="input-group mb-3">
          <input type="text" className="form-control form-control-lg search-form__input" onChange={this.handleChangeInput} placeholder={placeHolder} aria-label="Recipient's username" aria-describedby="button-addon2" />
          <div className="input-group-append">
            <button className="btn searchButton btn-lg btn-secondary" type="submit" id="button-addon2">SEARCH</button>
          </div>
        </div>
      </form>
    );
  }
}
