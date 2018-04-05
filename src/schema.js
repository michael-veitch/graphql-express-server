//Axios is a client for making Http 
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//TODO: Move to MongoDB
// const customers = [
//     {
//         id: 1,
//         name: "Leanne Graham",
//         username: "Bret",
//         email: "Sincere@april.biz",
//         address: {
//           street: "Kulas Light",
//           suite: "Apt. 556",
//           city: "Gwenborough",
//           zipcode: "92998-3874",
//           geo: {
//             lat: "-37.3159",
//             lng: "81.1496"
//           }
//         },
//         phone: "1-770-736-8031 x56442",
//         website: "hildegard.org",
//         company: {
//           name: "Romaguera-Crona",
//           catchPhrase: "Multi-layered client-server neural-net",
//           bs: "harness real-time e-markets"
//         }
//       }
// ]



const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: AddressType },
         phone: { type: GraphQLString},
         website: { type: GraphQLString},
         company: { type: CompanyType }
    })
})
const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        street: { type: GraphQLString},
        suite: { type: GraphQLString},
        city: { type: GraphQLString},
        zipcode: { type: GraphQLString},
        geo: { type : GeoType }
    })
})
const GeoType = new GraphQLObjectType({
    name: 'Geo',
    fields: () => ({
        lat: { type: GraphQLString},
        long: { type: GraphQLString}
    })
})
const CompanyType = new GraphQLObjectType({
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
        //Single Customer by ID
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args){
                // for(let i = 0; i < customers.length; customers++){
                //     if(customers[i].id == args.id){
                //         return customers[i]
                //     }
                // }
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data)
            }
        },
        //All Customers
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