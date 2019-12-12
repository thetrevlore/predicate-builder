import React, { useEffect, useMemo, useState } from 'react';
import './query-row.css';
import downArrow from './down-arrow.svg';

const STRING_ATTRIBUTES = [
  'user_email',
  'user_first_name',
  'user_last_name',
  'domain',
  'path'
];

const INTEGER_ATTRIBUTES = [
  'screen_width', 
  'screen_height',
  'visits',
  'page_response'
];

const isString = (attribute) => {
  return STRING_ATTRIBUTES.includes(attribute);
}

const isInteger = (attribute) => {
  return INTEGER_ATTRIBUTES.includes(attribute);
}

function QueryRow ({ setQueryRows, queryRows, removeRow, id, disableRemoveRow }) {
  const [attribute, setAttribute] = useState('visits');
  const [operator, setOperator] = useState('=');
  const [inputValue, setInputValue] = useState('');
  const [betweenInputTwoValue, setBetweenInputTwoValue] = useState('');
  const isAttributeString = useMemo(() => isString(attribute), [attribute]);
  const isAttributeInteger = useMemo(() => isInteger(attribute), [attribute]);

  useEffect(() => {
    const editQueryRow = () => {
      let userInput = `${inputValue}`;
      if (isAttributeInteger) {
        userInput = Number(userInput);
      }
      let sqlOperator = operator;
  
      if (sqlOperator === 'contains') {
        sqlOperator = 'LIKE';
        userInput = `'%${inputValue}%'`;
      } else if (sqlOperator === 'starts_with') {
        sqlOperator = 'LIKE';
        userInput = `'${inputValue}%'`;
      } else if (sqlOperator === 'BETWEEN') {
        userInput = `${inputValue} AND ${betweenInputTwoValue}`;
      } else if (sqlOperator === 'IN') {
        let values = inputValue.split(',').map(value => `'${value.trim()}'`);
        userInput = `(${values.join(', ')})`;
      }
  
      const row = {
        id,
        attribute,
        operator: sqlOperator,
        userInput
      }

      const editRow = ({ id, attribute, operator, userInput }) => {
        let rows = [...queryRows];
        for (let i = 0; i < rows.length; i++) {
          let queryRow = queryRows[i];
          if (queryRow.id === id) {
            queryRow.attribute = attribute;
            queryRow.operator = operator;
            queryRow.userInput = userInput;
          }
        }
        setQueryRows(rows);
      }
  
      editRow(row);
    }

    editQueryRow();
  }, [attribute, operator, inputValue, betweenInputTwoValue, id, isAttributeInteger])

  const removeQueryRow = () => {
    removeRow(id);
  }

  // const selectAttribute = (e) => {
  //   setAttribute(e.target.value);
  // }

  // const selectOperator = (e) => {
  //   setOperator(e.target.value);
  // }

  // const handleInputValueChange = (e) => {
  //   this.setState({ inputValue: e.target.value });
  // }

  // const handleBetweenInputTwoValueChange = (e) => {
  //   this.setState({ betweenInputTwoValue: e.target.value });
  // }



  const renderOperatorSelect = () => {
    if (isAttributeString) {
      return (
        <select className="operator" value={operator} onChange={e => setOperator(e.target.value)}>
          <option value="=">equal to</option>
          <option value="contains">contains</option>
          <option value="starts_with">starts with</option>
          <option value="IN">in list</option>
        </select>
      );
    } else if (isAttributeInteger) {
      return (
        <select className="operator" value={operator} onChange={e => setOperator(e.target.value)}>
          <option value="=">equal to</option>
          <option value="BETWEEN">between</option>
          <option value=">">greater than</option>
          <option value="<">less than</option>
          <option value="IN">in list</option>
        </select>
      ); 
    }
  }

  return (
    <div className="query-row-container">
      <button disabled={disableRemoveRow} className="remove-btn" onClick={removeQueryRow}>-</button>

      <div className="custom-select attribute">
        <select value={attribute} onChange={e => setAttribute(e.target.value)}>
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
      </div>

      {operator === 'contains' || operator === 'starts_with' ? null : <div className="is-and-div">is</div>}

      <div className="custom-select">
        {renderOperatorSelect()}
        <img src={downArrow} alt="down-arrow"></img>
      </div>

      <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}></input>

      {operator === 'BETWEEN' ? <div className="is-and-div">and</div> : null}

      {operator === 'BETWEEN' ? <input type="text" value={betweenInputTwoValue} onChange={e => setBetweenInputTwoValue(e.target.value)}></input> : null}
    </div>
  );
}

export default QueryRow;

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
