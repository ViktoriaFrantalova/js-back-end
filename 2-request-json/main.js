document.getElementById("btn1").addEventListener("click", loadCustomer);
document.getElementById("btn2").addEventListener("click", loadCustomers);

function loadCustomer() {
  const xhr = new XMLHttpRequest();
  // xhr.open(method, url, async)
  xhr.open("GET", "data.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      //JSON.parse() premeni text na objekt
      const customer = JSON.parse(this.responseText);

      const output = `
        <ul>
          <li>ID: ${customer[0].id}</li>
          <li>Name: ${customer[0].name}</li>
          <li>Company: ${customer[0].company}</li>
          <li>Phone: ${customer[0].phone}</li>
        </ul>
      `;

      document.getElementById("customer").innerHTML = output;
    }
  };
  xhr.send();
}

function loadCustomers() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);

  xhr.onload = function () {
    JSON.parse(this.responseText).forEach(customer => {
      if (this.status === 200) {
        const output = `
          <ul>
            <li>ID: ${customer.id}</li>
            <li>Name: ${customer.name}</li>
            <li>Company: ${customer.company}</li>
            <li>Phone: ${customer.phone}</li>
          </ul>
        `;

        document.getElementById("customers").innerHTML += output;
      }
    });
  };
  xhr.send();
}
