

// const structurePanier =`
// <table>
//     <tr>
//         <th>Produit</th>
//         <th>Quantité</th>
//         <th>Prix</th>
//         <th>Total</th>
//     </tr>
//     <tr>
//         <td>${articleAjoute.name}</td>
//         <td><input type="number" min="1"/></td>
//         <td>${articleAjoute.price}</td>
//         <td>35€</td>
//     </tr>
// </table>`;

// panier.innerHTML = structurePanier;


//Selection de la classe qui contiendra le produit et injection dans le HTML 
const panier = document.querySelector(".container_page_panier");

//Quand le panier est vide
if(articleAjoute === null){
    const panierVide = `
    <div>
        <p class="panierVide">Votre panier Orinours est vide</p>
        <p>Et si vous faisiez un tour dans notre catalogue?</p>
        <img src="images/panier.png" alt="Panier vide"/>
    </div>`
    panier.innerHTML = panierVide;
}
