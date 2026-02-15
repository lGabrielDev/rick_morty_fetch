import * as scriptPrincipal from './script.js';

//elementos
let divContainer = document.querySelector("#divContainer");
let divCardsElement = document.querySelector("#divCards");
let divInputAndButton = document.querySelector("#divInputAndButton");
let charactersTitle = document.querySelector("#charactersTitle");
let backButton = document.querySelector("#backDiv");
let nextButton = document.querySelector("#nextDiv");
let currentPageElement = document.querySelector("#currentPage");
let mensagemErroMuitosRequestsElement = document.querySelector("#mensagemErroMuitosRequests");


function esconderTudo(){
     charactersTitle.style.display = "none";
     currentPageElement.style.display = "none";
     divCardsElement.style.display = "none";
     backButton.style.display = "none";
     nextButton.style.display = "none";
     divInputAndButton.style.display = "none";
     mensagemErroMuitosRequestsElement.style.display = "none";
}



function mostrarBotoes(){
     charactersTitle.style.display = "flex";
     currentPageElement.style.display = "flex";
     divCardsElement.style.display = "flex";
     backButton.style.display = "flex";
     nextButton.style.display = "flex";
     divInputAndButton.style.display = "flex";
     
}



/*<div id="nextDiv" class="backNextDiv nextDiv">
          <i class="fa-solid fa-angle-right arrowImage"></i>
          <p>next</p>
</div>
*/

function gerarBackButton(){
//buton
     let backButton = document.createElement(("div"));
     backButton.id = "backDivUniqueCharacter";
     backButton.classList.add("backNextDiv", "backDivUniqueCharacter");
    
     let backSymbol = document.createElement(("i"));
     backSymbol.classList.add("fa-solid", "fa-angle-left", "arrowImage");

     let backP = document.createElement(("p"));
     backP.textContent = "back";
     
     backButton.appendChild(backSymbol);
     backButton.appendChild(backP);

     divContainer.appendChild(backButton);

     return backButton;
     
}


export  function mostrarApenasOCardSelecionado(cardElement){
     esconderTudo();
     
     //gerar back button
     let backButton =    gerarBackButton()




     //evento de voltar....
     backButton.addEventListener("click", async (event) => {
          event.preventDefault();


          let personagens = await scriptPrincipal.pegarPersonagensPorPagina(scriptPrincipal.paginaAtual);

          mostrarBotoes();
          scriptPrincipal.criarCards(personagens);

          //escondemos o back button
          backButton.style.display = "none";
     });



}
 


