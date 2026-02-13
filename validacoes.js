import * as Exceptions from "./elementosException.js";



let propertiesPossiveis = ["name", "species", "location", "image"];

export function characterIdFoiDigitado(characterId){
     let foiDigitado = true;

     if(characterId <= 0 || characterId > 826 || characterId == null){
          Exceptions.mostrarElementoDeErro("Digite o character #ID!!!");
          throw new Error("Digite o character #ID!!!");
     }
     return foiDigitado;
}



export function peloMenos1OpcaoFoiSelecionada(arrayElementsIds){
     let encontrouAlgumPreenchido = false;

     arrayElementsIds.forEach(elementoId => {
          let elemento = document.getElementById(elementoId);
          
          if(elemento.checked){
               encontrouAlgumPreenchido = true;
          }
     });

     if(encontrouAlgumPreenchido == false){
          Exceptions.mostrarElementoDeErro("Escolha pelo menos 1 opção");
          throw new Error("Escolha pelo menos 1 opção");
     }
     return encontrouAlgumPreenchido;
}

