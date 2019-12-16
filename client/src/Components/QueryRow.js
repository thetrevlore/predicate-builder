import React, { useEffect, useMemo, useState, useRef } from "react";
import "../Styles/query-row.css";
import Dropdown from "./Dropdown";
import {
  STRING_ATTRIBUTES,
  INTEGER_ATTRIBUTES,
  STRING_OPERATORS,
  INTEGER_OPERATORS,
  ATTRIBUTE_LIST
} from "../CONSTANTS";

export default function QueryRow({ editRow, removeRow, id, disableRemoveRow }) {
  const [attribute, setAttribute] = useState("");
  const [operator, setOperator] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [betweenInputTwoValue, setBetweenInputTwoValue] = useState("");
  const [operatorList, setOperatorList] = useState(INTEGER_OPERATORS);
  const isAttributeString = useMemo(
    () => STRING_ATTRIBUTES.includes(attribute),
    [attribute]
  );
  const isAttributeInteger = useMemo(
    () => INTEGER_ATTRIBUTES.includes(attribute),
    [attribute]
  );
  const operatorDropdown = useRef(null);

  useEffect(() => {
    function editQueryRow() {
      let userInput = `${inputValue}`;
      let sqlOperator = operator;

      if (sqlOperator === "contains") {
        sqlOperator = "LIKE";
        userInput = `'%${inputValue}%'`;
      } else if (sqlOperator === "starts_with") {
        sqlOperator = "LIKE";
        userInput = `'${inputValue}%'`;
      } else if (sqlOperator === "BETWEEN") {
        userInput = `${inputValue} AND ${betweenInputTwoValue}`;
      } else if (sqlOperator === "IN") {
        let values = inputValue.split(",").map(value => `'${value.trim()}'`);
        userInput = `(${values.join(", ")})`;
      }

      const row = {
        id,
        attribute,
        operator: sqlOperator,
        userInput
      };

      editRow(row);
    }

    editQueryRow();
  }, [
    attribute,
    operator,
    inputValue,
    betweenInputTwoValue,
    id,
    isAttributeInteger,
    editRow
  ]);

  useEffect(() => {
    if (isAttributeString) {
      setOperatorList(STRING_OPERATORS);
    } else if (isAttributeInteger) {
      setOperatorList(INTEGER_OPERATORS);
    }
  }, [isAttributeInteger, isAttributeString, operatorList, setOperatorList]);

  function removeQueryRow() {
    removeRow(id);
  }

  const onlyDigitsRegExp = /^\d+$/; // only digits. no negative numbers.
  function handleInputValueChange(e) {
    if (isAttributeInteger && onlyDigitsRegExp.test(Number(e.target.value))) {
      setInputValue(e.target.value.trim());
    } else if (isAttributeString) {
      setInputValue(e.target.value);
    }
  }

  function handleBetweenInputTwoValueChange(e) {
    if (onlyDigitsRegExp.test(Number(e.target.value))) {
      setBetweenInputTwoValue(e.target.value.trim());
    }
  }

  function selectOperator(id) {
    let temp = [...operatorList];
    temp.forEach(item => {
      if (item.id === id) {
        item.selected = true;
        setOperator(id);
      } else {
        item.selected = false;
      }
    });
    setOperatorList(temp);
  }

  function selectAttribute(id) {
    setAttribute(id);
    setOperator("");
    operatorDropdown.current.resetHeaderTitle();
  }

  return (
    <div className="query-row-container">
      <button
        disabled={disableRemoveRow}
        className="remove-btn"
        onClick={removeQueryRow}
      >
        -
      </button>

      <Dropdown
        title="Attribute"
        list={ATTRIBUTE_LIST}
        resetThenSet={selectAttribute}
        width="238px"
      />

      {operator === "contains" ||
      operator === "starts_with" ||
      !operator ||
      !attribute ? null : (
        <div className="is-and-div">is</div>
      )}

      <Dropdown
        title="Operator"
        list={operatorList}
        resetThenSet={selectOperator}
        width="134px"
        ref={operatorDropdown}
      />

      <input
        type="text"
        value={inputValue}
        onChange={handleInputValueChange}
      ></input>

      {operator === "BETWEEN" ? (
        <>
          <div className="is-and-div">and</div>
          <input
            type="text"
            value={betweenInputTwoValue}
            onChange={handleBetweenInputTwoValueChange}
          ></input>
        </>
      ) : null}
    </div>
  );
}
