//Anden leveringsadresse
function show(){
    let element1 = document.getElementById("1");
    let element2 = document.getElementById("2");
    let element3 = document.getElementById("3");
    element2.classList.toggle("hide");
    element3.classList.toggle("hide");
    element1.classList.toggle("hide");
    console.log(1)
}



//POST METHOD
const button = document.getElementById('send');
let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 

button.onclick = function() {
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let adresse = document.getElementById('adresse').value;
let postnummer = document.getElementById('postnummer').value;
let by = document.getElementById('by').value;
let email = document.getElementById('email').value;
let adresse2 = document.getElementById('adresse2').value;
let postnummer2 = document.getElementById('postnummer2').value;
let by2 = document.getElementById('by2').value;


let data = new URLSearchParams(); //Sætter den information, som vi vil sende til api'en til en form, som api'en kan forstå
data.append('firstname', firstname);//Sender indputet (fra HTMLen) til variablet data
data.append('lastname', lastname);
data.append('address', adresse);
data.append('zipcode', postnummer);
data.append('city', by);
data.append('email', email);
data.append('status', 1);
data.append('delivery_address', adresse2);
data.append('delivery_zipcode', postnummer2);
data.append('delivery_city', by2);

let requestOptions = { 
  method: 'POST', //Laver fetchen til en "post"
  headers: { 
      'Authorization': bearer //Sætter token med
  },
  body: data, //Variablet data skal være i fetch'ens body
  redirect: 'follow' 
};

fetch(`https://api.mediehuset.net/stringsonline/orders`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
.then(response => response.json())
.then(result =>{
console.log(result)
window.location.href = `/kvittering/${result.order_id}`;
})
.catch(error => console.log('error', error));
}

//Finder en bestemt cookie
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    let item;
    for(item of ca) {
        while (item.charAt(0) == ' ') {
            item = item.substring(1);
        }
        if (item.indexOf(name) == 0) {
            return item.substring(name.length, item.length);
        }
    }
    return "";
}








