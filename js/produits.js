function genererHtml(listeDeProduits){
    // Mettre les données dans les variables
    let structureProduit = "";
    //Boucle pour récupérer chaque produit de la liste de produits
    for (produit of listeDeProduits){
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
            `};
    return structureProduit;
}
function affichageProduits(listeDeProduits){
    //Selection de la classe qui contiendra les produits
    const positionElement=document.querySelector(".container-produits");
    //Récupération de la fonction qui génère le Html
    const monHtml = genererHtml(listeDeProduits);
    //injection dans le HTML
    positionElement.innerHTML = monHtml;
}

    //Récupération des données API
fetch("http://localhost:3000/api/teddies")
    .then(function(res){
        if(res.ok){
            let data= res.json();
            return data;
        }
    })
    .then(function(listeDeProduits){

        affichageProduits(listeDeProduits);
});
