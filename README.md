# js-back-end

## Request, asynchronná funkcia

Request je požiadavka na server pomocou url alebo cesty k suboru na základe požiadavky.

Asynchronná funkcia je funkcia ktorá je volaná a čaká sa na jej výsledok, ktorý nie je stanovený rovnako. napr. `setTimeout()`

Počkať na výsledok asynchronnej funkcie vieme troma sposobmi:

- `callback`
- `new promise`
- `async await`

V tomto príklade `getPosts()` volaná funkcia vráti pole bez doplneného nového prvku v poli<br>

```js
const posts = [
  { title: "Post one", body: "this is post one" },
  { title: "Post two", body: "this is post two" },
];
const createPosts = (post) => {
  setTimeout(() => {
    posts.push(post);
  }, 2000);
};
const getPosts = () => {
  setTimeout(() => {
    let output = "";
    posts.forEach((post) => {
      output += `<div>${post.title}</div>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};
createPosts({ title: "Post tree", body: "this is post tree" });
getPosts();
```

1. `Callback` je funkcia, ktorá sa ma zavolať po dokončení inej funkcie. Pomocou callbacku vieme zabespečiť vrátenie všetkých troch prvkov z poľa aj novým prvkom

```js
// druhy parameter je callback
const createPosts = (post, callback) => {
  setTimeout(() => {
    posts.push(post);
    callback(); // volany callaback
  }, 5000);
};
const getPosts = () => {
  setTimeout(() => {
    let output = "";
    posts.forEach((post) => {
      output += `<div>${post.title}</div>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};
// getPosts() ako callback
createPosts({ title: "Post tree", body: "this is post tree" }, getPosts);
```
