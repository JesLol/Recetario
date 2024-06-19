document.addEventListener("DOMContentLoaded",()=>{
    const recetasContainer = document.getElementById("recetas-container-div");
    let recetas;
    fetch('api/recetas')
    .then(response => response.json())
    .then(data=>{
        recetas = "<ul>";
        data.forEach(receta => {
            recetas += `<li class="receta-li"><button id="${receta.nombre}" class="li-receta-btn"><p class="receta-nombre">${receta.nombre}</p></button></li>`;
        });
        recetas+="</ul>"
        console.log(recetas)
        recetasContainer.innerHTML = recetas;
    })
    .catch(error=>{console.error(`Error en el fetch: ${error}`)})
})