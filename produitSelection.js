//Récupération des données API
fetch("http://localhost:3000/api/teddies")

.then(function(res){
    if(res.ok){
        let data= res.json();
        return data;
    }
})
.then(function(value){


// Mettre les données dans les variables
let _id=[]
let nomProduit=[];
let description=[];
let price=[];
let imageUrl=[];
let structureProduit = ""


//Boucle pour afficher tous les objets dans la page
for (i=0; i< value.length; i++){
    value.forEach((produit, i)=>{
        nomProduit[i] = produit.name;
        description[i] = produit.description;
        price[i] = (produit.price/100);
        imageUrl[i] = produit.imageUrl;
        _id[i] = produit._id;
     })}; 

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
        <p>${selection.price/100}€</p>
        <form method="post" action="#">
            <label for="color">Choisissez votre couleur</label>
            <select name="color" id="color">    
            </select>
        </form><br>
            <button type="button" class="btn btn-dark" id="panier">Ajouter au panier</button>
    </div>
</div>`;

// Adapterle formulaire au nombre d'options de couleur
const optionCouleurs = selection.colors;
let structureOptionSelectionne = [];

for(let c = 0; c < optionCouleurs.length; c++){
    structureOptionSelectionne +=`<option value="${c}">${optionCouleurs[c]}</option>`;
}

//Selection de la classe qui contiendra le produit et injection dans le HTML 
const affichageProduit = document.querySelector(".container_page_produit");
affichageProduit.innerHTML = structureProduitSelectionne;

const affichageOptionProduit = document.querySelector("#color");
affichageOptionProduit.innerHTML = structureOptionSelectionne;

/////////////////////////////////    Panier    /////////////////////////////////////////////////////////

//récupération de la couleur choisie par l'utilisateur
const choixOption = document.getElementById('color');

//Selection du bouton ajouter au panier
const buttonPanier = document.getElementById("panier");

//Ecouter le clic sur le bouton pour envoyer l'article dans le panier
buttonPanier.addEventListener("click", (e)=>{
    e.preventDefault();

    //Mettre le choix dans une variable
    const optionChoisie = choixOption.value;

        //Récupérer les valeurs du choix
        let produitCommande ={
            _id: selection._id,
            nomProduit:selection.name,
            price: selection.price/100,
            imageUrl: selection.imageUrl,
            couleurs: optionChoisie,
            quantity: 1,
            }

});


});


