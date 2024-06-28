document.addEventListener("DOMContentLoaded",()=>{
    const recetasContainer = document.getElementById("recetas-container-div");
    let recetas;
    fetch('api/recetas')
    .then(response => response.json())
    .then(data=>{
        recetas = `<ul class="recetas-ul">`;
        let recetasID = 0;
        data.forEach(receta => {
            recetas += `<li class="receta-li"><button id="${receta.nombre}${recetasID}" class="li-receta-btn"><p class="receta-nombre">${receta.nombre}</p></button></li>`;
            recetasID++;
        });
        recetas+="</ul>"
        recetasContainer.innerHTML = recetas;
        recetasID = 0;
        data.forEach(receta => {
            document.getElementById(`${receta.nombre}${recetasID}`).addEventListener("click",()=>{
                localStorage.setItem("recetaGet", receta.nombre);
                window.location.href = "/receta"
            });
            recetasID++;
        });
    })
    .catch(error=>{console.error(`Error en el fetch: ${error}`)})
})