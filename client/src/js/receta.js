document.addEventListener("DOMContentLoaded", async ()=>{
    document.getElementById("home-btn").addEventListener("click",()=>{
        window.location.href = "/";
    })
    //Consigue el nombre de la receta a buscar para perdirle los datos a la api
    const recetaNombre = localStorage.getItem("recetaGet");
    console.log(recetaNombre)
    const res = await fetch('/api/receta', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            receta: recetaNombre
        })
    });
    if(!res.ok){
        const resJson = await res.json();
        Swal.fire({
            title: "Oops",
            icon: "error",
            text: resJson.mensaje
        }).then(()=>{
            window.location.href = "/";
        })
        return
    }
    const resJson = await res.json();
    //Cambiar titulo y h1
    document.title = recetaNombre;
    document.getElementById("nombre-receta").innerHTML = recetaNombre;
    //Agregar ingredientes al contenedor
    const ingredientesContainer = document.getElementById("ingredientes-container");
    let ingredientesHtml = `<ul>`
    JSON.parse(resJson.ingredientes).forEach(ingrediente => {
        ingredientesHtml += `<li class="receta-ingrediente-li">${ingrediente}</li>`
    });
    ingredientesHtml += `</ul>`
    ingredientesContainer.innerHTML = ingredientesHtml
    //Agregar los pasos al contenedor de preparacion
    const preparacionContainer = document.getElementById("preparacion-container");
    let preparacionHtml = `<ol>`;
    JSON.parse(resJson.preparacion).forEach(paso=>{
        preparacionHtml += `<li>${paso}</li>`;
    });
    preparacionHtml += `</ol>`;
    preparacionContainer.innerHTML = preparacionHtml
});