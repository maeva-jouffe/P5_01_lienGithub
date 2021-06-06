
//Rappel de la déclaration de la clé 'article' 
let articleAjoute = JSON.parse(localStorage.getItem("article"));

//Selection de la classe qui contiendra le produit et injection dans le HTML 
const panier = document.querySelector(".container_page_panier");

//Quand le panier est vide
if (articleAjoute === null || articleAjoute == 0) {
    const panierVide = `
    <div>
        <p class="panierVide">Votre panier Orinours est vide</p>
        <p>Et si vous faisiez un tour dans notre catalogue?</p>
        <img src="images/panier.png" alt="Panier vide"/>
    </div>`
    panier.innerHTML = panierVide;
    console.log("ok");
}
else {
    let panierPlein = [];
    for (p = 0; p < articleAjoute.length; p++) {
        panierPlein += `
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

for (let s = 0; s < boutonSupprimer.length; s++) {

    boutonSupprimer[s].addEventListener("click", (e) => {
        e.preventDefault();

        // Selectionner l'Id qui sera supprimé au clic sur le bouton 'supprimer'
        let idSupprime = articleAjoute[s]._id;
        // Fonction filter pour supprimer l'id 
        articleAjoute = articleAjoute.filter(elem => elem._id !== idSupprime);
        // Envoyer l'info dans le local Storage
        localStorage.setItem("article", JSON.stringify(articleAjoute));
        document.location.reload();
    })
};

/////////////////////////////////    Total panier  /////////////////////////////////
let totalPanier = [];
for (let t = 0; t < articleAjoute.length; t++) {
    let prixPanier = articleAjoute[t].price;
    totalPanier.push(prixPanier);
}
//Additionner les prix
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = totalPanier.reduce(reducer);

//Afficher le total dans le HTML
const affichagePrix = document.getElementById("prixTotalPanier");
affichagePrix.innerHTML = "Total du panier : " + prixTotal + "€";

/////////////////////////////////    Formulaire  /////////////////////////////////

//Insertion dans le HTML
const formulairePosition = document.getElementById("formulaire");
const structureFormulaire = `
    <form method="post" action="#">
                <fieldset>
                    <p><label for="firstName">Nom</label><input type="text" name="firstName" id="firstName" required/></p>
                    <p><label for="lastName">Prénom</label><input type="text" name="lastName" id="lastName" required/></p>
                    <p><label for="email">Email</label><input type="email" name="email" id="email" required/></p>
                    <p><label for="address">Adresse</label><input type="text" name="address" id="address" required/></p>
                    <p><label for="codePostal">Code postal</label><input type="text" name="codePostal" id="codePostal" maxlength="5" minlength="5" required/></p>
                    <p><label for="city">Ville</label><input type="text" name="city" id="city" required/></p>
                    <input type="submit" value="Acheter" id="valider"/>
                </fieldset>
            </form>`;
formulairePosition.innerHTML = structureFormulaire;

// Selection et écoute du bouton
const buttonFormulaire = document.getElementById("valider");
buttonFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

    // Récupération des données
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        codePostal: document.getElementById("codePostal").value,
        city: document.getElementById("city").value
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

    function controlCodePostal() {
        const cP = contact.codePostal;
        if (/^[0-9]{5}$/.test(cP)) {
            return true;
        } else {
            alert("Veuillez renseigner correctement votre code postal \nLes lettres et symboles ne sont pas autorisés \nVotre code postal doit contenir 5 caractères")
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
    if (controlPrenom() && controlNom() && controlVille() && controlCodePostal() && controlemail() && controlAddress() ==true) {
        localStorage.setItem("contact", JSON.stringify(contact));
        console.log("okok");
    } else {

    }


    const envoiDuFormulaire = {
        articleAjoute,
        formulaire
    }

})

