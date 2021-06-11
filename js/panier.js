//Rappel de la déclaration de la clé 'article' 
let articleAjouteAuPanier = JSON.parse(localStorage.getItem("article"));

//Selection de la classe qui contiendra le produit et injection dans le HTML 
const panier = document.querySelector(".container_page_panier");

//Quand le panier est vide
if (articleAjouteAuPanier === null || articleAjouteAuPanier == 0) {
    const panierVide = `
    <div>
        <p class="panierVide">Votre panier Orinours est vide</p>
        <p>Et si vous faisiez un tour dans notre catalogue?</p>
        <img src="images/panier.png" alt="Panier vide"/>
    </div>`
    panier.innerHTML = panierVide;
}
else {
    let panierPlein = [];
    for (resumeArticle of articleAjouteAuPanier) {
        panierPlein += `
        <div class="container" id="produitPanier">
            <div class="row">
                <div class="col">
                    <img src="${resumeArticle.imageUrl}"/>
                </div>
                <div class="col">
                    <p class="titre">${resumeArticle.nomProduit}</p>
                    <p class="option couleur">${resumeArticle.couleurs}</p>
                </div>
                <div class="col">
                    <p class="quantite">Quantité:${resumeArticle.quantity}<p>
                    <p class="price">${resumeArticle.price}€</p>
                </div>
                <div class="col">
                <button type="button" class="btn btn-dark" id="supprimer"><i class="far fa-trash-alt"></i>Supprimer</button>
                </div>
            </div>
        </div>`;
        panier.innerHTML = panierPlein;
    }
    /////////////////////////////////    Total panier  /////////////////////////////////

    function additionnerLesPrix(){
        //Boucle pour récupérer le prix de chaque article
        let totalPanier = [];
        for (articleDuPanier of articleAjouteAuPanier) {
            let prixPanier = articleDuPanier.price;
            totalPanier.push(prixPanier);
        }
        //Additionner les prix
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const prixTotal = totalPanier.reduce(reducer);
        
        //Afficher le total dans le HTML
        const affichagePrix = document.getElementById("prixTotalPanier");
        affichagePrix.innerHTML = "Total du panier : " + prixTotal + "€";
        
        //Envoyer le prix total dans le local storage
        localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
    }
    additionnerLesPrix();
};

/////////////////////////////////    Bouton 'supprimer'   /////////////////////////////////

function boutonSupprimerArticle(){
    let boutonSupprimer = document.querySelectorAll("#supprimer");

    //Récuperer le bouton supprimer de chaque article dans le panier
    for (let s = 0; s < boutonSupprimer.length; s++) {
    
        //Ecouter le click sur le bouton supprimer
        boutonSupprimer[s].addEventListener("click", (e) => {
            e.preventDefault();
    
            // Selectionner l'Id qui sera supprimé au clic sur le bouton 'supprimer'
            let idSupprime = resumeArticle._id;
    
            // Fonction filter pour supprimer l'id 
            articleAjouteAuPanier = articleAjouteAuPanier.filter(elem => elem._id !== idSupprime);
            
            // Envoyer l'info dans le local Storage
            localStorage.setItem("article", JSON.stringify(articleAjouteAuPanier));
            document.location.reload();
        })
    };
}
boutonSupprimerArticle();

/////////////////////////////////    Formulaire  /////////////////////////////////

//Insertion dans le HTML
function insertionFormulaireDansHtml(){
    const formulairePosition = document.getElementById("formulaire");
    const structureFormulaire = `
        <form method="post" action="#">
                    <fieldset>
                        <p><label for="firstName">Nom</label><input type="text" name="firstName" id="firstName" required/></p>
                        <p><label for="lastName">Prénom</label><input type="text" name="lastName" id="lastName" required/></p>
                        <p><label for="email">Email</label><input type="email" name="email" id="email" required/></p>
                        <p><label for="address">Adresse</label><input type="text" name="address" id="address" required/></p>
                        <p><label for="city">Ville</label><input type="text" name="city" id="city" required/></p>
                        <input type="submit" value="Acheter" id="acheter"/>
                    </fieldset>
                </form>`;
    formulairePosition.innerHTML = structureFormulaire;
}
insertionFormulaireDansHtml();

// Selection et écoute du bouton
const buttonFormulaire = document.getElementById("acheter");
buttonFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

    // Récupération des données
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value   
    }

    //Validation des données du formulaire avant envoi dans le loca storage
    function controlPrenom() {
        const prenom = contact.lastName;
        if (/^[A-Za-z]{2,25}$/.test(prenom)) {
            return true;
        } else {
            alert("Veuillez renseigner correctement votre prénom \nLes chiffres et symboles ne sont pas autorisés \nVotre prénom doit contenir entre 2 et 25 caractères")
            return false;
        };
    }

    function controlNom() {
        const nom = contact.firstName;
        if (/^[A-Za-z]{2,25}$/.test(nom)) {
            return true;
        } else {
            alert("Veuillez renseigner correctement votre nom \nLes chiffres et symboles ne sont pas autorisés \nVotre nom doit contenir entre 2 et 25 caractères")
            return false;
        };
    }

    function controlVille() {
        const ville = contact.city;
        if (/^[A-Za-z]{2,25}$/.test(ville)) {
            return true;
        } else {
            alert("Veuillez renseigner correctement votre ville \nLes chiffres et symboles ne sont pas autorisés \nVotre ville doit contenir entre 2 et 25 caractères")
            return false;
        };
    }

    function controlemail() {
        const email = contact.email;
        if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        } else {
            alert("Veuillez renseigner correctement votre email")
            return false;
        };
    }

    function controlAddress() {
        const address = contact.address;
        if (/^[a-zA-Z0-9\s]{5,40}$/.test(address)) {
            return true;
        } else {
            alert("Veuillez renseigner correctement votre adresse\nLes symboles ne sont pas autorisés")
            return false;
        };
    }

    // Mettre valeursFormulaires dans le localStorage
    if (controlPrenom() && controlNom() && controlVille() && controlemail() && controlAddress() ==true) {
        localStorage.setItem("contact", JSON.stringify(contact));
        
    } else {
        alert("Une erreur est survenue");
    }
    //Récupérer la valeur de _id contenue dans le local storage et la mettre dans un tableau
    let products= [];
    for (p=0; p< articleAjouteAuPanier.length; p++){
        articleAjouteAuPanier.forEach((produit, p)=>{
            products[p] = produit._id;
        })};
    
    //Créer un objet 'order' contenant le tableau des id et un objet des contacts
    const order = {products, contact};
  
    //Envoyer la requete POST à l'API
    function envoiVersServeur(){
        const envoi =  fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify(order) 
        }); 
    
    envoi.then(async(response)=>{
         try{
             const contenu = await response.json();
             console.log("contenu de reponse");
             console.log(contenu);

             if(response.ok){
                 console.log(`résultat de réponse.ok: ${response.ok}`);

                 //Récupérer l'id de la réponse 
                 console.log("id de réponse");
                 console.log(contenu.orderId);
                 //Le mettre dans le local storage
                 localStorage.setItem("id",contenu.orderId);
                 //Renvoi vers la page de confirmation
                 window.location = "confirmation.html";

             }else{
                console.log(`résultat du serveur: ${response.status}`);
                alert(`problème avec le serveur: erreur ${reponse.status}`)
             };
         }catch(e){
             console.log("erreur qui vient du catch()");
             console.log(e);
             alert(`erreur qui vient du catch() ${e}`);
         }
    });
    }
    envoiVersServeur();
})
/////////////////////////////////    Confirmation  /////////////////////////////////


