export function ajoutListenersAvis(){
  const piecesElements = document.querySelectorAll(".fiches article button");
  for(let i = 0; i <piecesElements.length;i++){
    piecesElements[i].addEventListener("click", (event)=>{
      const id = event.target.dataset.id;
      // Correction de l'URL avec des backticks
      fetch(`https://apiformation.glitch.me/${id}/avis`)
        .then(response => response.json())
        .then(data => {
          console.log(`Avis pour la pièce ${id} :`, data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des avis :", error);
        });
    });
  }
}
