import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID,

// Type definitions (schema)
const typeDefs = `
    type Query {
        grades: [Int!]!
        greeting(name:String, position: String!): String!
        add(numbers: [Float!]!): Float!
        me: User!
        post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id:ID!
      title:String!
      body:String!
      published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    grades(parent, args, ctx, info) {
      return [99, 80, 54];
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    greeting(parent, args) {
      if (args.name && args.position) {
        return `Hello ${args.name}! You are my favorite ${args.position}.`;
      } else {
        return "Hello!";
      }
    },
    me() {
      return {
        id: "123",
        name: "Mike",
        email: "123@g.com",
        age: 35,
      };
    },
    post() {
      return {
        id: "adsada",
        title: "something",
        body: "news about something",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("the server is up");
});
