import * as nextPageButton from './nextPageButton.js';

//informacoes da API do Rick and Morty
const QUANTIDADE_PERSONSANGES = 826;
const QUANTIDADE_PAGINAS = 42;
let listaPersonsagens = [];

//elementos
let divCardsElement = document.querySelector("#divCards");


//pegar personagens
async function pegarPersonagensPorPagina(pagina){
     let responseEntity = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
     let objetoDoBody = await responseEntity.json();
     let personsagens = objetoDoBody.results;

     return personsagens;
}

function criarCard(personagem){
     let cardElement = document.createElement("div");
     cardElement.classList.add("card");

     // status (alive, dead or unknown)
     let pDeadAliveStatusElement = document.createElement("p");
     pDeadAliveStatusElement.classList.add("deadAliveUnknownStatus");
     pDeadAliveStatusElement.textContent = personagem.status;

     switch(pDeadAliveStatusElement.textContent.toLocaleLowerCase()){
          case "alive": 
               pDeadAliveStatusElement.classList.add("aliveCard");
               break;
          case "dead": 
               pDeadAliveStatusElement.classList.add("deadCard");
               break;
          case "unknown": 
               pDeadAliveStatusElement.classList.add("unknownCard");
               break;
          default:
               break;
     }
     cardElement.appendChild(pDeadAliveStatusElement);
     // image
     let imagePersonagemElement = document.createElement("img"); 
     cardElement.appendChild(imagePersonagemElement);
     imagePersonagemElement.src = personagem.image;
     // nome personagem
     let pNomePersonsagemElement = document.createElement("p");
     pNomePersonsagemElement.classList.add("nomePersonagemCard");
     pNomePersonsagemElement.textContent = personagem.name; // pegamos da api
     cardElement.appendChild(pNomePersonsagemElement);

     divCardsElement.appendChild(cardElement);
}



// criar todos os cards da pagina principal
pegarPersonagensPorPagina(4).then((personagens) => {
     personagens.forEach((perso) => {
          criarCard(perso);
     });
     
} );

