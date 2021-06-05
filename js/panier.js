//Rappel de la déclaration de la clé 'article' 
let articleAjoute = JSON.parse(localStorage.getItem("article"));

//Selection de la classe qui contiendra le produit et injection dans le HTML 
const panier = document.querySelector(".container_page_panier");

//Quand le panier est vide
if(articleAjoute === null || articleAjoute == 0){
    const panierVide = `
    <div>
        <p class="panierVide">Votre panier Orinours est vide</p>
        <p>Et si vous faisiez un tour dans notre catalogue?</p>
        <img src="images/panier.png" alt="Panier vide"/>
    </div>`
    panier.innerHTML = panierVide;
    console.log("ok");
}
else{
    let panierPlein = [];
    for(p = 0; p < articleAjoute.length; p++){
        panierPlein +=`
        <div class="container" id="produitPanier">
            <div class="row">
                <div class="col">
                    <img src="${articleAjoute[p].imageUrl}"/>
                </div>
                <div class="col">
                    <p class="titre">${articleAjoute[p].nomProduit}</p>
                    <p class="option couleur">${articleAjoute[p].couleurs}</p>
                </div>
                <div class="col">
                    <input type="number" value="1" min="1" id="inputQuantite"/>
                    <p class="price">${articleAjoute[p].price}€</p>
                </div>
                <div class="col">
                <button type="button" class="btn btn-dark" id="supprimer"><i class="far fa-trash-alt"></i>Supprimer</button>
                </div>
            </div>
        </div>`;
    panier.innerHTML = panierPlein;
    }
};

/////////////////////////////////    Bouton 'supprimer'   /////////////////////////////////
let boutonSupprimer = document.querySelectorAll("#supprimer");

for (let s = 0; s < boutonSupprimer.length; s++){
    
    boutonSupprimer[s].addEventListener("click", (e)=>{
        e.preventDefault;

    // Selectionner l'Id qui sera supprimé au clic sur le bouton 'supprimer'
     let idSupprime = articleAjoute[s]._id;
     // Fonction filter pour supprimer l'id 
     articleAjoute = articleAjoute.filter(elem => elem._id !== idSupprime);
     // Envoyer l'info dans le local Storage
     localStorage.setItem("article", JSON.stringify(articleAjoute));
     document.location.reload();
    })
}
