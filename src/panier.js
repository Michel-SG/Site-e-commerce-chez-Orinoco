
let cartItems = JSON.parse(localStorage.getItem("productInCart")) || [];
let cartCost = localStorage.getItem("totalCost");
function displayCart() {
    let productsPanier = document.querySelector(".products-panier");
    if (cartItems && productsPanier) {
        productsPanier.innerHTML = "";
        Object.values(cartItems).forEach( 
            (cartItem) =>(
            productsPanier.innerHTML += `
                <div class ="panier panier-content" >
                    <h4 class="panier panier_product element-position">${cartItem.name} </h4>  
                    <h4 class="panier panier_product"> ${cartItem.lenses}</h4>
                    <h4 class="panier panier_product"> ${cartItem.price / 100},00 €  </h4>
                    <h4 class="panier panier_product"> ${cartItem.quantity}</h4>  
                    <h4 class ="panier panier_product" >${(cartItem.price / 100) * cartItem.quantity},00 € </h4>
                </div>`
            )
        );
        productsPanier.innerHTML += `
        <div class = "total-container total-content" >
            <div class = "total-container total-container_cost">Total à payer</div>
            <h4 class = "total-container total-container_cost total-container_size">${cartCost},00 € </h4>
            <button class="remove " ><i class="far fa-trash-alt"></i></button>
        </div>`;
    }
}
let formulaire = document.getElementById("formulaire");
let headForm = document.querySelector(".containers_header");
headForm.innerHTML = `<h3 class="containers_header containers_header_title increase-size">Nom du produit</h3>
                        <h3 class="containers_header containers_header_title">lentilles</h3>
                        <h3 class="containers_header containers_header_title">Prix</h3>
                        <h3 class="containers_header containers_header_title">Quantité</h3>
                        <h3 class="containers_header containers_header_title">Total</h3>`
formulaire.innerHTML = `<label for="firstName">Nom</label> 
                    <input type="text" id="firstName" name="nom" placeholder="exemple:BARACK" pattern="[a-z-'éèA-Z]+" required/>
                    <label for="lastName">Prénom</label>
                    <input type="text" id="lastName" name="prenom" placeholder="exemple:Obama" pattern="[a-z-'éèA-Z]+" required/>
                    <label for="mail">Email</label>
                    <input type="email" id="mail" name="email" placeholder="exemple:obamabar@yahoo.fr" required />
                    <label for="phone">Téléphone</label>
                    <input type="tel" id="phone" name="PhoneNumber" placeholder="exemple:0767675458" pattern="[0-9]{10}"/>              
                    <p class="adress">Adresse de livraison</p>
                    <label for="address">Rue</label>
                    <input type="text" name=" rue" id="address" placeholder="exemple:7 rue guy môquet" pattern="[0-9 'éèa-zA-Z]+" required/>
                    <label for="city">Ville</label>
                    <input type="text" name=" ville" id="city" value="" placeholder="exemple:Grenoble" pattern="[a-z-'éè A-Z]+" required/>
                    <label for="pays">Pays</label>
                    <input type="text" id="pays" name="pays" placeholder="exemple:France" required />
                    <input type="submit" value="envoyer" id="submit"/>`
function onloadCartNumbers() {
    let cartItemsQuantityNumber = localStorage.getItem("totalCart");
        if (cartItemsQuantityNumber) {
            document.querySelector(".cart span").textContent = cartItemsQuantityNumber;
        }
}
onloadCartNumbers();
displayCart();
buttonClear = document.getElementsByClassName("remove");
    for (let i = 0; i < buttonClear.length; i++) {
        let button = buttonClear[i];
        button.addEventListener("click", function (event) {
            alert("vous pouvez retourner vers la page d'acceuil et choisir de nouveaux produits");
            let buttonClicked = event.target; //une référence à la cible vers laquelle l'évènement était originellement destiné
            buttonClicked.parentElement.remove();
            localStorage.clear();
            window.location.assign("index.html"); ; //on effectue un chargement local
        });
    }

document.getElementById("formulaire").addEventListener("submit", function (e) {
    let inputs = document.getElementsByTagName("input"); // on recupére tous les inputs
    let cartItemsNumber = localStorage.getItem("totalCart");
        if(!cartItemsNumber){
            alert("Vous n'avez sélectionné aucun produit mais vous pouvez retourner vers la page d'acceuil et choisir des produits");
            window.location.assign("index.html");
        }
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                error = "veuillez renseigner tous les champs !";
            } else if (inputs[i].value){
                e.preventDefault(); // stopper le comporetement par défaut
                productsOrder();
            }
        }
});

const productsOrder = async function () {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("mail").value;
    let contact = { firstName, lastName, address, city, email }; 
    let products = [];
    cartItems.forEach((cartItem) => {
        products.push(cartItem.id); //ajoute un élément dans l'historique de l'utilisateur alors que le replace remplace l'elt courant
    });
    let responseData = await fetch("http://localhost:3000/api/cameras/order",{
        method: "post", headers: { "content-type": "application/json" }, // on avise le système qu'on va envoyer du json
        body: JSON.stringify({ products, contact }),
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let getOrderId = data.orderId;
        let getCartCost = cartCost;
        let orderRecap = { getOrderId, getCartCost }; //tuple double de données
        localStorage.clear();
        localStorage.setItem("orderRecap", JSON.stringify(orderRecap)); // on enrégistre le récap dans le localStorage
        window.location = "confirmation.html";//renvoi la page confirmation.html
    })
    .catch((Error) => console.error("erreur"));
};