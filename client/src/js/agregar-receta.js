document.addEventListener("DOMContentLoaded",()=>{
    //Boton de home
    document.getElementById("home-btn").addEventListener("click", ()=>{
        window.location.href = "/";
    });
    //Agregar ingredientes
    const ingredientesUl = document.getElementById("ingredientes-ul");
    let ingredienteNumero = 2
    document.getElementById("agregar-ingrediente-btn").addEventListener("click",(e)=>{
        e.preventDefault();
        const nuevoIngredienteHtml = document.createElement("li");
        nuevoIngredienteHtml.innerHTML = `
            <label for="ingrediente-${ingredienteNumero}">
                <input type="text" id="ingrediente-${ingredienteNumero}" class="ingredientes-input">
            </label>
        `
        ingredientesUl.appendChild(nuevoIngredienteHtml);
        ingredienteNumero++;
    })
    //Tipo de input de preparacion
    // const preparacionContainer = document.getElementById("preparacion-container");
    // document.getElementById("preparacion-btn-tipo-lista").addEventListener("click",()=>{
    //     preparacionDivContainer.innerHTML = `
    //     <ul>
    //         <li></li>
    //     </ul>
    //     `;
    // })
})