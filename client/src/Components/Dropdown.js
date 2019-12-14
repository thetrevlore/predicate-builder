// Dropdown component modifed from https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components/blob/master/src/components/Dropdown.js

import React, { Component } from "react";
import "../Styles/dropdown.css";
import downArrow from "../down-arrow.svg";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener("click", this.close);
      } else {
        window.removeEventListener("click", this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.close);
  }

  close(timeOut) {
    this.setState({ listOpen: false });
  }

  selectItem(title, id) {
    this.setState(
      {
        headerTitle: title,
        listOpen: false
      },
      this.props.resetThenSet(id)
    );
  }

  toggleList = () => {
    this.setState(prevState => ({ listOpen: !prevState.listOpen }));
  };

  resetHeaderTitle = () => {
    this.setState({ headerTitle: this.props.title });
  };

  render() {
    const { list, width } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className="dd-wrapper" style={{ width: width }}>
        <div
          className={`dd-header ${listOpen ? "white" : ""}`}
          onClick={this.toggleList}
        >
          <div className="dd-header-title">{headerTitle}</div>
          <img
            src={downArrow}
            alt="down-arrow"
            className={listOpen ? "rotate-up" : ""}
          ></img>
        </div>
        <ul
          className={`dd-list ${listOpen ? "dropdown-animate" : ""}`}
          onClick={e => e.stopPropagation()}
        >
          {list.map(item => (
            <li
              className="dd-list-item"
              key={item.id}
              onClick={() => this.selectItem(item.title, item.id, item.key)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
