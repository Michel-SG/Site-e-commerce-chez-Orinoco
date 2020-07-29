
let orderedRecap = JSON.parse(localStorage.getItem("orderRecap")) || [];
let confirm = document.getElementById("order-confirm");
confirm.innerHTML += `
    <div class="confirm">
        <h3 class="confirm confirm_command"> Votre commande à été confirmée !</h3>
        <p class="confirm confirm_appreciation">Nous vous remercions pour votre commande. Nous vous tiendrons informé  
            par e-mail lorsque les articles de votre commande auront été expédiés.
            Votre numéro de commande et le prix total sont indiqués ci-dessous.
        </p>
        <h3 class="confirm confirm_number">Numéro de commande : ${orderedRecap.getOrderId}</h3>
        <h3 class = "confirm confirm_number">Prix total : ${orderedRecap.getCartCost},00 €</h3>
    </div>`;

localStorage.clear();
