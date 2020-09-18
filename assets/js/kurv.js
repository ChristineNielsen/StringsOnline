//DELETE METHOD
function deleteLine(id) {

    let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 
    
    let requestOptions = { 
      method: 'DELETE', //Laver fetchen til en "delete"
      headers: { 
        'Authorization': bearer //Sætter token med
    },
      redirect: 'follow' 
    };
    console.log(id)
    
    fetch(`https://api.mediehuset.net/stringsonline/cart/${id}`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    setTimeout(function(){ location.reload(); }, 1000);
    }
    


//PATCH
function updateCart(valg, id, antal ){
    let value = '';
    let product_id = '';
    switch (valg){
        case 'minus':{
            let tal = parseInt(antal);
            let ids = id.toString();
            product_id = ids;
            let number = tal - 1;
            value = number;
            break;
            }
        case 'plus':{
            let tal = parseInt(antal);
            let ids = id.toString();
            product_id = ids;
            let number = tal + 1;
            value = number;
            break;
            }
    }
    let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
    let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 
    console.log(product_id)
    
    let body = {
        product_id, 
        field: 'quantity', //field = det felt vi gerne vil ændre
        value
    }

    let requestOptions = { 
      method: 'PATCH',
      headers: { 
          'Authorization': bearer //Sætter token med
      },
      body: body, //Variablet body skal være i fetch'ens body
      redirect: 'follow' 
    };
    
    if(!checkCookie()) {
        alert('Du skal logge ind for at lægge i kurv')
    } else {
    fetch(`https://api.mediehuset.net/stringsonline/cart`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    alert(`produkt(er) tilføjet!`);
    }
    
}