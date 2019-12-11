import React from 'react';
import './App.css';
import downArrow from './down-arrow.svg';

const STRING_PARAMS = [
  'user_email',
  'user_first_name',
  'user_last_name',
  'domain',
  'path'
];

const INT_PARAMS = [
  'screen_width', 
  'screen_height',
  'visits',
  'page_response'
];

class QueryRow extends React.Component {
  state = {
    inputValue: '',
    predicate: 'visits',
    operator: 'equals',
  }

  get isStringParam() {
    return STRING_PARAMS.includes(this.state.predicate);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue || prevState.predicate !== this.state.predicate || prevState.operator !== this.state.operator) {
      this.generateSql();
    }
  }

  removeRow = () => {
    this.props.removeRow(this.props.id);
  }

  selectFirstParam = (e) => {
    this.setState({ predicate: e.target.value })
  }

  selectSecondParam = (e) => {
    this.setState({ operator: e.target.value })
  }

  handleInputValueChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  generateSql = () => {
    let searchTerm = `'${this.state.inputValue}'`;
    if (!this.isStringParam) {
      searchTerm = Number(searchTerm)
    }

    let operator = this.state.operator;
    if (this.state.operator === 'contains') {
      searchTerm = `'%${this.state.inputValue}%'`;
      operator = 'LIKE'
    } else if (this.state.operator === 'starts_with') {
      searchTerm = `'${this.state.inputValue}%'`
      operator = 'LIKE'
    } else if (this.state.operator === 'BETWEEN') {
      searchTerm = `${Number(this.state.inputValue)} AND ${Number(this.state.inputTwoValue)}`
    }

    // const predicate = `${this.state.predicate} ${operator} ${searchTerm}`

    const predicate = {
      id: this.props.id,
      predicate: this.state.predicate,
      operator,
      searchTerm
    }

    // return `
    //   SELECT * FROM session
    //   WHERE ${this.state.predicate} ${operator} ${searchTerm}
    // `

    this.props.editRow(predicate)
  }

  render() {
    return (
      <div className="query-row-container">
        <button disabled={this.props.disableRemoveRow} className="remove-btn" onClick={this.removeRow}>-</button>
        <div className="custom-select">
          <select value={this.state.predicate} onChange={this.selectFirstParam}>
            <option value="user_email">User Email</option>
            <option value="screen_width">Screen Width</option>
            <option value="screen_height">Screen Height</option>
            <option value="visits"># of Visits</option>
            <option value="user_first_name">First Name</option>
            <option value="user_last_name">Last Name</option>
            <option value="page_response">Page Response time (ms)</option>
            <option value="domain">Domain</option>
            <option value="path">Page Path</option>
          </select>
          <img src={downArrow} alt="down-arrow"></img>
        </div>
        {this.state.operator === 'contains' || this.state.operator === 'starts-with' ? null : <div className="is-and-div">is</div>}
        <div className="custom-select">
          <select value={this.state.operator} onChange={this.selectSecondParam}>
            <option value="=">equal to</option>
            {this.isStringParam ? <option value="contains">contains</option> : null}
            {this.isStringParam ? <option value="starts_with">starts with</option> : null}
            {this.isStringParam ? null : <option value="BETWEEN">between</option>}
            {this.isStringParam ? null : <option value=">">greater than</option>}
            {this.isStringParam ? null : <option value="<">less than</option>}
            <option value="in-list">in list</option>
          </select>
          <img src={downArrow} alt="down-arrow"></img>
        </div>
        <input type="text" value={this.state.inputValue} onChange={this.handleInputValueChange}></input>
        {this.state.operator === 'between' ? <div className="is-and-div">and</div> : null}
        {this.state.operator === 'between' ? <input type="text" value={this.state.inputValue} onChange={this.handleInputValueChange}></input> : null}
      </div>
    );
  }
}

export default QueryRow;
