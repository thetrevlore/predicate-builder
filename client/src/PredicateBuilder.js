import React, { useCallback, useEffect, useState } from "react";
import "./Predicate-Builder.css";
import QueryRow from "./QueryRow";

export default function PredicateBuilder() {
  const [queryRows, setQueryRows] = useState([]);
  useEffect(addRow, []);

  function addRow() {
    const uniqId = Date.now();
    setQueryRows([
      ...queryRows,
      { id: uniqId, attribute: "", operator: "", userInput: "" }
    ]);
  }

  function removeRow(rowIdToRemove) {
    const newRows = queryRows.filter(
      row => String(row.id) !== String(rowIdToRemove)
    );
    setQueryRows(newRows);
  }

  async function submitQuery() {
    const { query } = await fetch("/api/query", {
      method: "post",
      body: JSON.stringify(queryRows),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
    console.log("--query--");
    console.log(query);
  }

  const editRow = useCallback(
    ({ id, attribute, operator, userInput }) => {
      setQueryRows(qRows => {
        let rows = [...qRows];
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          if (row.id === id) {
            row.attribute = attribute;
            row.operator = operator;
            row.userInput = userInput;
          }
        }
        return rows;
      });
    },
    [setQueryRows]
  );

  return (
    <div className="Predicate-Builder">
      <header>SEARCH FOR SESSIONS</header>

      <main>
        <div className="query-row-list-container">
          {queryRows.map(row => (
            <QueryRow
              key={row.id}
              editRow={editRow}
              removeRow={removeRow}
              id={row.id}
              disableRemoveRow={queryRows.length <= 1}
            />
          ))}
          <button className="add-row-btn blue" onClick={addRow}>
            AND
          </button>
        </div>
      </main>

      <footer>
        <button className="search-btn blue" onClick={submitQuery}>
          Search
        </button>
      </footer>
    </div>
  );
}
