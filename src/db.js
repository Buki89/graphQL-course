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
  { id: "102", text: "hello world", author: "3", post: "10" },
  { id: "103", text: "the best", author: "1", post: "10" },
  { id: "104", text: "thank you", author: "2", post: "11" },
  { id: "105", text: "best regards", author: "1", post: "12" },
];

const db = { users, posts, comments };

export { db as default };
