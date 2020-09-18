const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const fetch = require('node-fetch');

//Sætter view engine til ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//Definerer root mappe til css referencer m.m.
app.use(express.static(__dirname + '/'));
app.use(cookieparser());

//Route til forside
app.get("/", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');
    const requestToApiSearch = await fetch(`https://api.mediehuset.net/stringsonline/search/a`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    const apiResponse3 = await requestToApi3.json();   
    const apiResponseSearch = await requestToApiSearch.json();
    
    return res.render("pages/index", {
        produkter: apiResponse,
        brands: apiResponse3,
        search: apiResponseSearch
       });
         
});


app.get("/kasse", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    const apiResponse3 = await requestToApi3.json(); 
    
    return res.render("pages/kasse", {
        produkter: apiResponse,
        brands: apiResponse3
       });
         
});


app.get("/kurv", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');
    const token = req.cookies.token //Finder 'token' cookien i mine cookies
    let bearer = 'Bearer ' + token //Definere bearertoken med cookien 

    let requestOptions = { 
        method: 'GET', //Laver fetchen til en "get"
        headers: { 
            'Authorization': bearer //Sætter token med
        },
        redirect: 'follow' 
      };
      
      const requestCart = await fetch(`https://api.mediehuset.net/stringsonline/cart`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen


    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    const apiResponse3 = await requestToApi3.json(); 
    const apiResponseCart = await requestCart.json(); 
    
    return res.render("pages/kurv", {
        produkter: apiResponse,
        brands: apiResponse3,
        cart: apiResponseCart
       });
         
});

app.get("/kvittering/:id", async (req, res) => {
        let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');
    const token = req.cookies.token //Finder 'token' cookien i mine cookies
    let bearer = 'Bearer ' + token //Definere bearertoken med cookien 

    let requestOptions = { 
        method: 'GET', //Laver fetchen til en "get"
        headers: { 
            'Authorization': bearer //Sætter token med
        },
        redirect: 'follow' 
      };
      
      const requestOrders = await fetch(`https://api.mediehuset.net/stringsonline/orders/${id}`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponseOrders = await requestOrders.json();
    const apiResponse = await requestToApi.json(); 
    const apiResponse3 = await requestToApi3.json(); 
    
    return res.render("pages/kvittering", {
        produkter: apiResponse,
        brands: apiResponse3,
        orders: apiResponseOrders
       });
         
});


app.get("/login", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    const apiResponse3 = await requestToApi3.json();
    
    return res.render("pages/login", {
        produkter: apiResponse,
        brands: apiResponse3
       });
         
});


app.get("/orderhistorik", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');
    const token = req.cookies.token //Finder 'token' cookien i mine cookies
    let bearer = 'Bearer ' + token //Definere bearertoken med cookien 

    let requestOptions = { 
        method: 'GET', //Laver fetchen til en "get"
        headers: { 
            'Authorization': bearer //Sætter token med
        },
        redirect: 'follow' 
      };
      
      const requestOrders = await fetch(`https://api.mediehuset.net/stringsonline/orders`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen


    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    const apiResponse3 = await requestToApi3.json();
    const apiResponseOrders = await requestOrders.json(); 
    
    return res.render("pages/orderhistorik", {
        produkter: apiResponse,
        brands: apiResponse3,
        orders: apiResponseOrders
       });
         
});


app.get("/producentside/:id", async (req, res) => {
    // Henter id fra URL'en
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi2 = await fetch(`https://api.mediehuset.net/stringsonline/brands/${id}`);
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');
  

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    const apiResponse2 = await requestToApi2.json(); 
    const apiResponse3 = await requestToApi3.json(); 
    
    return res.render("pages/producentside", {
        produkter: apiResponse,
        info: apiResponse2,
        brands: apiResponse3
       });
         
});


app.get("/produktdetaljer/:group/:subgroup/:id", async (req, res) => {
    // Henter id fra URL'en
    let id = req.params.id
    let group_name = req.params.group
    let subgroup_name = req.params.subgroup
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi2 = await fetch(`https://api.mediehuset.net/stringsonline/products/${id}`);
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    const apiResponse2 = await requestToApi2.json(); 
    const apiResponse3 = await requestToApi3.json();
    
    return res.render("pages/produktdetaljer", {
        produkter: apiResponse,
        vare: apiResponse2,
        brands: apiResponse3,
        group: group_name,
        subgroup: subgroup_name
       });
         
});


app.get("/produktliste/:group/:group_id/:subgroup/:subgroup_id", async (req, res) => {
    let group = req.params.group_id
    let subgroup = req.params.subgroup_id
    let group_name = req.params.group
    let subgroup_name = req.params.subgroup
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/stringsonline/groups/${group}/subgroup/${subgroup}`);
    const requestToApi2 = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();
    const apiResponse2 = await requestToApi2.json();   
    const apiResponse3 = await requestToApi3.json();
 
    return res.render("pages/produktliste", {
        produkter: apiResponse2,
        produkter2: apiResponse,
        brands: apiResponse3,
        group: group_name,
        subgroup: subgroup_name,
        group_id: group,
        subgroup_id: subgroup
       }); 
});

app.get("/search/:keyword", async (req, res) => {
    let keyword = req.params.keyword
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/stringsonline/productgroups');
    const requestToApi3 = await fetch('https://api.mediehuset.net/stringsonline/brands');
    const requestToApiSearch = await fetch(`https://api.mediehuset.net/stringsonline/search/${keyword}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    const apiResponse3 = await requestToApi3.json(); 
    const apiResponseSearch = await requestToApiSearch.json();
    
    return res.render("pages/search", {
        produkter: apiResponse,
        brands: apiResponse3,
        search: apiResponseSearch,
        keyword: keyword
       });   
});


//Angiver port der skal lyttes på
app.listen(3000, () => {
    console.log("Express server kører...");
});