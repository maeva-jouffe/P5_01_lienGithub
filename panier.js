fetch("http://localhost:3000/api/teddies")

.then(function(res){
    if(res.ok){
        let data= res.json();
        return data;
    }
})
.then(function(value){
    console.log(value);

// Mettre les données dans les variables
let nomProduit=[];
let description=[];
let price=[];
let imageUrl=[];
let couleur1=[];
let couleur2=[];
let couleur3=[];
let couleur4=[];
let structureProduit = ""


//Fonction qui affichera les produits dans la page web
function affichageProduits(value){

//selection element du DOM
const positionElement=document.querySelector(".container-produits");

//Boucle pour afficher tous les objets dans la page
for (i=0; i< value.length; i++){
    value.forEach((produit, i)=>{
        nomProduit[i] = produit.name;
        description[i] = produit.description;
        price[i] = (produit.price/100);
        imageUrl[i] = produit.imageUrl;
    });

//Afficher tous les objets sur la page
structureProduit = structureProduit + `
<a href="produit.html">
    <div class="blocProduit">
        <div class="photoProduit">
            <img src="${imageUrl[i]}"/>
        </div>
        <div class="detailProduit">
            <h2>${nomProduit[i]}</h2>
            <p>${description[i]}</p>
            <p>${price[i]}€</p>
        </div>
    </div>
</a>
`;

//injection dans le HTML
positionElement.innerHTML = structureProduit;
}
}
affichageProduits(value);
})