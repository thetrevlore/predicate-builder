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

export {
  STRING_ATTRIBUTES,
  INTEGER_ATTRIBUTES,
  STRING_OPERATORS,
  INTEGER_OPERATORS,
  ATTRIBUTE_LIST
};
