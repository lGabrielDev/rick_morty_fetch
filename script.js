import * as nextPageButton from './nextPageButton.js';

//informacoes da API do Rick and Morty
const QUANTIDADE_PERSONSANGES = 826;
const QUANTIDADE_PAGINAS = 42;
let paginaAtual = 1;
let listaPersonsagens = [];
let carregandoDadosApi = false;

//elementos
let divCardsElement = document.querySelector("#divCards");
let backButton = document.querySelector("#backDiv");
let nextButton = document.querySelector("#nextDiv");
let currentPageElement = document.querySelector("#currentPage");
let mensagemErroMuitosRequestsElement = document.querySelector("#mensagemErroMuitosRequests");


//pegar personagens
async function pegarPersonagensPorPagina(pagina){

     let response = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);        
     let objetoDoBody = await response.json();
     return objetoDoBody.results;



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



async function criarCards(personagens){
     /// ===================================================================================
     personagens.forEach((perso) => {
          criarCard(perso);
     });
}


// ========== apagar os cards ==========
function apagarCards(){
     divCardsElement.innerHTML = "";
}

// ====================  back and next buttons ====================

backButton.addEventListener("click", async (event) => {
      event.preventDefault();

    //desabilitamos o back and next button
    //evitando que o usuario faça VÁRIOS requests
    desabilitarBotoesBackNext()
     mensagemErroMuitosRequestsElement.style.display = "none";

    try {
        // 1. Tenta pegar os novos dados PRIMEIRO
        // Se der erro aqui, o código pula direto para o catch e NÃO apaga nada
        let personagens = await pegarPersonagensPorPagina(paginaAtual - 1);


        currentPageElement.textContent = "";
        currentPageElement.classList.add("loader");


          setTimeout( () => {
                    // 2. Se chegou aqui, deu certo! Agora sim apagamos os antigos
                    apagarCards();

                    // 3. Atualizamos a página e criamos os novos
                    criarCards(personagens); 

                    if(paginaAtual > 1){
                         paginaAtual--;
                    }

                    
                    // Atualiza interface
                    currentPageElement.textContent = paginaAtual;
                    backButton.style.display = "flex";

                    if (paginaAtual == 1) {
                         backButton.style.display = "none";
                    }

                    currentPageElement.classList.remove("loader");
                   habilitarBotoesBackNext();

               },
               0
          ) ;
    } 
    catch (e) {
          mensagemErroMuitosRequestsElement.style.display = "flex";
          habilitarBotoesBackNext();
    }
});

function desabilitarBotoesBackNext(){
     nextButton.style.pointerEvents = "none";
     backButton.style.pointerEvents = "none";
}

function habilitarBotoesBackNext(){
     nextButton.style.pointerEvents = "auto";
     backButton.style.pointerEvents = "auto";
}





// ================ next ================
nextButton.addEventListener("click", async (event) => {
    event.preventDefault();

    //desabilitamos o back and next button
    //evitando que o usuario faça VÁRIOS requests
    desabilitarBotoesBackNext()
     mensagemErroMuitosRequestsElement.style.display = "none";

    try {
        // 1. Tenta pegar os novos dados PRIMEIRO
        // Se der erro aqui, o código pula direto para o catch e NÃO apaga nada
        let personagens = await pegarPersonagensPorPagina(paginaAtual + 1);


        currentPageElement.textContent = "";
        currentPageElement.classList.add("loader");


          setTimeout( () => {
                    // 2. Se chegou aqui, deu certo! Agora sim apagamos os antigos
                    apagarCards();

                    // 3. Atualizamos a página e criamos os novos
                    criarCards(personagens); 
                    paginaAtual++;
                    
                    // Atualiza interface
                    currentPageElement.textContent = paginaAtual;
                    backButton.style.display = "flex";

                    if (paginaAtual === QUANTIDADE_PAGINAS) {
                         nextButton.style.display = "none";
                    }

                    currentPageElement.classList.remove("loader");
                   habilitarBotoesBackNext();

               },
               0
          ) ;
    } 
    catch (e) {
          mensagemErroMuitosRequestsElement.style.display = "flex";
          habilitarBotoesBackNext();
    }
});