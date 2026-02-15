import * as scriptPrincipal from './script.js';

//elementos
let divContainer = document.querySelector("#divContainer");
let divContainerIndividualPage = document.querySelector("#divContainerIndividualPage");
let divCardsElement = document.querySelector("#divCards");
let divInputAndButton = document.querySelector("#divInputAndButton");
let charactersTitle = document.querySelector("#charactersTitle");
let backButton = document.querySelector("#backDiv");
let nextButton = document.querySelector("#nextDiv");
let currentPageElement = document.querySelector("#currentPage");
let mensagemErroMuitosRequestsElement = document.querySelector("#mensagemErroMuitosRequests");
let backDivUniqueCharacter = document.querySelector("#backDivUniqueCharacter");
let individualImage = document.querySelector("#individualImage");
let individualNameElement = document.querySelector("#individualName");
let individualStatusElement = document.querySelector("#individualStatus");
let individualSpeciesSpanValue = document.querySelector("#individualSpeciesSpanValue");
let individualOriginSpanValue = document.querySelector("#individualOriginSpanValue");


function gerarCardIndividual(personagem){
     individualImage.src = personagem.image;
     

     //alteramos o name
     individualNameElement.textContent = personagem.name;

     //altermos o status
     individualStatusElement.textContent = personagem.status;

     individualStatusElement.classList.remove("individualStatusDead", "individualStatusAlive", "individualStatusUnknown");

     switch(personagem.status.toLowerCase()){
          case "dead":
               individualStatusElement.classList.add("individualStatusDead"); 
               break;
          case "alive":
               individualStatusElement.classList.add("individualStatusAlive"); 
               break;
          case "unknown":
               individualStatusElement.classList.add("individualStatusUnknown"); 
               break;
     }

     //alteramos a species
     individualSpeciesSpanValue.textContent = personagem.species;

     //alteramos a origin
     individualOriginSpanValue.textContent = personagem.origin.name;


     console.log(personagem);


};


export  function mostrarApenasOCardSelecionado(personagem){
     
     //mostramos a div pai
     divContainer.style.display = "none"; 
     divContainerIndividualPage.style.display = "flex"; 


     
     //pegar informacao do personsagem
     gerarCardIndividual(personagem);





     //================= clicou no back
     backDivUniqueCharacter.addEventListener("click", async (event) => {
          event.preventDefault();

          //alteramos o container pai
          divContainerIndividualPage.style.display = "none"; 
          divContainer.style.display = "flex"; 

          let personagens = await scriptPrincipal.pegarPersonagensPorPagina(scriptPrincipal.paginaAtual);

          scriptPrincipal.apagarCards();
          scriptPrincipal.criarCards(personagens);

          backButton.style.display = "flex";
          nextButton.style.display = "flex";

     });


}
 


