import React from 'react';
import './App.css';
import QueryRow from './QueryRow';

class QueryRowList extends React.Component {
  state = {
    allRows: []
  }

  componentDidMount() {
    this.addRow();
  }

  addRow = () => {
    const uniqId = new Date().getTime();
    this.setState({
      allRows: [...this.state.allRows, { id: uniqId, attribute: '', operator: '', userInput: ''}]
    });
  }

  removeRow = (rowIdToRemove) => {
    let newAllPredicates = this.state.allRows.filter(row => String(row.id) !== String(rowIdToRemove));
    this.setState({ allRows: newAllPredicates });
  }

  submitQuery = () => {
    let query = 'SELECT * FROM session\nWHERE\n';
    for (let i = 0; i < this.state.allRows.length; i++) {
      let row = this.state.allRows[i];
      query += `\t${row.attribute} ${row.operator} ${row.userInput}`
      query += i !== this.state.allRows.length - 1 ? '\nAND\n' : '';
    }
    console.log(query)
  }

  editRow = ({ id, attribute, operator, userInput }) => {
    let rows = [...this.state.allRows];
    for (let i = 0; i < rows.length; i++) {
      let row = this.state.allRows[i];
      if (row.id === id) {
        row.attribute = attribute;
        row.operator = operator;
        row.userInput = userInput;
      }
    }
    this.setState({ allRows: rows });
  }

  render() {
    return (
      <div className="App">
        <header>SEARCH FOR SESSIONS</header>

        <main>
          <div className="query-row-list-container">
            {this.state.allRows.map(row => <QueryRow editRow={this.editRow} key={row.id} removeRow={this.removeRow} id={row.id} disableRemoveRow={this.state.allRows.length <= 1} />)}
            <button className="add-row-btn" onClick={this.addRow}>AND</button>
          </div>
        </main>

        <footer>
          <button className="search-btn" onClick={this.submitQuery}>Search</button>
        </footer>
      </div>
    );
  }
}

export default QueryRowList;
