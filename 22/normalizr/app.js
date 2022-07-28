import { schema, normalize, denormalize } from "normalizr";
import { inspect } from "util";

const blogpost = {
  id: "1",
  title: "My blog post",
  description: "Short blogpost description",
  content: "Hello world",
  author: {
    id: "1",
    name: "John Doe",
  },
  comments: [
    {
      id: "1",
      author: "Rob",
      content: "Nice post!",
    },
    {
      id: "2",
      author: "Jane",
      content: "I totally agree with you!",
    },
  ],
};

// Definimos un esquema de usuarios (autores y comentadores)
const authorSchema = new schema.Entity("authors");

// Definimos un esquema de comentadores
const commentSchema = new schema.Entity("comments");

// Definimos un esquema de artículos
const postSchema = new schema.Entity("posts", {
  author: authorSchema,
  comments: [commentSchema],
});

const normalizedBlogpost = normalize(blogpost, postSchema);

const denormalizedBlogpost = denormalize(
  normalizedBlogpost.result,
  postSchema,
  normalizedBlogpost.entities
);

const print = (objeto) => {
  console.log("TEST", inspect(objeto, true, 12, true));
};

print(normalizedBlogpost);

console.log(denormalizedBlogpost);

console.log(
  "Size normalize:",
  Buffer.byteLength(JSON.stringify(normalizedBlogpost))
);
console.log("Size denormalized:", Buffer.byteLength(JSON.stringify(blogpost)));
