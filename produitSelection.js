
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
let couleur1=[];
let couleur2=[];
let couleur3=[];
let couleur4=[];
let structureProduit = ""

//Boucle pour afficher tous les objets dans la page
for (i=0; i< value.length; i++){
    value.forEach((produit, i)=>{
        nomProduit[i] = produit.name;
        description[i] = produit.description;
        price[i] = (produit.price/100);
        imageUrl[i] = produit.imageUrl;
        _id[i] = produit._id;
        couleur1[i] = produit.colors;
        couleur2[i] = produit.colors;
        couleur3[i] = produit.colors;
        couleur4[i] = produit.colors;
     }) };
     console.log(couleur1);
// Paramètres de requête de l'URL pour la page produits
const queryString_url_id = window.location.search;


//Supprimer le '?' de la chaine de caractères récupérée
const idRecupere = queryString_url_id.slice(1);

//Affichage du produit cliqué dans la page produit
const selection = value.find (element => element._id === idRecupere);


//Selection de la classe qui contiendra le produit
const affichageProduit = document.querySelector(".container_page_produit");

//Structure HTML pour l'affichage du produit selectionné
const structureProduitSelectionne =`
<div class="row">
    <div class="col">
    <img src="${selection.imageUrl}"/>
    </div>
    <div class="col-5">
        <h2>Ours en peluche "${selection.name}"</h2>
        <p>${selection.description}</p>
        <p>${selection.price/100}€</p>
        <form method="post" action="#">
            <p><label for ="color">Choisissez votre couleur</label>
            <select name="color" id="color">
            <option value="color1">${selection.color1}</option>
            <option value="color2">${selection.color2}</option>
            <option value="color3">${selection.color3}</option>
            <option value="color4">${selection.color4}</option>
            </select>
        </form>
            <button type="button" class="btn btn-dark">Ajouter au panier</button>
    </div>
</div>`
//Injection dans le HTML
affichageProduit.innerHTML = structureProduitSelectionne;

});

/////////////////////////////////    Panier    /////////////////////////////////////////////////////////

const formulaireOption = document.querySelector("#color");
console.log(formulaireOption);