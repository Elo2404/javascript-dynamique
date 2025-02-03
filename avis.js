export function ajoutListenersAvis(){
  const piecesElements = document.querySelectorAll(".fiches article button");
  for(let i = 0; i <piecesElements.length;i++){
    piecesElements[i].addEventListener("click", (event)=>{
      const id = event.target.dataset.id;
      fetch("https://apiformation.glitch.me/${id}/avis");
    });
  }
}
