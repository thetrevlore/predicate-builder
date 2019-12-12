import React from 'react';
import './Predicate-Builder.css'
import QueryRow from './QueryRow';

class PredicateBuilder extends React.Component {
  state = {
    queryRows: []
  }

  componentDidMount() {
    this.addRow();
  }

  addRow = () => {
    const uniqId = new Date().getTime();
    this.setState({
      queryRows: [...this.state.queryRows, { id: uniqId, attribute: '', operator: '', userInput: ''}]
    });
  }

  removeRow = (rowIdToRemove) => {
    let newRows = this.state.queryRows.filter(row => String(row.id) !== String(rowIdToRemove));
    this.setState({ queryRows: newRows });
  }

  submitQuery = () => {
    let query = 'SELECT * FROM session\nWHERE\n';
    for (let i = 0; i < this.state.queryRows.length; i++) {
      let row = this.state.queryRows[i];
      query += `\t${row.attribute} ${row.operator} ${row.userInput}`
      query += i !== this.state.queryRows.length - 1 ? '\nAND\n' : '';
    }
    console.log(query)
  }

  editRow = ({ id, attribute, operator, userInput }) => {
    let rows = [...this.state.queryRows];
    for (let i = 0; i < rows.length; i++) {
      let row = this.state.queryRows[i];
      if (row.id === id) {
        row.attribute = attribute;
        row.operator = operator;
        row.userInput = userInput;
      }
    }
    this.setState({ queryRows: rows });
  }

  render() {
    return (
      <div className="Predicate-Builder">
        <header>SEARCH FOR SESSIONS</header>

        <main>
          <div className="query-row-list-container">
            {this.state.queryRows.map(row => <QueryRow editRow={this.editRow} key={row.id} removeRow={this.removeRow} id={row.id} disableRemoveRow={this.state.queryRows.length <= 1} />)}
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

export default PredicateBuilder;
