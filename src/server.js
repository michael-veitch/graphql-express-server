//Run 'npm run dev:server for local GraphQL server'
//Run 'npm run json:server for JSON server'
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,     //Indicates which schema to use for this route
    graphiql: true      //Lets you use browser debugger
}))


app.listen(4200, () => {
    console.log('Example app listening on port 4200!');
});   
