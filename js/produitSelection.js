//Récupération des données API
fetch("http://localhost:3000/api/teddies")
.then(function(res){
    if(res.ok){
        let data= res.json();
        return data;
    }
})
.then(function(value){

//Boucle pour afficher tous les objets dans la page
for (produit of value) {
  
// Paramètres de requête de l'URL pour la page produits
const queryString_url_id = window.location.search;

//Supprimer le '?' de la chaine de caractères récupérée
const idRecupere = queryString_url_id.slice(1);

//Affichage du produit cliqué dans la page produit
const selection = value.find (element => element._id === idRecupere);

//Structure HTML pour l'affichage du produit selectionné
const structureProduitSelectionne =`
<div class="row">
    <div class="col-6">
    <img src="${selection.imageUrl}"/>
    </div>
    <div class="col-5">
        <h2>Ours en peluche "${selection.name}"</h2>
        <p>${selection.description}</p>
        <p class="price">${selection.price/100}€</p>
        <form method="post" action="#">
        <p><label for="quantite">Quantité:</label>
        <select name="quantite" id="quantite">
        </select></form></p>
        <form method="post" action="#">
            <label for="color">Choisissez votre couleur</label>
            <select name="color" id="color">  ${selection.colors}  
            </select>
        </form><br>
            <button type="button" class="btn btn-dark" id="panier">Ajouter au panier</button>
    </div>
</div>`;

// Adapter le formulaire au nombre d'options de couleur
const optionCouleurs = selection.colors;
let structureOptionSelectionne = [];

for(let c = 0; c < optionCouleurs.length; c++){
    structureOptionSelectionne +=`
    <option value="${optionCouleurs[c]}">${optionCouleurs[c]}</option>`;
}

//Selection de la classe qui contiendra le produit et injection dans le HTML 
const affichageProduit = document.querySelector(".container_page_produit");
affichageProduit.innerHTML = structureProduitSelectionne;

const affichageOptionProduit = document.querySelector("#color");
affichageOptionProduit.innerHTML = structureOptionSelectionne;

// Adapter le formulaire au nombre d'options de couleur
const structureQuantite =`
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
`;

const positionQuantite = document.querySelector("#quantite");
positionQuantite.innerHTML = structureQuantite;


/////////////////////////////////    Panier    /////////////////////////////////

//récupération de la couleur choisie par l'utilisateur
const choixOption = document.getElementById('color');

//Selection du bouton ajouter au panier
const buttonPanier = document.getElementById("panier");

//Ecouter le clic sur le bouton pour envoyer l'article dans le panier
buttonPanier.addEventListener("click", (e)=>{
    e.preventDefault();

    //Mettre le choix dans une variable
    const optionChoisie = choixOption.value;
    const quantiteChoisie = positionQuantite.value;

        //Récupérer les valeurs du choix
        let produitCommande ={
            _id: selection._id,
            nomProduit:selection.name,
            imageUrl: selection.imageUrl,
            couleurs: optionChoisie,
            quantity: quantiteChoisie,
            price: (selection.price*quantiteChoisie)/100
            };

/////////////////////////////////    Local Storage    /////////////////////////////////

//Déclaration de la clé 'article' 
let articleAjoute = JSON.parse(localStorage.getItem("article"));

//Fenêtre popup qui apparait au clic sur 'ajouter au panier'
window.alert('Votre article à bien été ajouté au panier');

// Si le local storage contient des articles

if(articleAjoute){
    articleAjoute.push(produitCommande);
    localStorage.setItem("article", JSON.stringify(articleAjoute));
}
else{
    articleAjoute = [];
    articleAjoute.push(produitCommande);
    localStorage.setItem("article", JSON.stringify(articleAjoute));
        }
    });
}
});