//Axios is a client for making Http 
const axios = require('axios');

//GraphQL DataType Imports
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Custom Data Types
const GraphQLCustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLAddressType },
         phone: { type: GraphQLString},
         website: { type: GraphQLString},
         company: { type: GraphQLCompanyType }
    })
})
const GraphQLAddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        street: { type: GraphQLString},
        suite: { type: GraphQLString},
        city: { type: GraphQLString},
        zipcode: { type: GraphQLString},
        geo: { type : GraphQLGeoType }
    })
})
const GraphQLGeoType = new GraphQLObjectType({
    name: 'Geo',
    fields: () => ({
        lat: { type: GraphQLString},
        long: { type: GraphQLString}
    })
})
const GraphQLCompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        name: { type: GraphQLString},
        catchPhrase: { type: GraphQLString},
        bs: { type: GraphQLString}
    })
})



// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {        
        //All Customers
        customers: {
            type: new GraphQLList(GraphQLCustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers')
                    .then(res => res.data)
            }
        },
        //Single Customer by ID
        customer: {
            type: GraphQLCustomerType,                 //Response Type
            args: { 
                id: { type: GraphQLString }     //Input Param and Type
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});