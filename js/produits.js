//Récupération des données API
fetch("http://localhost:3000/api/teddies")
.then(function(res){
    if(res.ok){
        let data= res.json();
        return data;
    }
})
.then(function(listeDeProduits){

// Mettre les données dans les variables
let structureProduit = ""

//Fonction qui affichera les produits dans la page web
function affichageProduits(listeDeProduits){

//Selection de la classe qui contiendra les produits
const positionElement=document.querySelector(".container-produits");

//Boucle pour afficher tous les objets dans la page
for (produit of listeDeProduits)

//Structure HTML pour l'affichage des produits
structureProduit += `
<a href="produit.html?${produit._id}">
    <div class="blocProduit">
        <h2>${produit.name}</h2>
        <div class="photoProduit"><img src="${produit.imageUrl}"/></div>
        <div class="detailProduit">
        <p class="price">${produit.price/100}€</p>
        <p>${produit.description}</p>
        <p class="color">Couleurs disponibles: ${produit.colors}</p>
        </div>
    </div>
</a>
`;

//injection dans le HTML
positionElement.innerHTML = structureProduit;
}

affichageProduits(listeDeProduits);
});

