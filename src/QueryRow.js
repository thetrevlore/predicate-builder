import React from 'react';
import './App.css';
import downArrow from './down-arrow.svg';

class QueryRow extends React.Component {
  state = {
    inputValue: '',
    firstParam: 'num-visits',
    secondParam: 'equals',
  }

  get isStringParam() {
    const stringParams = [
      'user-email',
      'first-name',
      'last-name',
      'domain',
      'page-path'
    ];
    // const intParams = [
    //   'screen-width', 
    //   'screen-height',
    //   'num-visits',
    //   'page-response-time'
    // ];

    return stringParams.includes(this.state.firstParam);
  }

  removeRow = () => {
    this.props.removeRow(this.props.id);
  }

  selectFirstParam = (e) => {
    this.setState({ firstParam: e.target.value })
  }

  selectSecondParam = (e) => {
    this.setState({ secondParam: e.target.value })
  }

  handleInputValueChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <div className="query-row-container">
        <button className="remove-btn" onClick={this.removeRow}>-</button>
        <div className="custom-select">
          <select value={this.state.firstParam} onChange={this.selectFirstParam}>
            <option value="user-email">User Email</option>
            <option value="screen-width">Screen Width</option>
            <option value="screen-height">Screen Height</option>
            <option value="num-visits"># of Visits</option>
            <option value="first-name">First Name</option>
            <option value="last-name">Last Name</option>
            <option value="page-response-time">Page Response time (ms)</option>
            <option value="domain">Domain</option>
            <option value="page-path">Page Path</option>
          </select>
          <img src={downArrow} alt="down-arrow"></img>
        </div>
        {this.state.secondParam === 'contains' || this.state.secondParam === 'starts-with' ? null : <div className="is-and-div">is</div>}
        <div className="custom-select">
          <select value={this.state.secondParam} onChange={this.selectSecondParam}>
            <option value="equals">equal to</option>
            {this.isStringParam ? <option value="contains">contains</option> : null}
            {this.isStringParam ? <option value="starts-with">starts with</option> : null}
            {this.isStringParam ? null : <option value="between">between</option>}
            {this.isStringParam ? null : <option value="greater-than">greater than</option>}
            {this.isStringParam ? null : <option value="less-than">less than</option>}
            <option value="in-list">in list</option>
          </select>
          <img src={downArrow} alt="down-arrow"></img>
        </div>
        <input type="text" value={this.state.inputValue} onChange={this.handleInputValueChange}></input>
        {this.state.secondParam === 'between' ? <div className="is-and-div">and</div> : null}
        {this.state.secondParam === 'between' ? <input type="text" value={this.state.inputValue} onChange={this.handleInputValueChange}></input> : null}
      </div>
    );
  }
}

export default QueryRow;
