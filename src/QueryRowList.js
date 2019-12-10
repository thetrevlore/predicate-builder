import React from 'react';
import './App.css';
import QueryRow from './QueryRow';

class QueryRowList extends React.Component {
  constructor() {
    super();
    const uniqId = new Date().getTime();
    this.state = { queryRows: [<QueryRow key={uniqId} removeRow={this.removeRow} id={uniqId} />] }
  }

  addRow = () => {
    const uniqId = new Date().getTime();
    this.setState({ queryRows: [...this.state.queryRows, <QueryRow key={uniqId} removeRow={this.removeRow} id={uniqId} />] })
  }

  removeRow = (id) => {
    if (this.state.queryRows.length > 1) {
      let newRows = this.state.queryRows.filter((row) => String(row.props.id) !== String(id));
      this.setState({ queryRows: newRows });
    }
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
