import React from 'react';
import './App.css';
import QueryRow from './QueryRow';

class QueryRowList extends React.Component {
  state = { rowIds: [] }

  componentDidMount() {
    this.addRow();
  }

  addRow = () => {
    const uniqId = new Date().getTime();
    this.setState({ rowIds: [...this.state.rowIds, uniqId]})
  }

  removeRow = (rowIdToRemove) => {
    let newRowIds = this.state.rowIds.filter(id => String(id) !== String(rowIdToRemove));
    this.setState({ rowIds: newRowIds });
  }

  render() {
    return (
      <div className="query-row-list-container">
        {this.state.rowIds.map(rowId => <QueryRow key={rowId} removeRow={this.removeRow} id={rowId} disableRemoveRow={this.state.rowIds.length <= 1} />)}
        <button className="add-row-btn" onClick={this.addRow}>AND</button>
      </div>
    );
  }
}

export default QueryRowList;
