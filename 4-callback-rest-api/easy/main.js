// // bezne volanie funkcie za sebou
// function first() {
//   console.log(1);
// }
// function second() {
//   console.log(2);
// }
// first();
// second();

// // asynchrone volanie so synchronnym
// function first() {
//   setTimeout(() => {
//     console.log(1);
//   }, 1000);
// }

// function second() {
//   console.log(2);
// }
// first();
// second();

// // callback
// function first(callback) {
//   setTimeout(() => {
//     console.log(1);
//     callback();
//   }, 1000);
// }

// function second() {
//   console.log(2);
// }

// first(second);

// // callback priklad
// const doHomeWork = (subject, volam) => {
//   alert(`Starting my ${subject} homework.`);
//   volam();
// };

// doHomeWork("Math", () => {
//   alert("Finished my homework");
// });

const posts = [
  { title: "Post one", body: "this is post one" },
  { title: "Post two", body: "this is post two" },
];

// const createPosts = post => {
//   setTimeout(() => {
//     posts.push(post);
//   }, 2000);
// };

// createPosts({ title: "Post tree", body: "this is post tree" });

// const getPosts = () => {
//   setTimeout(() => {
//     let output = "";
//     posts.forEach(post => {
//       output += `<div>${post.title}</div>`;
//     });
//     document.body.innerHTML = output;
//   }, 1000);
// };

// getPosts();

const createPosts = (post, callback) => {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 3000);
};

const getPosts = () => {
  setTimeout(() => {
    let output = "";
    posts.forEach(post => {
      output += `<div>${post.title}</div>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};

createPosts({ title: "Post tree", body: "this is post tree" }, getPosts);
