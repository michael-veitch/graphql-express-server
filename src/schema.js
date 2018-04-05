const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const customers = [
    {
        id: '1',
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        age: 35
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jsmith@gmail.com',
        age: 35
    },{
        id: '3',
        name: 'Bob Flannigan',
        email: 'bflan@gmail.com',
        age: 35
    },{
        id: '4',
        name: 'Chantel El\'hefe',
        email: 'boss@gmail.com',
        age: 35
    },
]

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; customers++){
                    if(customers[i].id == args.id){
                        return customers[i]
                    }
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});