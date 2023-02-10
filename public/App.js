{
  /* src/App.jsx */
}
{/*
    Author: Oscar Acelas
    Student ID: 8804062
    Date: 2023-01-21
    Description: This is the main entry point for the application - EMS (Employee Management System) - Assignment 1
 */
}
const GET_EMPLOYEES = data => `query {
                          employeeList(employeeType: ${data.employeeType}, department: ${data.department}, title: ${data.title}) {
                            title
                            lastName
                            firstName
                            id
                            employeeType
                            department
                            dateOfJoining
                            age
                          }
                        }`;
const NEW_EMPLOYEE = data => `mutation {
                            employeeAdd(employee:{ 
                            firstName: "${data.firstName}",
                            lastName: "${data.lastName}",
                            age: ${data.age}
                            employeeType: ${data.employeeType},
                            department: ${data.department},
                            title: ${data.title},
                            dateOfJoining: "${data.dateOfJoining.toISOString()}"
                            }) {
                            id
                        } }`;
class AppHeader extends React.Component {
  getActions() {
    console.log(this.props.currentRoute);
    if (this.props.currentRoute === 'dashboard') {
      return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: () => this.props.onActionClicked("search"),
        role: "button"
      }, "Search")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: () => this.props.onActionClicked("create"),
        role: "button"
      }, "Create")));
    } else {
      return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: () => this.props.onActionClicked("dashboard"),
        role: "button"
      }, "Dashboard")));
    }
  }
  render() {
    return /*#__PURE__*/React.createElement("header", {
      className: "container"
    }, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        marginTop: "15px"
      }
    }, "EMS Manager"), this.getActions()));
  }
}
class AppError extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("h3", null, "Error"), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "Something went wrong"), /*#__PURE__*/React.createElement("p", null, this.props.error.message)));
  }
}
class AppLoader extends React.Component {
  render() {
    if (!this.props.isLoading) {
      //return dive with the same size as the progress bar
      return /*#__PURE__*/React.createElement("div", {
        style: {
          height: "30px"
        }
      });
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("progress", null));
  }
}
class EmployeeTable extends React.Component {
  getPrettyDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString();
  }
  getPrettyId(id) {
    return id.substring(0, 8);
  }
  render() {
    return /*#__PURE__*/React.createElement("main", {
      className: "container"
    }, /*#__PURE__*/React.createElement("section", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("h3", null, "Employee Directory"), /*#__PURE__*/React.createElement("table", {
      role: "grid"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Id"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "First Name"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Last Name"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Employee Type"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Department"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Title"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Date of Joining"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Age"))), /*#__PURE__*/React.createElement("tbody", null, this.props.employees.map(employee => /*#__PURE__*/React.createElement("tr", {
      key: employee.id
    }, /*#__PURE__*/React.createElement("th", {
      scope: "row",
      "data-tooltip": employee.id
    }, this.getPrettyId(employee.id)), /*#__PURE__*/React.createElement("td", null, employee.firstName), /*#__PURE__*/React.createElement("td", null, employee.lastName), /*#__PURE__*/React.createElement("td", null, employee.employeeType), /*#__PURE__*/React.createElement("td", null, employee.department), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, this.getPrettyDate(employee.dateOfJoining)), /*#__PURE__*/React.createElement("td", null, employee.age))))))));
  }
}
class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmployeeType = this.handleChangeEmployeeType.bind(this);
    this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.state = {
      filters: this.props.filters
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    let filters = {
      department: null,
      title: null,
      employeeType: null
    };
    if (data.employeeType !== "") {
      filters.employeeType = data.employeeType;
    }
    if (data.department !== "") {
      filters.department = data.department;
    }
    if (data.title !== "") {
      filters.title = data.title;
    }
    this.props.onSubmit(filters);
  }
  handleChangeEmployeeType(event) {
    this.setState({
      filters: {
        ...this.state.filters,
        employeeType: event.target.value
      }
    });
  }
  handleChangeDepartment(event) {
    this.setState({
      filters: {
        ...this.state.filters,
        department: event.target.value
      }
    });
  }
  handleChangeTitle(event) {
    this.setState({
      filters: {
        ...this.state.filters,
        title: event.target.value
      }
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("section", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("h3", null, "Search"), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "employeeType"
    }, "Employee Type"), /*#__PURE__*/React.createElement("select", {
      id: "employeeType",
      name: "employeeType",
      className: "form-control",
      value: this.state.filters.employeeType ?? "",
      onChange: this.handleChangeEmployeeType
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "All"), /*#__PURE__*/React.createElement("option", {
      value: "FULL_TIME"
    }, "Full Time"), /*#__PURE__*/React.createElement("option", {
      value: "PART_TIME"
    }, "Part Time"), /*#__PURE__*/React.createElement("option", {
      value: "CONTRACT"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "SEASONAL"
    }, "Seasonal"))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "department"
    }, "Department"), /*#__PURE__*/React.createElement("select", {
      id: "department",
      name: "department",
      className: "form-control",
      value: this.state.filters.department ?? "",
      onChange: this.handleChangeDepartment
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "All"), /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Finance"
    }, "Finance"), /*#__PURE__*/React.createElement("option", {
      value: "Sales"
    }, "Sales"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "title"
    }, "Title"), /*#__PURE__*/React.createElement("select", {
      id: "title",
      name: "title",
      className: "form-control",
      value: this.state.filters.title ?? "",
      onChange: this.handleChangeTitle
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "All"), /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP"))), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary"
    }, "Search")))));
  }
}
class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: []
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const errors = [];

    //validate first name is at least 2 characters long
    if (data.firstName.length < 2) {
      errors.push({
        message: "First name must be at least 2 characters long"
      });
    }

    //validate last name is at least 2 characters long
    if (data.lastName.length < 2) {
      errors.push({
        message: "Last name must be at least 2 characters long"
      });
    }

    //validate age is selected
    if (data.age === "") {
      errors.push({
        message: "Age must be selected"
      });
    }

    //validate age is numeric
    if (isNaN(parseInt(data.age))) {
      errors.push({
        message: "Age must be numeric"
      });
    }

    //validate age is between 20 and 70
    if (parseInt(data.age) < 20 || parseInt(data.age) > 70) {
      errors.push({
        message: "Age must be between 20 and 70"
      });
    }
    if (data.employeeType === "") {
      errors.push({
        message: "Employee type must be selected"
      });
    }

    //validate department is selected
    if (data.department === "") {
      errors.push({
        message: "Department must be selected"
      });
    }

    //validate date of joining is selected
    if (data.dateOfJoining === "") {
      errors.push({
        message: "Date of joining must be selected"
      });
    }
    if (errors.length > 0) {
      this.setState({
        errors: errors
      });
      return;
    }
    const employee = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      employeeType: data.employeeType,
      department: data.department,
      title: data.title,
      dateOfJoining: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
    };
    this.props.onSubmit(employee);
  }
  render() {
    if (this.state.errors.length > 0) {
      return /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("h3", null, "Error"), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "Review the following errors"), /*#__PURE__*/React.createElement("ul", null, this.state.errors.map(error => /*#__PURE__*/React.createElement("li", null, error.message)))), /*#__PURE__*/React.createElement("button", {
        onClick: () => this.setState({
          errors: []
        })
      }, "Review"));
    }
    return /*#__PURE__*/React.createElement("main", {
      className: "container"
    }, /*#__PURE__*/React.createElement("section", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("h3", null, "Create Employee"), /*#__PURE__*/React.createElement("form", {
      className: "form",
      action: "",
      onSubmit: this.handleSubmit,
      method: "post",
      id: "insert_form"
    }, /*#__PURE__*/React.createElement("p", null, "Enter new employee details"), /*#__PURE__*/React.createElement("div", {
      className: "grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "firstName",
      className: "placeholder"
    }, "First Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "input",
      id: "firstName",
      name: "firstName",
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "lastName",
      className: "placeholder"
    }, "Last Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "input",
      id: "lastName",
      name: "lastName",
      required: true
    }))), /*#__PURE__*/React.createElement("div", {
      className: "grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "age",
      className: "placeholder"
    }, "Age"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "input",
      id: "age",
      name: "age",
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "employeeType",
      className: "placeholder"
    }, "Employee Type"), /*#__PURE__*/React.createElement("select", {
      className: "input",
      id: "employeeType",
      name: "employeeType",
      defaultValue: '',
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true
    }, "Select..."), /*#__PURE__*/React.createElement("option", {
      value: "FULL_TIME"
    }, "Full Time"), /*#__PURE__*/React.createElement("option", {
      value: "PART_TIME"
    }, "Part Time"), /*#__PURE__*/React.createElement("option", {
      value: "CONTRACT"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "SEASONAL"
    }, "Seasonal")))), /*#__PURE__*/React.createElement("div", {
      className: "grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "department",
      className: "placeholder"
    }, "Department"), /*#__PURE__*/React.createElement("select", {
      className: "input",
      id: "department",
      name: "department",
      defaultValue: '',
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true
    }, "Select..."), /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Finance"
    }, "Finance"), /*#__PURE__*/React.createElement("option", {
      value: "Sales"
    }, "Sales"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "title",
      className: "placeholder"
    }, "Title"), /*#__PURE__*/React.createElement("select", {
      className: "input",
      id: "title",
      name: "title",
      defaultValue: '',
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true
    }, "Select..."), /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP")))), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "submit"
    }, "Submit")))));
  }
}
class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.createEmployee = this.createEmployee.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.applySearch = this.applySearch.bind(this);
    this.state = {
      employees: [],
      loading: true,
      error: null,
      route: "dashboard",
      filters: {
        department: null,
        title: null,
        employeeType: null
      }
    };
  }
  fetchEmployees() {
    this.setState({
      employees: [],
      loading: true,
      error: null,
      route: "dashboard"
    });
    let query = GET_EMPLOYEES(this.state.filters);
    console.log("EmployeeDirectory fetchEmployees query: " + query);
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    }).then(response => response.json()).then(result => {
      this.setState({
        employees: result.data.employeeList,
        loading: false
      });
    }).catch(error => {
      this.setState({
        error,
        loading: false
      });
    });
  }
  componentDidMount() {
    console.log("EmployeeDirectory componentDidMount");
    this.fetchEmployees();
  }
  buildMain() {
    if (this.state.route === "dashboard") {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", null, this.state.filters.department && /*#__PURE__*/React.createElement("li", null, "Department: ", this.state.filters.department), this.state.filters.title && /*#__PURE__*/React.createElement("li", null, "Title: ", this.state.filters.title), this.state.filters.employeeType && /*#__PURE__*/React.createElement("li", null, "Employee Type: ", this.state.filters.employeeType)), /*#__PURE__*/React.createElement(EmployeeTable, {
        employees: this.state.employees
      }));
    } else if (this.state.route === "create") {
      return /*#__PURE__*/React.createElement(EmployeeForm, {
        onSubmit: this.createEmployee
      });
    } else if (this.state.route === "search") {
      return /*#__PURE__*/React.createElement(EmployeeSearch, {
        onSubmit: this.applySearch,
        filters: this.state.filters
      });
    }
  }
  handleNavClick(route) {
    console.log("handleNavClick");
    if (route === "create") {
      this.setState({
        route: "create"
      });
    } else if (route === "dashboard") {
      this.setState({
        route: "dashboard"
      });
      this.componentDidMount();
    } else if (route === "search") {
      this.setState({
        route: "search"
      });
    }
  }
  applySearch(search) {
    this.setState({
      loading: true,
      filters: search
    });
    setTimeout(() => {
      this.componentDidMount();
    }, 1000);
  }
  createEmployee(employee) {
    console.log("createEmployee");
    this.setState({
      loading: true,
      error: null
    });
    const query = NEW_EMPLOYEE(employee);
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(response => response.json()).then(result => {
      console.log(result);
      this.componentDidMount();
    }).catch(error => {
      this.setState({
        error,
        loading: false
      });
    });
  }
  render() {
    const {
      error,
      loading
    } = this.state;
    if (error) {
      return /*#__PURE__*/React.createElement(AppError, {
        error: error
      });
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement(AppLoader, {
        isLoading: loading
      }), /*#__PURE__*/React.createElement(AppHeader, {
        currentRoute: this.state.route,
        onActionClicked: this.handleNavClick.bind(this)
      }), this.buildMain());
    }
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(EmployeeDirectory, null)), document.getElementById('root'));