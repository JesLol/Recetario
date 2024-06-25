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
        nuevoIngredienteHtml.className = "ingredientes-li";
        nuevoIngredienteHtml.innerHTML = `
            <label for="ingrediente${ingredienteNumero}" class="ingredientes-li-label">
                <input type="text" id="ingrediente${ingredienteNumero}" class="ingredientes-input" autocomplete="off" name="ingredientes">
                <button id="ingrediente${ingredienteNumero}-delete-btn" class="ingrediente-delete-btn"><span class="material-symbols-outlined ingrediente-delete-btn-icon">delete</span></button>
            </label>
        `
        ingredientesUl.appendChild(nuevoIngredienteHtml);
        document.getElementById(`ingrediente${ingredienteNumero}-delete-btn`).addEventListener("click",()=>{
            nuevoIngredienteHtml.remove();
        });
        ingredienteNumero++;
    })
    //Tipo de input de preparacion
    const preparacionUl = document.getElementById("preparacion-ul");
    let pasoNumero = 2;
    document.getElementById("agregar-paso-btn").addEventListener("click",(e)=>{
        e.preventDefault();
        const nuevoPaso = document.createElement("li");
        nuevoPaso.className = "preparacion-li";
        nuevoPaso.innerHTML = `
        <label for="preparacion${pasoNumero}" class="preparacion-li-label">
            <textarea type="text" id="preparacion${pasoNumero}" class="preparacion-textarea" name="pasos" autocomplete="off"></textarea>
            <button id="ingrediente${pasoNumero}-delete-btn" class="ingrediente-delete-btn"><span class="material-symbols-outlined ingrediente-delete-btn-icon">delete</span></button>
        </label>
        `;
        preparacionUl.appendChild(nuevoPaso);
        document.getElementById(`ingrediente${pasoNumero}-delete-btn`).addEventListener("click",()=>{
            nuevoPaso.remove();
        })
        pasoNumero++;
    });
    document.getElementById("agg-receta-form").addEventListener("submit",async (e)=>{
        e.preventDefault();
        let ingredientes = [];
        let pasos = [];
        let ingredientesValue = e.target.querySelectorAll('input[name=ingredientes]');
        let pasosValue = e.target.querySelectorAll('textarea[name=pasos]');
        ingredientesValue.forEach(element => {
            ingredientes.push(element.value)
        });
        pasosValue.forEach(element=>{
            pasos.push(element.value)
        });
        const res = await fetch(`/api/agregar-receta`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({
                nombre: e.target.recetaNombre.value,
                ingredientes: ingredientes,
                pasos: pasos
            })
        });
        if(!res.ok){
            const resJson = await res.json();
            Swal.fire({
                title: "Oops",
                text : resJson.mensaje,
                icon: "error",
                confirmButtonColor: '#1f5df1'
            });
        }
        else{
            Swal.fire({
                title: "Se ha añadido correctamente la receta.",
                icon: "success",
                confirmButtonColor: '#1f5df1'
            }).then(result=>{
                window.location.href = "/";
            });
        }
    });
});