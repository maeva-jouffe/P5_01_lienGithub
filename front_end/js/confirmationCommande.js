// Récupération de l'id de la réponse serveur
const id = localStorage.getItem("id");
const prixTotal = localStorage.getItem("prixTotal");


let newDiv = document.createElement("div");
newDiv.id = "commande";
newDiv.textContent = `Votre commande numéro
 ${id}  à bien été enregistrée, le montant total de la commande est de: ${prixTotal}€`;
document.getElementById("identifiantCommande").appendChild(newDiv);