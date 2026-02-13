

export async function consumirApiExterna(characterId){
     
     let responseEntity = await fetch("https://rickandmortyapi.com/api/character/" + characterId)
    let body = await responseEntity.json();
       
     return body;
     
}