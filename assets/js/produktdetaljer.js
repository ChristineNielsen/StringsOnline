//POST METHOD
const button = document.getElementById('send');
let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 

function addBasket(id) {
let produktid = id;
let antal = document.getElementById('quantity').value;

let data = new URLSearchParams(); //Sætter den information, som vi vil sende til api'en til en form, som api'en kan forstå
data.append('product_id', produktid); //Sender indputet (fra HTMLen) til variablet data
data.append('quantity', antal);


let requestOptions = { 
  method: 'POST', //Laver fetchen til en "post"
  headers: { 
      'Authorization': bearer //Sætter token med
  },
  body: data, //Variablet data skal være i fetch'ens body
  redirect: 'follow' 
};

if(!checkCookie()) {
    alert('Du skal logge ind for at lægge i kurv')
} else {
fetch(`https://api.mediehuset.net/stringsonline/cart`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
alert(`${antal} produkt(er) tilføjet!`);
}}


//SEND RATING
function sendRating(id){
    let antal = document.getElementById('star-rating').value;
    let id2 = id;
    let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
    let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 
     console.log(antal)
let data = new URLSearchParams(); //Sætter den information, som vi vil sende til api'en til en form, som api'en kan forstå
data.append('product_id', id2); //Sender indputet (fra HTMLen) til variablet data
data.append('num_stars', antal);

let requestOptions = { 
  method: 'POST', //Laver fetchen til en "post"
  headers: { 
      'Authorization': bearer //Sætter token med
  },
  body: data, //Variablet data skal være i fetch'ens body
  redirect: 'follow' 
};
if(!checkCookie()) {
    alert('Du skal logge ind for at lave en rating')
} else {
fetch(`https://api.mediehuset.net/stringsonline/ratings`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
alert('Tak for rating!');
}
}
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
function checkCookie() {
    if(getCookie("token") != "") {
        return true;
    } else {
        return false;
    }
}  
