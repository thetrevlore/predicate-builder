import React from 'react';
import './App.css';
import QueryRow from './QueryRow';

class QueryRowList extends React.Component {
  state = {
    rowIds: [],
    sqlQuery: []
  }

  componentDidMount() {
    this.addRow();
  }

  addRow = (predicate) => {
    const uniqId = new Date().getTime();
    this.setState({
      rowIds: [...this.state.rowIds, uniqId],
      sqlQuery: [...this.state.sqlQuery, predicate]
    });
    // this.setState({ })
  }

  removeRow = (rowIdToRemove) => {
    let newRowIds = this.state.rowIds.filter(id => String(id) !== String(rowIdToRemove));
    this.setState({ rowIds: newRowIds });
  }

  // addSqlRow = (predicate) => {
  //   this.setState({ sqlQuery: [...this.state.sqlQuery, predicate]})
  // }

  submitQuery = () => {
    // this.props.submitQuery(this.state.sqlQuery)
    console.log(this.state.sqlQuery.join(' AND '))
  }

  editRow = ({ id, inputValue, predicate, operator }) => {
    // SELECT * FROM session WHERE 
    const rowIndex = this.state.rowIds.indexOf(id);
    let queryPredicates = [...this.state.sqlQuery];
    const newPredicate = { id, inputValue, predicate, operator };
    queryPredicates.splice(rowIndex, 1, newPredicate)
    this.setState({ sqlQuery: queryPredicates })
  }

  render() {
    return (
      <div className="App">
        <header>SEARCH FOR SESSIONS</header>

        <main>
          <div className="query-row-list-container">
            {this.state.rowIds.map(rowId => <QueryRow key={rowId} removeRow={this.removeRow} id={rowId} disableRemoveRow={this.state.rowIds.length <= 1} />)}
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
