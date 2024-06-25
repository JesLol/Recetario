document.addEventListener("DOMContentLoaded",()=>{
    //Revisa si hay cookie de sesion
    const cookies = document.cookie;
    const cookiesObj = cookies.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
    }, {});
    const aggRecetaBtn = document.getElementById("agregar-receta-btn");
    const loginBtn = document.getElementById("login-btn");
    const miCookie = cookiesObj['jwt'];
    if(miCookie){
        aggRecetaBtn.style.display = "block";
        aggRecetaBtn.addEventListener("click",()=>{
            window.location.href = "/agregar-recetas";
        });
        loginBtn.style.display = "none";
    }
    else{
        loginBtn.addEventListener("click",()=>{
            window.location.href = "/login";
        });
    }
})