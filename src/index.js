import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/dist/v4";

//Scalar types - String, Boolean, Int, Float, ID,

// Demo user data

const users = [
  {
    id: "1",
    name: "Ondrej",
    email: "buk@gmail.com",
    age: 31,
  },
  {
    id: "2",
    name: "Sara",
    email: "sara@example.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
  },
];

const posts = [
  {
    id: "10",
    title: "corona",
    body: "new cases",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "Beirut",
    body: "massive explosion",
    published: false,
    author: "1",
  },
  {
    id: "12",
    title: "red sky in Oregon",
    body: "sky in Oregon turn in to red after huge fire",
    published: true,
    author: "2",
  },
];

const comments = [
  { id: "23", text: "hello world", author: "1", post: "10" },
  { id: "45", text: "the best", author: "2", post: "10" },
  { id: "44", text: "thank you", author: "3", post: "11" },
  { id: "60", text: "best regards", author: "3", post: "12" },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        comments: [Comment!]!
        users(query:String): [User!]!
        posts(query:String): [Post!]!
        me: User!
        post: Post!
    }

    type Mutation {
      createUser(name:String!,email:String!,age:Int):User!
      createPost(title:String!,body:String!,published:Boolean!,author:ID!):Post!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id:ID!
      title:String!
      body:String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }


`;

// Resolvers
const resolvers = {
  Query: {
    comments(parent, args, ctx, info) {
      return comments;
    },

    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => args.email === user.email);

      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);

      if (!userExists) {
        throw new Error("User not found");
      }

      console.log(args);
      console.log(userExists);

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };
      console.log(post.author);

      posts.push(post);

      return post;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
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
