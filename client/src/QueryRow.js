import React, { useEffect, useMemo, useState, useRef } from "react";
import "./query-row.css";
import downArrow from "./down-arrow.svg";
import Dropdown from "./Dropdown";

const STRING_ATTRIBUTES = [
  "user_email",
  "user_first_name",
  "user_last_name",
  "domain",
  "path"
];

const INTEGER_ATTRIBUTES = [
  "screen_width",
  "screen_height",
  "visits",
  "page_response"
];

const isString = attribute => {
  return STRING_ATTRIBUTES.includes(attribute);
};

const isInteger = attribute => {
  return INTEGER_ATTRIBUTES.includes(attribute);
};

const INTEGER_OPERATORS = [
  {
    id: "=",
    title: "equal to",
    selected: false
  },
  {
    id: "BETWEEN",
    title: "between",
    selected: false
  },
  {
    id: ">",
    title: "greater than",
    selected: false
  },
  {
    id: "<",
    title: "less than",
    selected: false
  },
  {
    id: "IN",
    title: "in list",
    selected: false
  }
];
const STRING_OPERATORS = [
  {
    id: "=",
    title: "equal to",
    selected: false
  },
  {
    id: "contains",
    title: "contains",
    selected: false
  },
  {
    id: "starts_with",
    title: "starts with",
    selected: false
  },
  {
    id: "IN",
    title: "in list",
    selected: false
  }
];

const ATTRIBUTE_LIST = [
  {
    id: "user_email",
    title: "User Email",
    selected: false
  },
  {
    id: "screen_width",
    title: "Screen Width",
    selected: false
  },
  {
    id: "screen_height",
    title: "Screen Height",
    selected: false
  },
  {
    id: "visits",
    title: "# of Visits",
    selected: false
  },
  {
    id: "user_first_name",
    title: "First Name",
    selected: false
  },
  {
    id: "user_last_name",
    title: "Last Name",
    selected: false
  },
  {
    id: "page_response",
    title: "Page Response Time (ms)",
    selected: false
  },
  {
    id: "domain",
    title: "Domain",
    selected: false
  },
  {
    id: "path",
    title: "Page Path",
    selected: false
  }
];

