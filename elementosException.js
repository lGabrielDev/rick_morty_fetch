let content = document.querySelector("#content");

export function mostrarElementoDeErro(message) {
     let pErroElement = document.createElement("p");
     pErroElement.id = "pErro";
     pErroElement.textContent = message;
     pErroElement.classList.toggle("pErro");

     content.appendChild(pErroElement);

     throw new Error("a")
}
