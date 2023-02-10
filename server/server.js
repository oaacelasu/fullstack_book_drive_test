const fs = require('fs')
const {ApolloServer, gql} = require('apollo-server-express');
const userModel = require('./models/user');


// GraphQL
let typeDefs = fs.readFileSync(`${__dirname}/schema.graphql`, 'utf8');
typeDefs = gql(typeDefs);

const {GraphQLScalarType} = require('graphql');
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

const {mongo_string_connection, session_secret} = require('./config/default.json');


// Mongoose
const init = require('./config/db_manager');

const resolvers = {
    Query: {
        employeeList(parent, args, contextValue, info) {
            console.log("hola");
            console.log(args);

            return employeeList(args);
        },
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
const port = 3002;
app.use(express.static('public'));

// Session
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


// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Routes
const router = require('./routes/routes.js');
app.use('/', router);

init().then(r => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    }
).catch(e => {
    console.log(e);
});

const graphQlPort = 4002;
server.start().then(() => {
    server.applyMiddleware({app, path: '/graphql'});
    app.listen({port: graphQlPort}, () =>
        console.log(`🚀 Server ready at http://localhost:${graphQlPort}${server.graphqlPath}`));
});
async function employeeList(args){
    const {
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType

    } = args;

    var query = {};
    if (firstName) {
        query.firstName = firstName;
    }

    if (lastName) {
        query.lastName = lastName;
    }

    if (age) {
        query.age = age;
    }

    if (dateOfJoining) {
        query.dateOfJoining = dateOfJoining;
    }

    if (title) {
        query.title = title;
    }

    if (department) {
        query.department = department;
    }

    if (employeeType) {
        query.employeeType = employeeType;
    }

    return await userModel.find(query);
}

async function employeeAdd(_, {employee}) {
    const newEmployee = {...employee};
    await userModel.create(newEmployee, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            console.log("User Created Successfully as:" + user);
        }
    });
    return newEmployee;
}