export default function QueryRow({ editRow, removeRow, id, disableRemoveRow }) {
  const [attribute, setAttribute] = useState("");
  const [operator, setOperator] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [betweenInputTwoValue, setBetweenInputTwoValue] = useState("");
  const [operatorList, setOperatorList] = useState(INTEGER_OPERATORS);
  const isAttributeString = useMemo(() => isString(attribute), [attribute]);
  const isAttributeInteger = useMemo(() => isInteger(attribute), [attribute]);

  useEffect(() => {
    const editQueryRow = () => {
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
    };

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

  const removeQueryRow = () => {
    removeRow(id);
  };

  // const renderOperatorSelect = () => {
  //   if (isAttributeString) {
  //     return (
  //       <select
  //         className="operator"
  //         value={operator}
  //         onChange={e => setOperator(e.target.value)}
  //         onBlur={e => setOperator(e.target.value)}
  //       >
  //         <option value="=">equal to</option>
  //         <option value="contains">contains</option>
  //         <option value="starts_with">starts with</option>
  //         <option value="IN">in list</option>
  //       </select>
  //     );
  //   } else if (isAttributeInteger) {
  //     return (
  //       <select
  //         className="operator"
  //         value={operator}
  //         onChange={e => setOperator(e.target.value)}
  //         onBlur={e => setOperator(e.target.value)}
  //       >
  //         <option value="=">equal to</option>
  //         <option value="BETWEEN">between</option>
  //         <option value=">">greater than</option>
  //         <option value="<">less than</option>
  //         <option value="IN">in list</option>
  //       </select>
  //     );
  //   }
  // };

  const onlyDigitsRegExp = /^\d+$/; // only digits. no negative numbers.
  const handleInputValueChange = e => {
    if (isAttributeInteger && onlyDigitsRegExp.test(Number(e.target.value))) {
      setInputValue(e.target.value.trim());
    } else if (isAttributeString) {
      setInputValue(e.target.value);
    }
  };

  const handleBetweenInputTwoValueChange = e => {
    if (onlyDigitsRegExp.test(Number(e.target.value))) {
      setBetweenInputTwoValue(e.target.value.trim());
    }
  };

  const selectOperator = id => {
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
  };

  const selectAttribute = id => {
    setAttribute(id);
    setOperator("");
    operatorDropdown.current.resetHeaderTitle();
  };

  const operatorDropdown = useRef(null);

  return (
    <div className="query-row-container">
      <button
        disabled={disableRemoveRow}
        className="remove-btn"
        onClick={removeQueryRow}
      >
        -
      </button>

      {/* <div className="custom-select attribute">
        <select
          value={attribute}
          onChange={e => setAttribute(e.target.value)}
          onBlur={e => setAttribute(e.target.value)}
        >
          <option value="user_email">User Email</option>
          <option value="screen_width">Screen Width</option>
          <option value="screen_height">Screen Height</option>
          <option value="visits"># of Visits</option>
          <option value="user_first_name">First Name</option>
          <option value="user_last_name">Last Name</option>
          <option value="page_response">Page Response time (ms)</option>
          <option value="domain">Domain</option>
          <option value="path">Page Path</option>
        </select>
        <img src={downArrow} alt="down-arrow"></img>
      </div> */}
      <Dropdown
        title="Attribute"
        list={ATTRIBUTE_LIST}
        resetThenSet={selectAttribute}
        width="215px"
      />

      {operator === "contains" ||
      operator === "starts_with" ||
      !operator ||
      !attribute ? null : (
        <div className="is-and-div">is</div>
      )}

      {/* <div className="custom-select">
        {renderOperatorSelect()}
        <img src={downArrow} alt="down-arrow"></img>
      </div> */}
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

// import React from 'react';
// import './query-row.css';
// import downArrow from './down-arrow.svg';

// const STRING_ATTRIBUTES = [
//   'user_email',
//   'user_first_name',
//   'user_last_name',
//   'domain',
//   'path'
// ];

// const INTEGER_ATTRIBUTES = [
//   'screen_width',
//   'screen_height',
//   'visits',
//   'page_response'
// ];

// class QueryRow extends React.Component {
//   state = {
//     attribute: 'visits',
//     operator: '=',
//     inputValue: '',
//     betweenInputTwoValue: '',
//   }

//   get isAttributeString() {
//     return STRING_ATTRIBUTES.includes(this.state.attribute);
//   }

//   get isAttributeInteger() {
//     return INTEGER_ATTRIBUTES.includes(this.state.attribute);
//   }

//   componentDidMount() {
//     this.editRow();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.attribute !== this.state.attribute ||
//       prevState.operator !== this.state.operator ||
//       prevState.inputValue !== this.state.inputValue ||
//       prevState.betweenInputTwoValue !== this.state.betweenInputTwoValue
//     ) {
//       this.editRow();
//     }
//   }

//   removeRow = () => {
//     this.props.removeRow(this.props.id);
//   }

//   selectAttribute = (e) => {
//     this.setState({ attribute: e.target.value })
//   }

//   selectOperator = (e) => {
//     this.setState({ operator: e.target.value })
//   }

//   handleInputValueChange = (e) => {
//     this.setState({ inputValue: e.target.value });
//   }

//   handleBetweenInputTwoValueChange = (e) => {
//     this.setState({ betweenInputTwoValue: e.target.value });
//   }

//   editRow = () => {
//     let userInput = `${this.state.inputValue}`;
//     if (!this.isAttributeString) {
//       userInput = Number(userInput);
//     }
//     let operator = this.state.operator;

//     if (this.state.operator === 'contains') {
//       operator = 'LIKE';
//       userInput = `'%${this.state.inputValue}%'`;
//     } else if (this.state.operator === 'starts_with') {
//       operator = 'LIKE';
//       userInput = `'${this.state.inputValue}%'`;
//     } else if (this.state.operator === 'BETWEEN') {
//       userInput = `${this.state.inputValue} AND ${this.state.betweenInputTwoValue}`;
//     } else if (this.state.operator === 'IN') {
//       let values = this.state.inputValue.split(',').map(value => `'${value.trim()}'`);
//       userInput = `(${values.join(', ')})`;
//     }

//     const row = {
//       id: this.props.id,
//       attribute: this.state.attribute,
//       operator,
//       userInput
//     }

//     this.props.editRow(row)
//   }

//   renderOperatorSelect = () => {
//     if (this.isAttributeString) {
//       return (
//         <select className="operator" value={this.state.operator} onChange={this.selectOperator}>
//           <option value="=">equal to</option>
//           <option value="contains">contains</option>
//           <option value="starts_with">starts with</option>
//           <option value="IN">in list</option>
//         </select>
//       );
//     } else if (this.isAttributeInteger) {
//       return (
//         <select className="operator" value={this.state.operator} onChange={this.selectOperator}>
//           <option value="=">equal to</option>
//           <option value="BETWEEN">between</option>
//           <option value=">">greater than</option>
//           <option value="<">less than</option>
//           <option value="IN">in list</option>
//         </select>
//       );
//     }
//   }

//   render() {
//     return (
//       <div className="query-row-container">
//         <button disabled={this.props.disableRemoveRow} className="remove-btn" onClick={this.removeRow}>-</button>

//         <div className="custom-select attribute">
//           <select value={this.state.attribute} onChange={this.selectAttribute}>
//             <option value="user_email">User Email</option>
//             <option value="screen_width">Screen Width</option>
//             <option value="screen_height">Screen Height</option>
//             <option value="visits"># of Visits</option>
//             <option value="user_first_name">First Name</option>
//             <option value="user_last_name">Last Name</option>
//             <option value="page_response">Page Response time (ms)</option>
//             <option value="domain">Domain</option>
//             <option value="path">Page Path</option>
//           </select>
//           <img src={downArrow} alt="down-arrow"></img>
//         </div>

//         {this.state.operator === 'contains' || this.state.operator === 'starts_with' ? null : <div className="is-and-div">is</div>}

//         <div className="custom-select">
//           {this.renderOperatorSelect()}
//           <img src={downArrow} alt="down-arrow"></img>
//         </div>

//         <input type="text" value={this.state.inputValue} onChange={this.handleInputValueChange}></input>

//         {this.state.operator === 'BETWEEN' ? <div className="is-and-div">and</div> : null}

//         {this.state.operator === 'BETWEEN' ? <input type="text" value={this.state.betweenInputTwoValue} onChange={this.handleBetweenInputTwoValueChange}></input> : null}
//       </div>
//     );
//   }
// }

// export default QueryRow;
