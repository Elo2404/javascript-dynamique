/*// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();
console.log(pieces);*/

async function loadData() {
    try {
        // Récupérer les données depuis le fichier JSON
        const reponse = await fetch('pieces-autos.json');
        const pieces = await reponse.json();
        console.log(pieces);  // Affiche les données dans la console pour vérification

        // Appeler la fonction genererPieces une fois que les données sont chargées
        genererPieces(pieces);

        // Gestion des événements pour les boutons
        const boutonTrier = document.querySelector(".btn-trier");
        boutonTrier.addEventListener("click", function () {
            const piecesOrdonnees = Array.from(pieces);
            piecesOrdonnees.sort(function (a, b) {
                return a.prix - b.prix;
            });
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesOrdonnees);
        });

        const boutonFiltrer = document.querySelector(".btn-filtrer");
        boutonFiltrer.addEventListener("click", function () {
            const piecesFiltrees = pieces.filter(function (piece) {
                return piece.prix <= 35;
            });
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesFiltrees);
        });

        const boutonDecroissant = document.querySelector(".btn-decroissant");
        boutonDecroissant.addEventListener("click", function () {
            const piecesOrdonnees = Array.from(pieces);
            piecesOrdonnees.sort(function (a, b) {
                return b.prix - a.prix;
            });
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesOrdonnees);
        });

        const boutonNoDescription = document.querySelector(".btn-nodesc");
        boutonNoDescription.addEventListener("click", function () {
            const piecesFiltrees = pieces.filter(function (piece) {
                return piece.description;
            });
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesFiltrees);
        });

        const noms = pieces.map(piece => piece.nom);
        for (let i = pieces.length - 1; i >= 0; i--) {
            if (pieces[i].prix > 35) {
                noms.splice(i, 1);
            }
        }

        // Création de l'en-tête pour les pièces abordables
        const pElement = document.createElement('p');
        pElement.innerText = "Pièces abordables";
        const abordablesElements = document.createElement('ul');
        for (let i = 0; i < noms.length; i++) {
            const nomElement = document.createElement('li');
            nomElement.innerText = noms[i];
            abordablesElements.appendChild(nomElement);
        }
        document.querySelector('.abordables').appendChild(pElement).appendChild(abordablesElements);

        // Code pour les pièces disponibles
        const nomsDisponibles = pieces.map(piece => piece.nom);
        const prixDisponibles = pieces.map(piece => piece.prix);
        for (let i = pieces.length - 1; i >= 0; i--) {
            if (pieces[i].disponibilite === false) {
                nomsDisponibles.splice(i, 1);
                prixDisponibles.splice(i, 1);
            }
        }
        const disponiblesElement = document.createElement('ul');
        for (let i = 0; i < nomsDisponibles.length; i++) {
            const nomElement = document.createElement('li');
            nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
            disponiblesElement.appendChild(nomElement);
        }
        const pElementDisponible = document.createElement('p');
        pElementDisponible.innerText = "Pièces disponibles:";
        document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement);

        // Filtrage dynamique avec le prix maximum
        const inputPrixMax = document.querySelector('#prix-max');
        inputPrixMax.addEventListener('input', function () {
            const piecesFiltrees = pieces.filter(function (piece) {
                return piece.prix <= inputPrixMax.value;
            });
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesFiltrees);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}

function genererPieces(pieces) {
    const sectionFiches = document.querySelector(".fiches");
    pieces.forEach(article => {
        const pieceElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        sectionFiches.appendChild(pieceElement);
    });
}

loadData();  // Appel de la fonction pour charger les données
