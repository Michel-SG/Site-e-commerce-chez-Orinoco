
//Présentation des articles disponibles à la vente
const displayArticleForSale = async function () { 
  const products = document.getElementById("products");       
  let response = await fetch("http://localhost:3000/api/cameras");       
  let result = await response.json()
  .then((result) => {   
    result.forEach((product) => { //pour chacun de ses produits je fait une boucle
      products.innerHTML += `<div class="product">
                                <div class = "container-image">
                                   <img src= "${product.imageUrl}"> 
                                </div>
                              <div>
                                <ul> 
                                  <li id="products_name"><strong>Name: </strong>${product.name} </li>
                                  <li id="products_price"><strong>Prix: </strong> ${product.price / 100}</li>
                                  <li><strong>Description: </strong>${product.description}</li><br/>
                                  <button id ="btn" onclick='location.href="produit.html?id=${product._id }"'>
                                  Choisissez ce produit </button>
                                </ul>
                              </div>    
                            </div>`;
                            });
                          })
                          .catch(error => console.error('error'))
                        };
displayArticleForSale();
function CartChargeNumbers() {
  let cartItemsQuantityNumber = localStorage.getItem("totalCart");
    if (cartItemsQuantityNumber) {
      document.querySelector(".cart span").textContent = cartItemsQuantityNumber;
    }
}

CartChargeNumbers();