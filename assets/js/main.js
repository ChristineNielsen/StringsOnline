//Vis Orderhistorik hvis logget ind
window.onload = orderFunktion();

function orderFunktion() {    
if(!checkCookie()) {
    const html = '';  
    document.getElementById('order').innerHTML = html;
} else {
    const html = `
    Orderhistorik      
        `;  
document.getElementById('order').innerHTML = html;
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


//Search 
function linkToSearch(){
 let keyword = document.getElementById('search').value;
 window.location.href = `/search/${keyword}`;
}