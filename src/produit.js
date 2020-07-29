
const productId = window.location.search.substring(4);
const product = document.getElementById("product");
const getProduct = async function () {        // création de la fonction asynchrone 
    let response = await fetch("http://localhost:3000/api/cameras/" + productId);
    let result = await response.json()
    .then((result)=>{
        product.innerHTML += `<div class="product">
                                <div class = "container-image">
                                    <img src= "${result.imageUrl}"> 
                                </div>  
                                <div>
                                    <ul> 
                                        <li><strong>Name: </strong>${result.name} </li>
                                        <li id="price"><strong>Prix: </strong> ${result.price / 100}</li>
                                        <li><strong>Description: </strong>${result.description}</li>
                                        <li class="lens"><strong>Lentille :</strong>
                                        <select id ="product-select" onchange="change();" ></select>
                                        </li> 
                                        <li><strong>Quantité: </strong> <input id="quantity" type ="number" min="0"> </input></li>
                                    </ul>
                                </div>
                            </div>`;
        let productSelect = document.getElementById("product-select");
        let quantity = document.getElementById("quantity");
        for (let i = 0; i < result.lenses.length; i++) { //recupérer les bonnes valeurs
            productSelect.innerHTML += `<option>${result.lenses[i]}</option>`;
        }
        let productCart = document.querySelector(".product-card");
        productCart.addEventListener("click", (event) => {
            let lenses = document.querySelector("select").value;
            let quantity = document.getElementById("quantity").value;
            if (quantity == 0) {
                event.preventDefault();
                alert("veuillez sélectionner une quantité s'il vous plait");
                location.reload(); 
            } else if(quantity < 0){
                alert("veuillez sélectionner une quantité positive s'il vous plait");
                location.reload();
            }else{
                //on place un objet d'obtion
                let cartObject = {   
                    id: result._id,
                    name: result.name,
                    price: result.price,
                    lenses: lenses, 
                    description: result.description,
                    quantity: quantity,
                    imageURL: result.imageUrl,
                };   //si on a des informations on les parse automatiquement en json ou alors le localstorage n'existe pas
                let cartItems = JSON.parse(localStorage.getItem("productInCart")) || [];    
                    if (localStorage.getItem("productInCart") === null){ //si la clé n'existe pas alors je vais pouvoir la créee
                        localStorage.setItem("productInCart", JSON.stringify(cartItems)) || []; //on crée notre clé
                        cartItems.push(cartObject);  
                    }else{
                        cartItems.push(cartObject);
                    }         
                      //on enregistre les données dans localStorage
                localStorage.setItem("productInCart",JSON.stringify(cartItems));         
            }; 
            let cartItemsQuantityNumber = localStorage.getItem("totalCart");
            cartItemsQuantityNumber = parseInt(cartItemsQuantityNumber);
            if (cartItemsQuantityNumber) {
                if(quantity > 0){
                localStorage.setItem("totalCart",cartItemsQuantityNumber + 1);
                document.querySelector(".cart span").textContent = cartItemsQuantityNumber + 1;
                }
            }else{
                if(quantity > 0){
                localStorage.setItem("totalCart", 1);
                document.querySelector(".cart span").textContent = 1;  
                }
            }
            
            let cartCost = localStorage.getItem("totalCost");
            if (cartCost != null) {
                if(quantity > 0){
                cartCost = parseInt(cartCost);
                quantity = parseInt(quantity);
                localStorage.setItem("totalCost", cartCost + (result.price / 100) *quantity);
                }
            }else{
                if(cartCost == null){
                    if(quantity>0){
                localStorage.setItem("totalCost", (result.price / 100) * quantity);
                 }
                }
            }
        }); 
    })
    .catch(error => console.error('error'))
};
window.onload = () => {
    getProduct();
};
function onloadCartNumbers() {
          let cartItemsQuantityNumber = localStorage.getItem("totalCart");
          if (cartItemsQuantityNumber) {
            document.querySelector(".cart span").textContent = cartItemsQuantityNumber;
          }
}
onloadCartNumbers();

function change() {
    let select = document.getElementById("product-select");
    select.selectedOptions[0].value;
}