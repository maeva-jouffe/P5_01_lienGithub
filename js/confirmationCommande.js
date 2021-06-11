// Récupération de l'id dela réponse serveur
const id = localStorage.getItem("id");
const prixTotal = localStorage.getItem("prixTotal");
console.log(`${prixTotal}`);

//Récupération du prix total du panier
const structureConfirmation =
    `<p>Votre commande numéro
    <em class="idDeCommande"> ${id}  </em> à bien été enregistrée</p>
    <p>Montant total de la commande: <em class="prixTotalCommande">${prixTotal}€</em></p>
    `;

const positionConfirmation = document.getElementById("identifiantCommande");
console.log(positionConfirmation);
const affichageConfirmation = positionConfirmation.innerHTML = structureConfirmation;