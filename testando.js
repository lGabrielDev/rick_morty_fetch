import {  consumirApiExterna } from "./apiExterna.js";
import * as Validacoes from "./validacoes.js";
import * as Exceptions from "./elementosException.js";

let button = document.querySelector("#button");
let characterIdInput = document.querySelector("#input");
let content = document.querySelector("#content");
let pErro = document.querySelector("#pErro");

let propertiesPossiveis = ["name", "species", "location", "image"];




button.addEventListener("click",  async (evento) => {
     evento.preventDefault;
     let rickNovoObjeto = {};

     //zeramos o conteudo da div
     content.innerHTML = "";

     //elementos
     let imgElement = document.createElement("img");
     let characterId = characterIdInput.value;

     
     //validacoes

     Validacoes.characterIdFoiDigitado(characterId);

     Validacoes.peloMenos1OpcaoFoiSelecionada(propertiesPossiveis)

     let rickObjeto = await consumirApiExterna(characterId);


          propertiesPossiveis.forEach((nomeElemento) => {
               let elementoInput = document.getElementById(nomeElemento);
               let propertieName = elementoInput.id;

               if(elementoInput.checked && propertieName != "image"){
                    rickNovoObjeto[propertieName] = rickObjeto[propertieName];
               }

               if(elementoInput.checked && propertieName == "image"){
                    imgElement.src = rickObjeto.image;
               }
     });

          let objetoJSONParaJs = JSON.stringify(rickNovoObjeto , propertiesPossiveis, 10);

          console.log(objetoJSONParaJs);

          let preElement = document.createElement("pre");
          content.appendChild(preElement);
          content.appendChild(imgElement);
          preElement.textContent = objetoJSONParaJs;
     }
);







