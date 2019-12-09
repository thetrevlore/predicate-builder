import React from 'react';
import './App.css';
import QueryRow from './QueryRow';

class QueryRowList extends React.Component {
  state = { queryRows: [<QueryRow key={0} removeRow={this.removeRow} rowIdx={0} />] }

  addRow = () => {
    this.setState({ queryRows: [...this.state.queryRows, <QueryRow key={this.state.queryRows.length} removeRow={this.removeRow} rowIdx={this.state.queryRows.length} />] })
  }

  removeRow = (rowIdx) => {
    let rows = [...this.state.queryRows];
    let newRows = rows.filter((row) => row.key != rowIdx);
    this.setState({ queryRows: newRows });
  }

  render() {
    return (
      <div className="query-row-list-container">
        {this.state.queryRows}
        <button className="add-row-btn" onClick={this.addRow}>AND</button>
      </div>
    );
  }
}

export default QueryRowList;
