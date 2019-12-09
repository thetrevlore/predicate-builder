import React from 'react';
import './App.css';

class QueryRow extends React.Component {
  removeRow = () => {
    if (this.props.rowIdx !== 0) {
      this.props.removeRow(this.props.rowIdx);
    }
  }
  render() {
    return (
      <div className="query-row-container">
        <button className="remove-btn" onClick={this.removeRow}>-</button>
      </div>
    );
  }
}

export default QueryRow;
