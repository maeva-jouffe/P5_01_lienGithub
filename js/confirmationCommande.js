// Récupération de l'id dela réponse serveur
const id = localStorage.getItem("id");
const prixTotal = localStorage.getItem("prixTotal");
console.log(`${prixTotal}`);

//Récupération du prix total du panier
const structureConfirmation =
    `<p>Identifiant de commande:<br>${id}</p>
    <p>Montant total de la commande:<br>${prixTotal}€</p>`;

const positionConfirmation = document.getElementById("identifiantCommande");
console.log(positionConfirmation);
const affichageConfirmation = positionConfirmation.innerHTML = structureConfirmation;