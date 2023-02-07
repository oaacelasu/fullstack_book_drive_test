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
const GET_EMPLOYEES = `query {
                          employeeList {
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
const NEW_EMPLOYEE = (data) => `mutation {
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
            return <ul>
                <li><a href={"#"} onClick={() => this.props.onActionClicked("create")} role={"button"}>Create</a></li>
            </ul>
        } else {
            return <ul>
                <li><a href={"#"} onClick={() => this.props.onActionClicked("dashboard")} role={"button"}>Dashboard</a>
                </li>
            </ul>
        }
    }

    render() {
        return <header className="container">
            <nav>
                <h1 style={{marginTop: "15px"}}>EMS Manager</h1>
                {this.getActions()}
            </nav>
        </header>;
    }
}
class AppError extends React.Component {
    render() {
        return <div className={"container"}>
            <h3>Error</h3>
            <article>
                <h4>Something went wrong</h4>
                <p>{this.props.error.message}</p>
            </article>
        </div>;
    }
}
class AppLoader extends React.Component {
    render() {
        if (!this.props.isLoading) {
            //return dive with the same size as the progress bar
            return <div style={{height: "30px"}}></div>;
        }

        return <div>
            <progress></progress>
        </div>;
    }
}

class EmployeeTable extends React.Component {
    render() {
        return <main className="container">
            <section className="row">
                <div className="col-md-12">
                    <h3>Employee Directory</h3>
                    <table role="grid">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Employee Type</th>
                            <th scope="col">Department</th>
                            <th scope="col">Date of Joining</th>
                            <th scope="col">Age</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.employees.map(employee =>
                                <tr key={employee.id}>
                                    <th scope="row">{employee.id}</th>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.employeeType}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.dateOfJoining}</td>
                                    <td>{employee.age}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </section>
        </main>;
    }
}



class EmployeeForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            errors: []
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const errors = [];

        //validate first name is at least 2 characters long
        if (data.firstName.length < 2) {
            errors.push({message: "First name must be at least 2 characters long"});
        }

        //validate last name is at least 2 characters long
        if (data.lastName.length < 2) {
            errors.push({message: "Last name must be at least 2 characters long"});
        }

        //validate age is selected
        if (data.age === "") {
            errors.push({message: "Age must be selected"});
        }

        //validate age is numeric
        if (isNaN(parseInt(data.age))) {
            errors.push({message: "Age must be numeric"});
        }

        //validate age is between 20 and 70
        if (parseInt(data.age) < 20 || parseInt(data.age) > 70) {
            errors.push({message: "Age must be between 20 and 70"});
        }

        if (data.employeeType === "") {
            errors.push({message: "Employee type must be selected"});
        }

        //validate department is selected
        if (data.department === "") {
            errors.push({message: "Department must be selected"});
        }

        //validate date of joining is selected
        if (data.dateOfJoining === "") {
            errors.push({message: "Date of joining must be selected"});
        }

        if (errors.length > 0) {
            this.setState({errors: errors});
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
        }

        this.props.onSubmit(employee);
    }

    render() {
        if (this.state.errors.length > 0) {
            return <div className={"container"}>
                <h3>Error</h3>
                <article>
                    <h4>Review the following errors</h4>
                    <ul>
                        {this.state.errors.map(error => <li>{error.message}</li>)}
                    </ul>
                </article>
                <button onClick={() => this.setState({errors: []})}>Review</button>
            </div>;
        }


        return <main className="container">
            <section className="row">
                <div className="col-md-12">
                    <h3>Create Employee</h3>
                    <form className="form" action="" onSubmit={this.handleSubmit} method="post" id="insert_form">
                        <p>Enter new employee details</p>
                        <div className="grid">
                            <div>
                                <label htmlFor="firstName" className="placeholder">First Name</label>
                                <input type="text" className="input" id="firstName" name="firstName" required/>

                            </div>
                            <div>
                                <label htmlFor="lastName" className="placeholder">Last Name</label>
                                <input type="text" className="input" id="lastName" name="lastName" required/>
                            </div>
                        </div>

                        <div className="grid">
                            <div>
                                <label htmlFor="age" className="placeholder">Age</label>
                                <input type="text" className="input" id="age" name="age" required/>
                            </div>

                            <div>
                                <label htmlFor="employeeType" className="placeholder">Employee Type</label>
                                <select className="input" id='employeeType' name='employeeType' defaultValue={''}
                                        required>
                                    <option value="" disabled>Select...</option>
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="CONTRACT">Contract</option>
                                    <option value="INTERN">Intern</option>
                                </select>
                            </div>

                        </div>

                        <div className="grid">
                            <div>
                                <label htmlFor="department" className="placeholder">Department</label>
                                <select className="input" id='department' name='department' defaultValue={''} required>
                                    <option value="" disabled>Select...</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="title" className="placeholder">Title</label>
                                <select className="input" id='title' name='title' defaultValue={''} required>
                                    <option value="" disabled>Select...</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Director">Director</option>
                                    <option value="VP">VP</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="submit">Submit</button>
                    </form>
                </div>
            </section>
        </main>;
    }
}

class EmployeeDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.createEmployee = this.createEmployee.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);


        this.state = {
            employees: [],
            loading: true,
            error: null,
            route: "dashboard"
        };
    }

    fetchEmployees() {
        this.setState({
            employees: [],
            loading: true,
            error: null,
            route: "dashboard"
        })
        return fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: GET_EMPLOYEES})
        }).then(response => response.json()).then(result => {
            this.setState({
                employees: result.data.employeeList,
                loading: false
            })
        }).catch(error => {
            this.setState({
                error,
                loading: false
            })
        })
    }

    componentDidMount() {
        console.log("EmployeeDirectory componentDidMount");
        this.fetchEmployees()
    }

    buildMain() {
        if (this.state.route === "dashboard") {
            return <EmployeeTable employees={this.state.employees}/>;
        } else {
            return <EmployeeForm onSubmit={this.createEmployee}/>;
        }
    }

    handleNavClick(route) {
        console.log("handleNavClick");
        if (route === "create") {
            this.setState({route: "create"});
        } else if (route === "dashboard") {
            this.setState({route: "dashboard"});
            this.componentDidMount();
        }
    }

    createEmployee(employee) {
        console.log("createEmployee");
        this.setState({
            loading: true,
            error: null
        })
        const query = NEW_EMPLOYEE(employee);

        fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        }).then(response => response.json()).then(result => {
            console.log(result);
            this.componentDidMount();
        }).catch(error => {
            this.setState({
                error,
                loading: false
            })
        });
    }

    render() {
        const {error, loading} = this.state;
        if (error) {
            return <AppError error={error}/>;
        } else {
            return (
                <div className={"container"}>
                    <AppLoader isLoading={loading}/>
                    <AppHeader currentRoute={this.state.route} onActionClicked={this.handleNavClick.bind(this)}/>
                    {this.buildMain()}
                </div>
            );
        }
    }
}

ReactDOM.render(
    <React.StrictMode>
        <EmployeeDirectory/>
    </React.StrictMode>
    , document.getElementById('root'));