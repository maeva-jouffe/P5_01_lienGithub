function recupererIdDeLarticle(listeDeProduits){
    //Boucle pour récupérer les produits de la liste
    for (produit of listeDeProduits){
        
    // Paramètres de requête de l'URL pour la page produits
    const queryString_url_id = window.location.search

    //Supprimer le '?' de la chaine de caractères récupérée
    const idRecupere = queryString_url_id.slice(1)

    //Affichage du produit cliqué dans la page produit
    const id = listeDeProduits.find (element => element._id === idRecupere);
return id;
}
}
function genererHtmlProduitSelectionne(listeDeProduits){
    //Récupérer les valeurs de l'id du produit sur lequel l'utilisateur a cliqué
    const produitSelectionne = recupererIdDeLarticle(listeDeProduits)

    //Declaration de la variable pour la structure
    let structureProduitSelectionne ="";

    //Structure HTML pour l'affichage du produit selectionné
    structureProduitSelectionne = `
    <div class="row">
        <div class="col-6">
        <img src="${produitSelectionne.imageUrl}"/>
        </div>
        <div class="col-5">
            <h2>Ours en peluche "${produitSelectionne.name}"</h2>
            <p>${produitSelectionne.description}</p>
            <p class="price">${produitSelectionne.price/100}€</p>
            <form method="post" action="#">
            <p><label for="quantite">Quantité:</label>
            <select name="quantite" id="quantite">
            <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select></form></p>
            <form method="post" action="#">
                <label for="color">Choisissez votre couleur</label>
                <select name="color" id="color">
                </select>
            </form><br>
                <button type="button" class="btn btn-dark" id="panier">Ajouter au panier</button>
        </div>
    </div>`;
    return structureProduitSelectionne;
}
function genererHtmlPourOptionsCouleur(listeDeProduits){
    //Récupérer les valeurs de l'id du produit sur lequel l'utilisateur a cliqué
    const optionSelectionne = recupererIdDeLarticle(listeDeProduits)
    //Récupérer les valeurs du tableau 'colors' du produit sur lequel l'utilisateur a cliqué
    const optionCouleurs = optionSelectionne.colors;
    //Declaration de la variable pour la structure
    let structureOptionSelectionne = [];
    //Boucle qui parcourt les différentes couleurs du tableau 'colors'
    for(couleur of optionCouleurs){
        //Structure HTML pour l'affichage des couleurs du produit selectionné
        structureOptionSelectionne +=`
        <option value="${couleur}">${couleur}</option>`;
    }
    return structureOptionSelectionne   
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

    const selection = recupererIdDeLarticle(listeDeProduits);

    /////////////////////////////////    Afficher le produit selectionné    /////////////////////////////////

    //Selection de la classe qui contiendra le produit et injection dans le HTML 
    const affichageProduit = document.querySelector(".container_page_produit");
    const afficherProduitSelectionne = genererHtmlProduitSelectionne(listeDeProduits);
    affichageProduit.innerHTML = afficherProduitSelectionne;


    /////////////////////////////////    Afficher les couleurs du produit selectionné    /////////////////////////////////

    //Selection de la classe qui contiendra les options et injection dans le HTML
    const affichageOptionProduit = document.querySelector("#color");
    const afficherLesOptionsCouleur = genererHtmlPourOptionsCouleur(listeDeProduits);
    affichageOptionProduit.innerHTML = afficherLesOptionsCouleur;


    /////////////////////////////////    Panier    /////////////////////////////////

    //récupération des id de la couleur, la quantité et le bouton 'acheter'
    const choixOption = document.getElementById('color');
    const choixQuantite = document.getElementById('quantite');
    const buttonPanier = document.getElementById('panier');

    //Ecouter le clic sur le bouton pour envoyer l'article dans le panier
    buttonPanier.addEventListener("click", (e)=>{
        e.preventDefault();

        //Mettre le choix dans une variable
        const optionChoisie = choixOption.value;
        const quantiteChoisie = choixQuantite.value;

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
    });