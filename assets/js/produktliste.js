//POST METHOD - Læg i kurv
const button = document.getElementById('send');
let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 

function addBasket(id) {
let produktid = id;
let antal = 1;

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
alert('Produkt tilføjet!');
}
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

function checkCookie() {
    if(getCookie("token") != "") {
        return true;
    } else {
        return false;
    }
}  


//Sorter

//Javascript fetch
let produkter;
let text = "";
let list = document.getElementById('produktliste4');
let group1;
let subgroup1;


async function sorter(group, subgroup){
    console.log(group, subgroup)
    const api = `https://api.mediehuset.net/stringsonline/groups/${group}/subgroup/${subgroup}`;
   await fetch(api, {
     headers: {   /*Sendes med, da man ellers ville blive nægtet adgang*/ 
    'Content-Type': 'application/json',} })
    .then(resp => resp.json())
    .then(function (api){ /*api = svaret vi får fra APIen*/
      produkter = api.items.subgroup.products; /*Går ind i API svaret .items*/
      group1 = group;
      subgroup1 = subgroup;
    });

    let option = document.getElementById('sort-by').value;  /*Finder hvad man har valgt i selectoren*/ 
    let produkter2 = produkter
    console.log(produkter2)
    text = "";
    console.log(option, produkter2)
    switch (option) {
        case "a-z": 
            {
                produkter2.sort(function(low, high){ /* low-high = a-å */
                    if (low.name.toLowerCase() < high.name.toLowerCase()) { 
                        return -1;
                    }
                    else if (low.name.toLowerCase() > high.name.toLowerCase()) {
                        return 1;
                    }
                    else{
                    return 0;    
                    }
                })
                break;
            }
            case "z-a":
                {
                    produkter2.sort(function(low, high){ /* low-high = a-å */
                        if (low.name.toLowerCase() < high.name.toLowerCase()) { 
                            return -1;
                        }
                        else if (low.name.toLowerCase() > high.name.toLowerCase()) {
                            return 1;
                        }
                        else{
                        return 0;    
                        }
                    })
                    produkter2.reverse();
                    break;
                }
                case "low":
                    {
                        produkter2.sort(function(a, b){
                         return a.price - b.price
                            
                        });
                        break;
                    }
                    case "high":
                        {
                            produkter2.sort(function(a, b){
                             return b.price - a.price
                                
                            });
                            break;
                        }
    }
    for(let item in produkter2){
        console.log(produkter2[item].name)
      text+=  `
      <div class="grid">
      <div class="card1">
        <a href="/produktdetaljer/` + group1 + `/` + subgroup1 + `/` + produkter2[item].id + `"> <img src="` + produkter2[item].image_fullpath + `" alt="` + produkter2[item].image_filename + `"></a>
      </div> 
      <div class="card2">
          <h3>` + produkter2[item].name + `</h3>
          <h5> ` + produkter2[item].description_short + `<br> <a href="/produktdetaljer/` + produkter2[item].id + `">Læs mere</a> </h5>
     </div> 
      <div class="card3">
          <h4>Pris: DDK` + produkter2[item].price + `</h4>
          <button type="button" onclick="addBasket('` + produkter2[item].id + `')">Læg i kurv</button>
          <h4>` + produkter2[item].stock + ` på lager</h4>
     </div>
  </div>`
        ;
    }
    list.innerHTML = text 
}
