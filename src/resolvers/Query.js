const Query = {
  comments(parent, args, { db }, info) {
    return db.comments;
  },

  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter((post) => {
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
};

export { Query as default };
