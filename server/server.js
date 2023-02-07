const employeesContainer = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        dateOfJoining: '2019-01-01',
        title: 'Employee',
        department: 'IT',
        employeeType: 'FULL_TIME',
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        age: 25,
        dateOfJoining: '2019-01-01',
        title: 'Manager',
        department: 'Sales',
        employeeType: 'FULL_TIME',
    }
]

const fs = require('fs')
const {ApolloServer, gql} = require('apollo-server-express');

//const {mongo_string_connection, session_secret} = require('./config/default.json');



// GraphQL
let typeDefs = fs.readFileSync(`${__dirname}/schema.graphql`, 'utf8');
typeDefs = gql(typeDefs);

const { GraphQLScalarType } = require('graphql');
const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value); // sent to resolvers
    },
    serialize(value) {
        return value.getTime(); // value sent to the client
    },
});

// Session
/*
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: mongo_string_connection,
    collection: "sessions_data"
})
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    store: store
}))
 */



// Mongoose
//const init = require('./config/db_manager');
/*
init().then(r => {
        server.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    }
).catch(e => {
    console.log(e);
});
 */

const resolvers = {
    Query: {
        employeeList: getEmployees,
    },
    Mutation: {
        employeeAdd,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Express
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));


// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Routes
const router = require('./routes/routes.js');
app.use('/', router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


server.start().then(() => {
    server.applyMiddleware({app, path: '/graphql'});
    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
}   );

function getEmployees() {
    return employeesContainer;
}

function employeeAdd(_, { employee }) {
    const id = employeesContainer.length + 1;
    const newEmployee = { id, ...employee };
    employeesContainer.push(newEmployee);
    return newEmployee;
}