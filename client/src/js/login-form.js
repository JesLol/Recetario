document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        if(e.target.username.value.lenght > 20){
            Swal.fire({
                position: "top-end",
                icon: "info",
                text: "El usuario no puede llevar mas de 20 caracteres",
                timer: 2500
            })
            return;
        } //Verifica si no pasa de 20 caracteres el usuario
        if(e.target.password.value.lenght > 20){
            Swal.fire({
                position: "top-end",
                icon: "info",
                text: "La contraseña no puede llevar mas de 20 caracteres",
                timer: 2500
            })
            return;
        } //Verfica si no pasa de 20 caracteres la password
        const res = await fetch("api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        }); //Hace la peticion enviando los datos a la api
        if(!res.ok){
            const resJson = await res.json();
            console.log(resJson.mensaje)
            Swal.fire({
                title: "Oops",
                text : resJson.mensaje,
                icon: "error",
                confirmButtonColor: '#1f5df1'
              }); 
            return;
        } //Si no devuelve ok mostrar error
        const resJson = await res.json();
        Swal.fire({
            title: "Sesion iniciada correctamente",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: '#1f5df1'
        }).then(()=>{
            window.location.href = resJson.redirect;
        });
    }) //Si devuelve correcto mostrar mensaje y devolver al inicio
})