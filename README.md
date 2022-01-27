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
const createPosts = post => {
  setTimeout(() => {
    posts.push(post);
  }, 2000);
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
    posts.forEach(post => {
      output += `<div>${post.title}</div>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};
// getPosts() ako callback
createPosts({ title: "Post tree", body: "this is post tree" }, getPosts);
```

Objekt na tvorbu requestov `XMLHttpRequest()`

- používa sa na preposielanie dát medzi webovým serverom na pozadí stránky
- možná aktualizácia stránky bez jej refreshu
- má podporu skoro u všetkých prehliadačov

Inštálácia tohto objektu:

```js
const xhr = new XMLHttpRequest();
```

Metódy vrámci requestov, ktoré môžem vykonať sú:

- `GET` slúži na sťahovanie dát z danáho serveru
- `POST` na vytvaranie dát do serveru
- `PUT` na prepisovanie viacerých dát v servery
- `DELETE` na zmazanie dat zo serveru
- `PATCH` na prepísanie určitej zložky v dátach v servery

Vytvorenie requestu:

```js
// xhr.open(METODA, url alebo cesta k súboru, asynchronne volanie alebo nie);
xhr.open("GET", "data.txt", true);
```

Jeho zaslanie:

```js
xhr.send();
```

Zachytanie priebehu volania requestu:

```js
xhr.onprogress = function () {
  console.log("READYSTATE", xhr.readyState);
};
```

Po správnom zaslaní requestu a prijatí správneho responsu sa takto zachytia dáta:

```js
xhr.onload = function () {
  console.log("READYSTATE", xhr.readyState);
  if (this.status === 200) {
    document.getElementById("output").innerHTML = `<h1>${this.responseText}</h1>`;
  }
};
```

Zachytanie erroru po nesprávnom requeste:

```js
xhr.onerror = function () {
  console.log("READYSTATE", xhr.readyState);
  console.log("Request error...");
};
```

**xhr vlastnosti pri volaní: **

- `xhr.readyState` vracia akutálny stav počas vykonávania requestu - jednotlivé čísla, ktoré môžme očakávať a ich popis:

  - 0: request nie je inicializovaný
  - 1: spojenie so serverom je nadviazané
  - 2: request bol prijatý na servery
  - 3: request v procese t.j. v loading stave
  - 4: request skončil a response je ready

- `xhr.responseText` reprezentuje response teda dáta, ktoré nám prídu od serveru ako string

- `xhr.status` reprezentuje stav requestu podľa rest api normy HTTP statusu

  - 200: "ok"
  - 403: "Forbidden"
  - 404: "Not Found"
  - viac [tu](https://www.w3schools.com/tags/ref_httpmessages.asp)

- `xhr.statusText` reprezentuje status text, ktorý je definovaný pri volaní reuestu na servery napr. 'ok' alebo 'not found' atd...

- `xhr.setRequestHeader(header, value)` slúži na definovanie pri metódach aké dáta zasielam serveru t.j.:
  - -> xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded") - html data vramci formularu [link](https://www.w3schools.com/xml/tryit.asp?filename=tryajax_post2)
  - -> xhr.setRequestHeader("Content-type", "text/plain; charset=UTF-8") - typ daneho requestu je text) -> xhr.setRequestHeader("Content-type", "application/json") - html data vramci formularu

## REST API metody pomocou `XMLHttpRequest()` s `callback` funkciou a pou6itia publick test api https://jsonplaceholder.typicode.com/posts/

### callback vs ES6 promise((resolve, reject) => {})

Vrámci asynchronného kódu mám dve možnosti získania výsledného stavu volania asynchronnej funkcie. Pomocou:

1. `Callback` = funguje tak, že definujem si funkciu, kt. budem volať vo funkcii na mieste kde chcem počkať na určitý výsledok, kt. nechcem predbehnúť. [example](4-callback-rest-api/callback/main.js)

```js
const posts = ["Post one", "Post two"];

function createPost(post, callback) {
  setTimeout(function () {
    posts.push(post);
    callback();
  }, 2000);
}

function getPosts() {
  setTimeout(function () {
    console.log(posts);
  }, 1000);
}

createPost("Post three", getPosts);
```

2. `Promise` = viem vytvorit dve oddelene funkcie ak využívam `new Promise((resolve, reject) => {})` pomocou metody `resolve()` viem povedať v ktorom riadku je daný sľub dokončený a vrátiť výsledok pri volaní funkcie s promisom ak je tam error využívam na to metodu `reject()`

```js
const posts = ["Post one", "Post two"];

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      const error = false;

      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong");
      }
    }, 2000);
  });
}

function getPosts() {
  setTimeout(() => {
    console.log(posts);
  }, 1000);
}

createPost("Post three")
  .then(getPosts)
  .catch(err => console.log(err));
```

## REST API metody pomocou `fetch().then().catch()`

REST - Representational State Transfer
API - Application programming interface

REST API slúži na prenos dát. Najčastejším protokolom v súčastnosti je HTTP ale bezpečnejšie je HTTPS

`fetch()` je asynchronná metóda, kt. vie vykonať request (GET, POST, PUT, DELETE, PATCH). Vrámci fetch volania sa dá počkať na výsledok pomocou zápisu.

```js
fetch(url).then(vysledok) => {
  console.log(vysledok)
}
```

ak chcem získať výsledok volania musím urobiť medzikrok

```js
fetch(url)
  .then(vysledok => {
    console.log(vysledok);
    return vysledok.json();
  })
  .then(data => {
    console.log(data);
  });
```

- ak chcem vrámci `fetch` volania zachytiť error použijem `catch()`
- ak chcem zaznamenat chybu v kóde a nedovoliť pokračovat v čítani kódu po nájdenej chybe použijem `throw 'moja chyba'`
- ak chcem okrem zastavenia kódu zaslať message zapíšem to ako `throw new Error('moja chyba')`

```js
fetch(url)
  .then(vysledok => {
    console.log(vysledok);
    return vysledok.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    throw new Error(err);
  });
```

[PRÍKLAD fetch requestov pre REST API pomocou `new Pomise()`](./6-rest-api/fetch-promise)

## async await fetch().then().then().catch()

`new Promise()` slúži ako sľub, že z danej asyn. funkcie sa vráti výsledok. Vrámci sľubu viem povedať kedy je daný sľub splnený pomoocu metódy `resolve()` a kedy nie je splnený a to pomocou `reject()`
`async` je asynchronnou funkciou a označuje, že táto funkcia vracia `new Promise`, vždy vracia sľub
`await` je kĺúčove slovo, kt. slúži na pozastavenie vykonania `async` funkcie, počkanie na výsledok sľubu v danom promise alebo v danej asynchronnej funkcii

```js
const posts = ["Post one", "Post two"];

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      const error = false;

      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong");
      }
    }, 2000);
  });
}

function getPosts() {
  setTimeout(() => {
    document.getElementById("addDataIntoBody").innerHTML = posts;
  }, 1000);
}

const druheVolanie = () => {
  createPost("Post three")
    .then(getPosts)
    .catch(err => console.log(err));
};

const prveVolanie = async () => {
  await createPost("Post three");
  await getPosts();
};

document.getElementById("prvy").addEventListener("click", prveVolanie);
document.getElementById("druhy").addEventListener("click", druheVolanie);
```

použitie async a await pri requeste:

```js
const createUser = async () => {
  await fetch("https://jsonplaceholder.typicode.com/usersk")
    .then(response => response.json())
    .then(users => {
      users.map(user => {
        const userName = `<div>Name: ${user.name}</div>`;
        document.getElementById("addDataIntoBody").innerHTML += userName;
      });
    })
    .catch(err => {
      throw new Error(err);
    });
};

createUser();
```

```js
const createUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = [];
    users = await response.json();

    users => {
      users.map(user => {
        const userName = `<div>Name: ${user.name}</div>`;
        document.getElementById("addDataIntoBody").innerHTML += userName;
      });
    };
  } catch (err) {
    throw new Error(err);
  }
};
createUser();
```
