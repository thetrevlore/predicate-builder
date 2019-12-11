import React from 'react';
import './App.css';
import QueryRow from './QueryRow';

class QueryRowList extends React.Component {
  state = {
    allPredicates: []
  }

  componentDidMount() {
    this.addRow();
  }

  addRow = () => {
    const uniqId = new Date().getTime();
    this.setState({
      allPredicates: [...this.state.allPredicates, { id: uniqId, predicate: '', operator: '', searchTerm: ''}]
    });
  }

  removeRow = (rowIdToRemove) => {
    let newAllPredicates = this.state.allPredicates.filter(pred => String(pred.id) !== String(rowIdToRemove));
    this.setState({ allPredicates: newAllPredicates });
  }

  submitQuery = () => {
    console.log('->',this.state.allPredicates)
    let query = 'SELECT * FROM session\nWHERE\n';
    for (let i = 0; i < this.state.allPredicates.length; i++) {
      let row = this.state.allPredicates[i];
      query += `\t${row.predicate} ${row.operator} ${row.searchTerm}`
      query += i !== this.state.allPredicates.length - 1 ? '\nAND\n' : '';
    }
    console.log(query)
  }

  editRow = ({ id, searchTerm, predicate, operator }) => {
    let allPreds = [...this.state.allPredicates];
    for (let i = 0; i < allPreds.length; i++) {
      let row = this.state.allPredicates[i];
      if (row.id === id) {
        row.searchTerm = searchTerm;
        row.predicate = predicate;
        row.operator = operator;
      }
    }
    this.setState({ allPredicates: allPreds });
  }

  render() {
    return (
      <div className="App">
        <header>SEARCH FOR SESSIONS</header>

        <main>
          <div className="query-row-list-container">
            {this.state.allPredicates.map(pred => <QueryRow editRow={this.editRow} key={pred.id} removeRow={this.removeRow} id={pred.id} disableRemoveRow={this.state.allPredicates.length <= 1} />)}
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
