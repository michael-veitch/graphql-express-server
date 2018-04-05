const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))


app.listen(4200, () => {
    console.log('Example app listening on port 4200!');
});   
