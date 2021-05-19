// const prva = () => {
//   console.log("som prva funkcia");
// };

// const druha = () => {
//   console.log("som druha funkcia");
// };

// const tretia = () => {
//   setTimeout(() => {
//     console.log("som tretia funkcia");
//   }, 1000);
// };

// tretia();
// prva();
// druha();

window.onload = function () {
  function loadData() {
    // vytvorenie XHR objektu
    const xhr = new XMLHttpRequest();

    // open
    xhr.open("GET", "./data.txt", true);

    xhr.onload = function () {
      if (this.status === 200) {
        console.log(this.responseText);
      }
    };

    xhr.send();
  }

  document.getElementById("button").addEventListener("click", loadData);
};
