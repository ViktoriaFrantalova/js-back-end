const getText = () => {
  fetch("data.txt")
    .then(res => res.text())
    .then(data => {
      console.log(data);
      document.getElementById("output").innerHTML = data;
    })
    .catch(err => console.error(err));
};

document.getElementById("buttonData").addEventListener("click", getText);

// output je potrebne vykreslit ako zoznam viacerych elemntov a vlozit to z informaciami z jsonu do output
const getJson = () => {
  fetch("data.json")
    // namiesto res.text() pouzijem res.json()
    .then(res => res.json())
    .then(customers => {
      customers.map(customer => {
        const customerInfo = `
					<li>ID: ${customer.id}</li>
					<li>Name: ${customer.name}</li>
					<li>Company: ${customer.company}</li>
					<li>Phone: ${customer.phone}</li>
			`;
        document.getElementById("output").innerHTML += customerInfo;
      });
    })
    .catch(err => console.log(err));
};
document.getElementById("buttonJson").addEventListener("click", getJson);

// fetch metoda na volanie requestu z url adresy 'https://api.github.com/users' data prichadzaju ako json preto pouzivam res.json()
const getExternal = () => {
  fetch("https://api.github.com/users")
    .then(res => res.json())
    .then(users => {
      users.map(user => {
        const userInfo = `
					<li>ID: ${user.id}</li>
					<li>Login: ${user.login}</li>
					`;
        document.getElementById("output").innerHTML += userInfo;
      });
    })
    .catch(err => console.log(err));
};
document.getElementById("buttonExternal").addEventListener("click", getExternal);
