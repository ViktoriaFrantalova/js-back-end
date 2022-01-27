window.onload = () => {
  document.getElementById("get-jokes").addEventListener("click", getJokes);

  function getJokes(e) {
    const number = document.querySelectorAll("#number")[0].value;
    console.log(number);

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function () {
      console.log("READYSTATE", xhr.readyState);
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);

        let output = "";

        if (response.type === "success") {
          console.log(response.value);
          response.value.forEach(joke => {
            output += `<li>${joke.joke}</li>`;
          });
        } else {
          output += `<li>Something went wrong</li>`;
        }

        document.getElementById("jokes").innerHTML = output;
      }
    };

    xhr.send();

    e.preventDefault();
  }
};
